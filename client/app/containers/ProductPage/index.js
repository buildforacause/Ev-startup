/**
 *
 * ProductPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

import actions from '../../actions';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';
import ProductReviews from '../../components/Store/ProductReviews';
import SocialShare from '../../components/Store/SocialShare';
import axios from 'axios';

class ProductPage extends React.PureComponent {
  state = {
    subcat: "",
    subcat_slug: "",
    pincode: 0,
    txt_color: "",
    txt: "",
    disabled: true
  }
  componentDidMount() {

    const slug = this.props.match.params.slug;
    this.props.fetchStoreProduct(slug);
    this.props.fetchProductReviews(slug);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  async fetch_pr(id){
    if(id === undefined){
      return
    }
    try{
      let response = await axios.get(`/api/category/customlist/` + id)
      const subcat = response.data.categories[0].name;
      const subcat_slug = response.data.categories[0].slug;
      this.setState({ subcat: subcat, subcat_slug: subcat_slug });
    
    }catch(e){
      
    }
  }

  pincodeChange = async (event) => {
    event.persist();
    this.setState({ pincode: event.target.value });
    let pincode_check = await axios.get(`/api/product/checkpin/` + event.target.value);
    this.setState({ pincode: event.target.value, txt_color: pincode_check.data.txt_color, txt: pincode_check.data.txt, disabled: pincode_check.data.disable });
  }

  render() {
    const {
      isLoading,
      product,
      productShopData,
      shopFormErrors,
      itemInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      addProductReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors
    } = this.props;
    this.fetch_pr(product._id);

    return (
      <div className='product-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className='flex-row'>
              <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={product.imageUrl}
                responsive={responsiveOneItemCarousel}
              >
                {product.imageUrl.map((item, index) => (
                  <>
                  <img key={index} src={item} />
                  {product.inventory <= 0 && !shopFormErrors['quantity'] ? (<p className='stock out-of-stock'>Out of stock</p>) : (<p className='stock in-stock'>In stock</p>) }
                  
                  </>
                ))}
              </CarouselSlider>

              <div>
                      <h3 className='my-4'><u>Additional Details:</u></h3>
                      <div className='row my-3'>
                        <div className='col-md-6 col-xs-12'>Product Dimensions (inches): </div>
                        <div className='col-md-6 col-xs-12'>{product.dimensions}</div>
                      </div>
                    </div>
                        

                    <div className='row'>
                      <div className='my-4 col-md-6 col-xs-12'>
                        <h5>Loved this product? Then You Can Share It!</h5>
                      </div>
                      <div className='my-4 col-md-6 col-xs-12 item-share'>
                        <SocialShare product={product} />
                      </div>
                    </div>
              {/* { product.imageUrl.map((image, index) => {
                return <div className='position-relative my-1' key={index}>
                  <img
                    className='item-image'
                    src={image}
                    style={{width: `100%`, height: `auto`}}
                  />
                  {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
                    <p className='stock out-of-stock'>Out of stock</p>
                  ) : (
                    <p className='stock in-stock'>In stock</p>
                  )}
                </div>

                })} */}
              </Col>
              <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                <div className='product-container'>
                  <div className='item-box'>
                    <div className='item-details'>
                      <h1 className='item-name one-line-ellipsis'>
                        {product.name}
                      </h1>
                      <p className='sku'>{product.sku}</p>
                      <hr />
                      {product.brand && (
                        <p className='by'>
                          {' '}
                          <Link
                            to={`/shop/brand/${product.brand.slug}`}
                            className='default-link'
                          >
                            {product.brand.name}
                          </Link>
                          {' > '}
                          <Link
                            to={`/shop/category/${this.state.subcat_slug}`}
                            className='default-link'
                          >
                            {this.state.subcat}
                          </Link>
                          
                        </p>
                      )}
                      <p className='item-desc'>{product.description}</p>
                      <p className='price'>₹{product.price}</p>
                    </div>
                    
                    <label>
                      Check Delivery On Pincode:
                      <input type="number" value={this.state.pincode} onChange={(event) => this.pincodeChange(event)} />
                    </label>
                    <br/>
                    {this.state.txt ? <p style={{color: this.state.txt_color}}>
                      {this.state.txt}
                      </p> : ""
                      }
                    
                    <div className='item-customize'>
                      <Input
                        type={'number'}
                        error={shopFormErrors['quantity']}
                        label={'Quantity'}
                        name={'quantity'}
                        decimals={false}
                        min={1}
                        max={product.inventory}
                        placeholder={'Product Quantity'}
                        disabled={
                          product.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        value={productShopData.quantity}
                        onInputChange={(name, value) => {
                          productShopChange(name, value);
                        }}
                      />
                    </div>
                    {(product.inventory <=4 && product.inventory != 0) && (
                    <div className='my-4 item-share'>
                      <p className='text-danger'>Only {product.inventory} left in stock</p>
                    </div>)}

                    {product.inventory == 0 && (
                    <div className='my-4 item-share'>
                      <p className='text-danger'>This Product is Currently Out Of Stock!</p>
                    </div>)}

                    <div className='item-actions'>
                      {itemInCart ? (
                        <Button
                          id='addtobag'
                          variant='primary'
                          disabled={
                            (product.inventory <= 0 &&
                            !shopFormErrors['quantity'])
                          }
                          text='Remove From Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleRemoveFromCart(product)}
                        />
                      ) : (
                        <Button
                          variant='primary'
                          id='addtobag'
                          disabled={
                            (product.quantity <= 0 && !shopFormErrors['quantity']) || this.state.disabled
                          }
                          text='Add To Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleAddToCart(product)}
                        />
                        
                      )}
                      {(product.quantity <= 0 && !shopFormErrors['quantity']) || this.state.disabled ? <p className='my-2'>Please Check Pincode For Availability Of The Product!</p> : ""}
                    </div>
                        
                    <div className='py-2' style={{backgroundColor: '#e4e6eb', marginTop: `8%`}}> 
                      <div className='mx-2'>
                          <h4>Want a custom color for this product? Don't Worry, we've got you!</h4>
                          <p>Click this button to chat with our executive.
                          <a className='mx-2 btn btn-success text-white'
                            href={`https://api.whatsapp.com/send?phone=919967775891&text=Hi, I loved your product ${product.name} and wanted to get a customized color! Here is the link of the product, ${window.location.protocol !== 'https' ? 'http' : 'https'}://${window.location.host}/product/${product.slug}`}>
                            <i  className='fa fa-whatsapp'></i> Chat Now!
                          </a>
                          <br/>Or call us directly at <a href='tel:+91 9967775891'>+91 9967775891</a>
                          </p>
                      </div>
                    </div>

                  </div>
                </div>
              </Col>

            </Row>
            <ProductReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addProductReview}
              prodId={product._id}
            />
          </>
        ) : (
          <NotFound message='No product found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const itemInCart = state.cart.cartItems.find(
    item => item._id === state.product.storeProduct._id
  )
    ? true
    : false;

  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    reviews: state.review.productReviews,
    reviewsSummary: state.review.reviewsSummary,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,
    itemInCart
  };
};

export default connect(mapStateToProps, actions)(ProductPage);
