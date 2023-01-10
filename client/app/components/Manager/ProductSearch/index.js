import React from 'react';
import SearchBar from '../../Common/SearchBar';

const ProductSearch = props => {
  return (
    <div className='mb-3'>
      <SearchBar
        name='product'
        placeholder='Search for products'
        btnText='Search'
        onSearch={props.onSearch}
        onBlur={props.onBlur}
        onSearchSubmit={props.onSearchSubmit}
      />
    </div>
  );
};

export default ProductSearch;
