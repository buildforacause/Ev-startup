/**
 *
 * Checkout
 *
 */

import React , {useState} from 'react';
import Button from '../../Common/Button';
import axios from 'axios';

const Checkout = props => {

  const { authenticated, handleShopping, handleCheckout, addresses } = props;

  const checkoutHandler = () => {
    if(addresses.length < 1){
      window.location.href = '/dashboard/address';
      return;
    }
      window.location.href = '/checkout/address';
      return;
}
  return (
    <div className='easy-checkout'>
      <div className='checkout-actions'>
        <Button
          variant='primary'
          text='Continue shopping'
          onClick={() => handleShopping()}
        />
        {authenticated ? (
          <Button
            variant='primary'
            text='Proceed To Checkout'
            onClick={() => checkoutHandler()}
          />
        ) : (
          <Button
            variant='primary'
            text='Proceed To Checkout'
            onClick={() => handleCheckout()}
          />
        )}
      </div>
    </div>
    
  );
};

export default Checkout;
