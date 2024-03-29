/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import SelectOption from '../../Common/SelectOption';

const ProductList = props => {
  const { products, productnames } = props;
  const goTo = (e) => {
    let slug = e.value;
    window.location.href = `/dashboard/product/edit/${slug}`;
}   

  return (
    <div className='p-list'>
      <SelectOption label={'Search'} options={productnames} multi={false} handleSelectChange={value => {goTo(value);}}></SelectOption>
      {products.map((product, index) => (
        <Link
          to={`/dashboard/product/edit/${product._id}`}
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
        >
          <img
            className='item-image'
            src={`${
              product && product.imageUrl[0]
                ? product.imageUrl[0]
                : '/images/placeholder-image.png'
            }`}
          />
          <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
            <h4 className='text-truncate'>{product.name}</h4>
            <p className='mb-2 text-truncate'>{product.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
