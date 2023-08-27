/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import Button from '../../components/Common/Button';
import CarouselSlider from '../../components/Common/CarouselSlider';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';
import { Link } from 'react-router-dom';

import AddToWishList from '../../components/Store/AddToWishList';

class Homepage extends React.PureComponent {
  componentDidMount(){
    this.props.fetchFeaturedProduct();
    this.props.frequentItems();
  }
  
  render() {
    const {featuredProducts, frequentlyPurchased, isLoading, authenticated, updateWishlist} = this.props;
    const displayProducts = featuredProducts && featuredProducts.length > 0;
    const goTo = (e) => {
      window.location.href = `/shop`;
  }   
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='12' className='mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
        </Row>
        <br/>
        <hr/>
        <Row className='my-3'>
        <Col xs='12' lg='10' className='mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-50 justify-content-between'>
              
              {frequentlyPurchased && (
               
                <>
                <h1>What Our Customers Are Buying?</h1>
                <hr/>
                <div className='product-list'>
                  {frequentlyPurchased.map((product, index) => (
                    <div key={index} className='mb-3 mb-md-0'>
                      <div className='product-container'>
                        <div className='item-box'>
                          <div className='add-wishlist-box'>
                            <AddToWishList
                              id={product._id}
                              liked={product?.isLiked ?? false}
                              enabled={authenticated}
                              updateWishlist={updateWishlist}
                              authenticated={authenticated}
                            />
                          </div>

                          <div className='item-link'>
                            <Link
                              to={`/product/${product.slug}`}
                              className='d-flex flex-column h-100'
                            >
                              <div className='item-image-container'>
                                <div className='item-image-box'>
                                  <img
                                    className='item-image'
                                    src={`${
                                      product.imageUrl[0]
                                        ? product.imageUrl[0]
                                        : '/images/placeholder-image.png'
                                    }`}
                                  />
                                </div>
                              </div>
                              <div className='item-body'>
                                <div className='item-details p-3'>
                                  <h1 className='item-name'>{product.name}</h1>
                                  <p className='price mb-0'>₹{product.price}</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </>
              )}
            </div>
            </Col>
            </Row>

            <br/>
            <Button
                  variant='primary'
                  text='Browse All Products'
                  className='w-100 text-center'
                  onClick={(e) => goTo(e)}
                />
            <hr/>
            
        {displayProducts && (
          <>
            <h1>Featured Products</h1>
            <hr/>
            <Row className='my-3'>
                  
              <Col xs='12' lg='10' className='order-lg-3 mb-3 px-3 px-md-2'>
                {isLoading && <LoadingIndicator />}
                
                <div className='product-list'>
                  {featuredProducts.map((product, index) => (
                    <div key={index} className='mb-3 mb-md-0'>
                      <div className='product-container'>
                        <div className='item-box'>
                          <div className='add-wishlist-box'>
                            <AddToWishList
                              id={product._id}
                              liked={product?.isLiked ?? false}
                              enabled={authenticated}
                              updateWishlist={updateWishlist}
                              authenticated={authenticated}
                            />
                          </div>

                          <div className='item-link'>
                            <Link
                              to={`/product/${product.slug}`}
                              className='d-flex flex-column h-100'
                            >
                              <div className='item-image-container'>
                                <div className='item-image-box'>
                                  <img
                                    className='item-image'
                                    src={`${
                                      product.imageUrl[0]
                                        ? product.imageUrl[0]
                                        : '/images/placeholder-image.png'
                                    }`}
                                  />
                                </div>
                              </div>
                              <div className='item-body'>
                                <div className='item-details p-3'>
                                  <h1 className='item-name'>{product.name}</h1>
                                  <p className='price mb-0'>₹{product.price}</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              
            
              </Col>
            </Row>
        </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    featuredProducts: state.product.featuredProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
    frequentlyPurchased: state.product.frequentlyPurchased
  };
};

export default connect(mapStateToProps, actions)(Homepage);
