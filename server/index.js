require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const Mongoose = require('mongoose');

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

const { Apriori, Itemset, IAprioriResults } = require('node-apriori');
const Cart = require('./models/cart');
const Product = require('./models/product');

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../dist')));

setupDB();
require('./config/passport')(app);
app.use(routes);

app.use("/carta", function(){

console.log("object")
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
    console.log(transactions)

    const apriori = new Apriori(0.4);

 
// Execute Apriori on a given set of transactions.
apriori.exec(transactions).then( (result) => {
        // Returns both the collection of frequent itemsets and execution time in millisecond.
        let frequentItemsets = result.itemsets;
        let executionTime= result.executionTime;
        console.log(frequentItemsets)
    });


    // // Set Apriori options
    // const options = {
    //   transactions,
    //   support: 0.1, // minimum support level
    //   confidence: 0.5, // minimum confidence level
    //   lift: 2 // minimum lift level
    // };

    // // Generate association rules
    // const apriori = new Apriori(options);
    // apriori.on('ready', () => {
    //   const rules = apriori.generate();
    //   // Output the association rules to the console
    //   console.log(rules);
    // });
    // apriori.on('error', err => {
    //   console.error(err);
    // });
    // apriori.start();
  });
});

})

console.log('process.env.NODE_ENV ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

socket(server);
