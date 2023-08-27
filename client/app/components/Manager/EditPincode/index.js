/**
 *
 * EditPincode
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const EditPincode = props => {
  const {
    pincode,
    deletePincode,
    editPincode,
    pincodeChange,
    formErrors
  } = props;

  const handleEdit = event => {
    event.preventDefault();
    editPincode();
  };

  const handleSubmit = event => {
    event.preventDefault();
    deletePincode();
  };

  return (
    <div className='edit-category'>
      <form onSubmit={handleEdit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'number'}
              error={formErrors['pincode']}
              label={'Pincode'}
              name={'pincode'}
              placeholder={'Pincode'}
              value={pincode.pincode}
              onInputChange={(name, value) => {
                pincodeChange(name, value)
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
              value={pincode.cost}
              onInputChange={(name, value) => {
                pincodeChange(name, value)
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
        <Button
            type='submit'
            text='Edit'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            text='Delete'
            variant='danger'
            onClick={() => handleSubmit}
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />

        </div>
      </form>
    </div>
  );
};

export default EditPincode;
