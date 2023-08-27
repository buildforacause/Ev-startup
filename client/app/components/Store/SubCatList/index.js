/**
 *
 * SubCatList
 *
 */

import React from 'react';
import SelectOption from '../../Common/SelectOption';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const SubCatList = props => {
  const { brandnames, brands, brand } = props;
  const goTo = (e) => {
    let slug = e.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    window.location.href = `/shop/category/${slug}`;
}   
  return (
    <div className='brand-list'>

      <h3 className='text-uppercase'>Shop By Sub-Categories of {brand}</h3>
      <hr />
      <SelectOption label={'Search'} options={brandnames} multi={false} handleSelectChange={value => {goTo(value);}}></SelectOption>
      <Row className='flex-sm-row'>
        {brands.map((brand, iindex) => (
    
          <Col xs='6' md='4' lg='3' key={iindex} className='text-center mb-3 px-2'>
            <Link
              to={`/shop/category/${brand.slug}`}
              className='d-block brand-box'
            >
              <h5>{brand.name}</h5>
            </Link>
          </Col>
      
        ))}
      </Row>
    </div>
  );
};

export default SubCatList;
