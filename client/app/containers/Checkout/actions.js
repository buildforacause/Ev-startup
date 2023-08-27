/*
 *
 * Checkout actions
 *
 */

import axios from 'axios';
import { push } from 'connected-react-router';
import { clearCart, getCartId } from '../Cart/actions';

import {
  ADDRESS_SUBMIT,
  SET_ADDRESS_FORM_ERRORS
} from './constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

export const addressChange = (name, value) => {
  return async (dispatch, getState) => {
    let formData = {};
    let cost = 0;
    formData[name] = value;

    if(formData["address"]){
      let address = formData["address"];
      const response = await axios.get(`/api/address/${address}`);
      let pincode = response.data.address.zipCode;
      const response1 = await axios.get(`/api/product/getpincode/${pincode}`);
      console.log(response1.data);
      if(response1.data.pincode.length === 0){
        formData["error"] = "Delivery not available to this address";
        formData["shippingcost"] = 0;
      }else{
        cost = response1.data.pincode[0].cost;
        formData["shippingcost"] = cost;
        formData["error"] = "";
      }
    }
    dispatch({
        type: ADDRESS_SUBMIT,
        payload: formData
    });
  }
    
};

export const addOrder = (razorpay_order_id, address) => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const total = getState().cart.cartTotal;
      
      if (cartId) {
        const response = await axios.post(`/api/order/add`, {
          cartId,
          total,
          razorpay_order_id,
          address
        });

        dispatch(push(`/order/success/${response.data.order._id}`));
        dispatch(clearCart());
      }
      
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const placeOrder = (razorpay_order_id, address) => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');
    const cartItems = getState().cart.cartItems;
    if (token && cartItems.length > 0) {
      Promise.all([dispatch(getCartId())]).then(() => {
        dispatch(addOrder(razorpay_order_id, address));
      });
    }
  };
};




export const paymentWorks = (amount, address) => {
    return async (dispatch, getState) => {
        const response_key = await axios.get(`/api/order/getkey/hahaha`);
        const key = response_key.data.key;
        const { data: { order } } = await axios.post(`/api/order/checkout/${amount}`)
        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Manpasand Furnitures",
            description: "RazorPay Payment",
            order_id: order.id,
            handler: async function (response){
              let res = await axios.post("/api/order/verify/payment/", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
              dispatch(placeOrder(res.data.razorpay_order_id, address.address))
            },
            prefill: {
                name: address.name,
                email: address.email,
                contact: address.phone
            },
            notes: {
                "address": address.address
            },
            theme: {
                "color": "#121212"
            }
        };

        const razor = new window.Razorpay(options);
        dispatch(razor.open());
  }
}


export const checkAddressSet = (total) => {
    return async (dispatch, getState) => {
      try {
        const rules = {
          address: 'required',
          name: 'required',
          email: 'required|email',
          phone: 'required|min:10'
        };
  
        const address = getState().checkout.addressFormData;
        const { isValid, errors } = allFieldsValidation(address, rules, {
          'required.address': 'Address is required.',
          'required.name': 'Name is a mandatory field',
          'required.email': 'Email is a mandatory field',
          'required.phone': 'Phone is a mandatory field'
        });
  
        if (!isValid) {
          return dispatch({ type: SET_ADDRESS_FORM_ERRORS, payload: errors });
        }

        dispatch(paymentWorks(total, address));

  
      } catch (error) {
        handleError(error, dispatch);
      }
    };
  
  };





