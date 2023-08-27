/*
 *
 * Checkout reducer
 *
 */

import {
    ADDRESS_SUBMIT,
    SET_ADDRESS_FORM_ERRORS
  } from './constants';
  
  const initialState = {
    addressFormData: {
      address: '',
      name: '',
      email: '',
      phone: 0,
      shippingcost: 0,
      error: ''
    },
    formErrors: {}
  };
  
  const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ADDRESS_FORM_ERRORS:
        return {
            ...state,
            formErrors: action.payload
        };
      case ADDRESS_SUBMIT:
        return {
          ...state,
          addressFormData: {
            ...state.addressFormData,
            ...action.payload
          }
        };
      default:
        return state;
    }
  };
  
  export default checkoutReducer;
  