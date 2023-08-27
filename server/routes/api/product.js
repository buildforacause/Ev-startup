const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongoose = require('mongoose');
const { Apriori, Itemset, IAprioriResults } = require('node-apriori');

// Bring in Models & Utils
const Product = require('../../models/product');
const Brand = require('../../models/brand');
const Category = require('../../models/category');
const Pincode = require("../../models/pincode");
const Cart = require('../../models/cart');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../utils/auth');
const {
  getStoreProductsQuery,
  getStoreProductsWishListQuery
} = require('../../utils/queries');
const { ROLES } = require('../../constants');

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now())
  }
})
const upload = multer({ storage:storage});

// fetch product slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const productDoc = await Product.findOne({ slug, isActive: true }).populate(
      {
        path: 'brand',
        select: 'name isActive slug'
      }
    );

    const hasNoBrand =
      productDoc?.brand === null || productDoc?.brand?.isActive === false;

    if (!productDoc || hasNoBrand) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      product: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch product name search api
router.get('/list/search/:name', async (req, res) => {
  try {
    const name = req.params.name;

    const productDoc = await Product.find(
      { name: { $regex: new RegExp(name), $options: 'is' }, isActive: true }
    );

    if (productDoc.length < 0) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      products: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch product name search1 api
router.get('/list/search1/:name', async (req, res) => {
  try {
    const name = req.params.name;

    const productDoc = await Product.find(
      { name: { $regex: new RegExp(name), $options: 'is' }, isActive: true }
    );

    if (productDoc.length < 0) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }
    res.status(200).json({
      products: productDoc[0]
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch store products by advanced filters api
router.get('/list', async (req, res) => {
  try {
    let {
      sortOrder,
      rating,
      max,
      min,
      category,
      page = 1,
      limit = 10
    } = req.query;
    sortOrder = JSON.parse(sortOrder);

    const categoryFilter = category ? { category } : {};
    const basicQuery = getStoreProductsQuery(min, max, rating);

    const userDoc = await checkAuth(req);
    const categoryDoc = await Category.findOne(
      { slug: categoryFilter.category, isActive: true },
      'products -_id'
    );

    if (categoryDoc && categoryFilter !== category) {
      basicQuery.push({
        $match: {
          isActive: true,
          _id: {
            $in: Array.from(categoryDoc.products)
          }
        }
      });
    }

    let products = null;
    const productsCount = await Product.aggregate(basicQuery);
    const count = productsCount.length;
    const size = count > limit ? page - 1 : 0;
    const currentPage = count > limit ? Number(page) : 1;

    // paginate query
    const paginateQuery = [
      { $sort: sortOrder },
      { $skip: size * limit },
      { $limit: limit * 1 }
    ];

    if (userDoc) {
      const wishListQuery = getStoreProductsWishListQuery(userDoc.id).concat(
        basicQuery
      );
      products = await Product.aggregate(wishListQuery.concat(paginateQuery));
    } else {
      products = await Product.aggregate(basicQuery.concat(paginateQuery));
    }

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage,
      count
    });
  } catch (error) {
    console.log('error', error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch store products by brand api
router.get('/list/brand/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const brand = await Brand.findOne({ slug, isActive: true });

    if (!brand) {
      return res.status(404).json({
        message: `Cannot find brand with the slug: ${slug}.`
      });
    }

    const userDoc = await checkAuth(req);

    if (userDoc) {
      const products = await Product.aggregate([
        {
          $match: {
            isActive: true,
            brand: brand._id
          }
        },
        {
          $lookup: {
            from: 'wishlists',
            let: { product: '$_id' },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ['$$product', '$product'] } },
                    { user: new Mongoose.Types.ObjectId(userDoc.id) }
                  ]
                }
              }
            ],
            as: 'isLiked'
          }
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brands'
          }
        },
        {
          $addFields: {
            isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
          }
        },
        {
          $unwind: '$brands'
        },
        {
          $addFields: {
            'brand.name': '$brands.name',
            'brand._id': '$brands._id',
            'brand.isActive': '$brands.isActive'
          }
        },
        { $project: { brands: 0 } }
      ]);

      res.status(200).json({
        products: products.reverse().slice(0, 8),
        page: 1,
        pages: products.length > 0 ? Math.ceil(products.length / 8) : 0,
        totalProducts: products.length
      });
    } else {
      const products = await Product.find({
        brand: brand._id,
        isActive: true
      }).populate('brand', 'name');

      res.status(200).json({
        products: products.reverse().slice(0, 8),
        page: 1,
        pages: products.length > 0 ? Math.ceil(products.length / 8) : 0,
        totalProducts: products.length
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list/select', auth, async (req, res) => {
  try {
    const products = await Product.find({}, 'name');

    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.get("/minmaxprice", async(req, res) => {
  try{
    let maxprod = await Product.find({}).sort({"price" : -1}).limit(1);
    let minprod = await Product.find({}).sort({"price" : 1}).limit(1);
    res.status(200).json({"max" : maxprod[0].price, "min": minprod[0].price})
  }catch(e){
    res.status(400).json({
      error: "Something Went Wrong"
    })
  }
})


router.get("/apriori/trending", async(req, res) => {
  // Fetch all carts from the database
  Cart.find({}, (err, carts) => {
    if (err) throw err;
    // Extract all unique products in the carts
    var products = [...new Set(carts.flatMap(cart => cart.products))];
    
    products = products.map((e)=> {
      return Mongoose.Types.ObjectId(e.product)
    })
    // Fetch product names from the database
    Product.find({_id: {$in: products}}, (err, products) => {
      if (err) throw err;
      // Convert products array to object for faster lookups
      const productMap = products.reduce((map, product) => {
        map[product._id] = product.name;
        return map;
      }, {});
      
  
      // Convert carts to transactions for Apriori
      const transactions = carts.map(cart => cart.products.map(product => productMap[product.product]));
      const apriori = new Apriori(0.4);
  
   
  // Execute Apriori on a given set of transactions.
  apriori.exec(transactions).then( (result) => {
          res.status(200).json({ result })
      });
    });
  });
  
  })


router.get('/list/featured', async (req, res) => {
  try {
    const products = await Product.find({featured: true});
    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// add product api
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('image'),
  async (req, res) => {
    try {
      const sku = req.body.sku;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const taxable = req.body.taxable;
      const isActive = req.body.isActive;
      const featured = req.body.featured;
      const brand = req.body.brand;
      const dimensions = req.body.dimensions;
      const images = req.files;

      if (!sku) {
        return res.status(400).json({ error: 'You must enter sku.' });
      }

      if (!description || !name || !dimensions) {
        return res
          .status(400)
          .json({ error: 'You must enter description, name and dimensions of the product.' });
      }

      if (!quantity) {
        return res.status(400).json({ error: 'You must enter a quantity.' });
      }

      if (!price) {
        return res.status(400).json({ error: 'You must enter a price.' });
      }

      const foundProduct = await Product.findOne({ sku });

      if (foundProduct) {
        return res.status(400).json({ error: 'This sku is already in use.' });
      }

      // const { imageUrl, imageKey } = await s3Upload(image);
      let imageUrl = [];
      for(const image of images){
        imageUrl.push("/uploads/" + image.filename);
      };
      
      const imageKey = "manpasand"
      const product = new Product({
        sku:sku,
        name:name,
        description:description,
        quantity:quantity,
        price:price,
        taxable:taxable,
        isActive:isActive,
        featured:featured,
        brand:brand,
        imageUrl:imageUrl,
        imageKey:imageKey,
        dimensions:dimensions
      });

      const savedProduct = await product.save();

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: savedProduct
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again',
      });
    }
  }
);

// fetch products api
router.get(
  '/',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      let products = [];

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]?.['_id'];

        products = await Product.find({})
          .populate({
            path: 'brand',
            populate: {
              path: 'merchant',
              model: 'Merchant'
            }
          })
          .where('brand', brandId);
      } else {
        products = await Product.find({}).populate({
          path: 'brand',
          populate: {
            path: 'merchant',
            model: 'Merchant'
          }
        });
      }

      res.status(200).json({
        products
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch product api
router.get(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;

      let productDoc = null;

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]['_id'];

        productDoc = await Product.findOne({ _id: productId })
          .populate({
            path: 'brand',
            select: 'name'
          })
          .where('brand', brandId);
      } else {
        productDoc = await Product.findOne({ _id: productId }).populate({
          path: 'brand',
          select: 'name'
        });
      }

      if (!productDoc) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }

      res.status(200).json({
        product: productDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };
      const { sku, slug } = req.body.product;

      const foundProduct = await Product.findOne({
        $or: [{ slug }, { sku }]
      });

      if (foundProduct && foundProduct._id != productId) {
        return res
          .status(400)
          .json({ error: 'Sku or slug is already in use.' });
      }

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/featured',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const product = await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// Pincode logic

router.get("/checkpin/:pincode", async(req,res) => {
    const pincode = req.params.pincode;
    const pincodeDoc = await Pincode.find(
      {pincode: pincode}
    );
    if (pincodeDoc.length < 1) {
      return res.json({
        txt: 'Delivery not available.',
        disable: true,
        txt_color: 'red'
      });
    }

    return res.json({
      txt: 'Delivery is available.',
      disable: false,
      txt_color: 'green'
    });
})

router.get("/getpincode/:pincode", async (req, res) => {
  try {
    const pincode = req.params.pincode;
      let pincodeDoc = await Pincode.find(
        {pincode: pincode}
      );  
      return res.json({
        pincode: pincodeDoc,
      });
  } catch (error) {
    return res.json({
      error: 'Your request could not be processed. Please try again.' + error
    });
  }

});

router.get("/pincode/:pincode", async (req, res) => {
  try {
    const pincode = req.params.pincode;
    let pincodeDoc = [];
    if (pincode === "all"){
      pincodeDoc = await Pincode.find(
        {}
      );  
      return res.status(200).json({
         pincodes: pincodeDoc
      });
      
    }
    else{
      pincodeDoc = await Pincode.find(
        {_id: pincode}
      );  
      return res.json({
        pincode: pincodeDoc,
      });
    }

    
  } catch (error) {
    return res.json({
      error: 'Your request could not be processed. Please try again.' + error
    });
  }

});

router.post('/pincode/add', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
      const pincode = req.body.pincode;
      const cost = req.body.cost;

      if (!pincode) {
        return res.status(400).json({ error: 'You must enter pincode.' });
      }

      if (!cost) {
        return res.status(400).json({ error: 'You must enter shipping cost.' });
      }

      const pincodeFound = await Pincode.find({ pincode: pincode });

      if (pincodeFound.length > 0) {
        return res.status(400).json({ error: 'This pincode is already added.' });
      }

      const pin = new Pincode({
        pincode: pincode,
        cost: cost
      });

      const savedPin = await pin.save();

      res.status(200).json({
        success: true,
        message: `Pincode has been added successfully!`,
        pincode: savedPin
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again',
      });
    }
  }
);


router.put(
  '/pincode/edit/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const pincodeId = req.params.id;
      const update = req.body.pincode;
      const query = { _id: pincodeId };

      await Pincode.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Pincode has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);


router.delete(
  '/pincode/delete/:id',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const pincode = await Pincode.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Pincode has been deleted successfully!`,
        pincode
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.' + error
      });
    }
  }
);


module.exports = router;
