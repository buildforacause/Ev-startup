import React from 'react';

import { Row, Col } from 'reactstrap';
import axios from 'axios';
import SelectOption from '../../Common/SelectOption';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { useState } from 'react';

const recommedableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];


const Add = props => {
  const [ button, setButton] = useState(true);
  const { reviewFormData, reviewChange, reviewFormErrors, addReview, prodId } = props;

const fetch = async() => {
  const checkOrder = Array();
  try{
  const page = 1;
  const response = await axios.get(`/api/order/me`, {
    params: {
      page: page ?? 1,
      limit: 20
    }
  });

  const { orders, totalPages, currentPage, count } = response.data;

  Array(orders).map((e) => {
    Array(e[0]).forEach((ex) => {
      let qex = ex.products;
      Array(qex[0]).forEach((exa) => {
        if(exa.product._id === prodId){
          checkOrder.push("1");
        }
      });
    });
  });
  return checkOrder;

  // console.log(Array(orders).forEach((e) => Array(e.products).forEach((ex) => Array(ex.product).some(checkOrder))));
  // console.log(Array(orders[0].products[0].product._id))
  
  }catch(error){
    return [];
  }
}
  const handleSubmit = event => {
    event.preventDefault();
    addReview();
  };

  fetch().then((r) => {
    r.length > 0 ? setButton(true) : setButton(false);
  })
  

  return (
    <div className='bg-white p-4 box-shadow-primary add-review'>
      <form onSubmit={handleSubmit} noValidate>
        <h3 className='mb-3'>Add Review</h3>
        <Row>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={reviewFormErrors['title']}
              label={'Title'}
              name={'title'}
              placeholder={'Enter Review title'}
              value={reviewFormData.title}
              onInputChange={(name, value) => {
                reviewChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={reviewFormErrors['review']}
              label={'Comment'}
              name={'review'}
              placeholder={'Write Review'}
              value={reviewFormData.review}
              onInputChange={(name, value) => {
                reviewChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'stars'}
              error={reviewFormErrors['rating']}
              label={'Rating'}
              name={'rating'}
              value={reviewFormData.rating}
              onInputChange={(name, value) => {
                reviewChange(name, value);
              }}
            />
          </Col>
          {/* <Col xs='12' md='12'>
            <SelectOption
              error={reviewFormErrors['isRecommended']}
              label={'Will you recommend this product?'}
              name={'isRecommended'}
              value={reviewFormData.isRecommended}
              options={recommedableSelect}
              handleSelectChange={value => {
                reviewChange('isRecommended', value);
              }}
            />
          </Col> */}
        </Row>
        {button ? (
        <div className='mt-4'>
          <Button type='submit' text='Publish Review' />
        </div>) : (
          <div className='mt-4'>
          <center><p>It looks like you haven't ordered this product yet!</p></center>
        </div>
        )
}

      </form>
    </div>
  );
};

export default Add;
