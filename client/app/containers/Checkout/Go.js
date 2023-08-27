/*
 *
 * Main Checkout
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import actions from '../../actions';
import { Row, Col } from 'reactstrap';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

class Go extends React.PureComponent {
    componentDidMount(){
        this.props.fetchAddresses();
    }

  render() {
    const { addresses, addressChange, formErrors, checkAddressSet, addressFormData, cartTotal, shippingcost, error } = this.props;
    const handleSubmit = event => {
        event.preventDefault();
        checkAddressSet(cartTotal+shippingcost);
      };

    return (
        <>
        <div className='a-list'>
            <h3>Choose An Address</h3>
            <form onSubmit={handleSubmit} noValidate>
            <Row>
          
            {addresses.map((address, index) => (
                <Col className='my-2' xs='12' md='6' lg='6' key={index}>
                <div className='d-flex align-items-center mb-3 address-box' >
                <div className='flex-1 p-3 p-lg-4'>
                    <Input 
                        value={address._id}
                        type={'radio'}
                        name={'address'}
                        error={formErrors['address']}
                        label={`${address.address} ${address.city} - ${address.zipCode}`}
                        onInputChange={(name, value) => {
                            addressChange(name, value);
                        }}
                    />
                </div>
                </div>
                </Col>
            ))}

              <Col className='my-2' xs='12' md='12' lg='12'>
                <Input 
                    value={addressFormData.name}
                    type={'text'}
                    name={'name'}
                    error={formErrors['name']}
                    label={'Name (This will be used at the time of delivery)'}
                    onInputChange={(name, value) => {
                        addressChange(name, value);
                    }}
                />
                </Col>

                <Col className='my-2' xs='12' md='12' lg='12'>
                <Input 
                    value={addressFormData.email}
                    type={'text'}
                    name={'email'}
                    error={formErrors['email']}
                    label={'Email'}
                    onInputChange={(name, value) => {
                        addressChange(name, value);
                    }}
                />
                </Col>

                <Col className='my-2' xs='12' md='12' lg='12'>
                <Input 
                    value={addressFormData.phone}
                    type={'number'}
                    name={'phone'}
                    error={formErrors['phone']}
                    label={'Contact Number'}
                    onInputChange={(name, value) => {
                        addressChange(name, value);
                    }}
                />
                </Col>

            </Row>
            <div className='add-address-actions my-2 text-right'>
                <h5>Total: ₹ {cartTotal}</h5>
                <h5>Shipping : ₹ {shippingcost}</h5>
                <h2>Grand Total: ₹ {cartTotal + shippingcost}</h2>
                {error.length > 0 ? error : <Button type='submit' text='Proceed To Pay' variant='primary' />}
            </div>
            </form>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => {
    console.log(state.checkout.addressFormData)
  return {
    user: state.account.user,
    addresses: state.address.addresses,
    formErrors: state.checkout.formErrors,
    addressFormData: state.checkout.addressFormData,
    cartTotal: state.cart.cartTotal,
    shippingcost: state.checkout.addressFormData.shippingcost,
    error: state.checkout.addressFormData.error
  };
};

export default connect(mapStateToProps, actions)(Go);
