/**
 *
 * AddPincode
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const AddPincode = props => {
  const {
    pincodeFormData,
    formErrors,
    pincodeChange,
    addPincode
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addPincode();
  };

  return (
    <div className='add-category'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'number'}
              error={formErrors['pincode']}
              label={'Pincode'}
              name={'pincode'}
              placeholder={'Pincode'}
              value={pincodeFormData.pincode}
              onInputChange={(name, value) => {
                pincodeChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'number'}
              error={formErrors['cost']}
              label={'Shipping Cost'}
              name={'cost'}
              placeholder={'In Rupees'}
              value={pincodeFormData.cost}
              onInputChange={(name, value) => {
                pincodeChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-category-actions'>
          <Button type='submit' text='Add Pincode' />
        </div>
      </form>
    </div>
  );
};

export default AddPincode;
