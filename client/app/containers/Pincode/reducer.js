
/*
 *
 * Category reducer
 *
 */

import {
    FETCH_PINCODE,
    FETCH_PINCODES,
    PINCODE_EDIT_CHANGE,
    PINCODE_CHANGE,
    SET_PINCODE_FORM_ERRORS,
    ADD_PINCODE,
    REMOVE_PINCODE,
    SET_PINCODES_LOADING,
    RESET_PINCODE,
    SET_PINCODE_FORM_EDIT_ERRORS
  } from './constants';
  
  
  const initialState = {
    pincodes: [],
    storeCategories: [],
    pincode: {
      _id: ''
    },
    pincodeFormData: {
      pincode: 0,
      cost: 0
    },
    formErrors: {},
    editFormErrors: {},
    isLoading: false
  };
  
  const pincodeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PINCODES:
        return {
          ...state,
          pincodes: action.payload
        };
      case FETCH_PINCODE:
        return {
          ...state,
          pincode: action.payload
        };
      case ADD_PINCODE:
        return {
          ...state,
          pincodes: [...state.pincodes, action.payload]
        };
      case REMOVE_PINCODE:
        const index = state.pincodes.findIndex(b => b._id === action.payload);
        return {
          ...state,
          pincodes: [
            ...state.pincodes.slice(0, index),
            ...state.pincodes.slice(index + 1)
          ]
        };
      case PINCODE_EDIT_CHANGE:
          return {
            ...state,
            pincode: {
              ...state.pincode,
              ...action.payload
            }
          };
      case PINCODE_CHANGE:
        return {
          ...state,
          pincodeFormData: { ...state.pincodeFormData, ...action.payload }
        };
      case SET_PINCODE_FORM_ERRORS:
        return {
          ...state,
          formErrors: action.payload
        };
      case SET_PINCODE_FORM_EDIT_ERRORS:
        return {
          ...state,
          editFormErrors: action.payload
        };
      case SET_PINCODES_LOADING:
        return {
          ...state,
          isLoading: action.payload
        };
      case RESET_PINCODE:
        return {
          ...state,
          pincodeFormData: {
            pincode: 0,
            cost:0
          },
          pincode: {
            _id: ''
          },
          formErrors: {},
          editFormErrors: {}
        };
      default:
        return state;
    }
  };
  
  export default pincodeReducer;
  