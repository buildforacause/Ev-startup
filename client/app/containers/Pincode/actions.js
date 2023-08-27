/*
 *
 * Pincode actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_PINCODE,
  FETCH_PINCODES,
  PINCODE_CHANGE,
  PINCODE_SELECT,
  SET_PINCODE_FORM_ERRORS,
  SET_PINCODE_FORM_EDIT_ERRORS,
  ADD_PINCODE,
  REMOVE_PINCODE,
  SET_PINCODES_LOADING,
  RESET_PINCODE,
  PINCODE_EDIT_CHANGE
} from './constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

export const pincodeChange = (pincode, value) => {
  let formData = {};
  formData[pincode] = value;

  return {
    type: PINCODE_CHANGE,
    payload: formData
  };
};

export const pincodeEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PINCODE_EDIT_CHANGE,
    payload: formData
  };
};

export const pincodeSelect = value => {
  return {
    type: PINCODE_SELECT,
    payload: value
  };
};

export const resetPincode = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_PINCODE });
  };
};

// fetch pincodes api
export const fetchPincodes = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_PINCODES_LOADING, payload: true });
      const response = await axios.get(`/api/product/pincode/all`);
      console.log(response)
      dispatch({
        type: FETCH_PINCODES,
        payload: response.data.pincodes
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PINCODES_LOADING, payload: false });
    }
  };
};

export const fetchPincode = _id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/pincode/${_id}`);
      dispatch({
        type: FETCH_PINCODE,
        payload: response.data.pincode[0]
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add pincode api
export const addPincode = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        pincode: 'required',
        cost: 'required'
      };

      const pincode = getState().pincode.pincodeFormData;
      const newPincode = {
        pincode: pincode.pincode,
        cost: pincode.cost
      };

      const { isValid, errors } = allFieldsValidation(newPincode, rules, {
        'required.pincode': 'Pincode is required.',
        'required.cost': 'Shipping Cost is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_PINCODE_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/product/pincode/add`, newPincode);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_PINCODE,
          payload: response.data.pincode
        });
        dispatch(resetPincode());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

//edit pincode api
export const editPincode = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        pincode: 'required',
        cost: 'required',
      };

      const pincode = getState().pincode.pincode;
      console.log(pincode)
      const newPincode = {
        pincode: pincode.pincode,
        cost: pincode.cost,
      };

      const { isValid, errors } = allFieldsValidation(newPincode, rules, {
        'required.pincode': 'Pincode is required.',
        'required.cost': 'Shipping Cost is required.',
      });

      if (!isValid) {
        return dispatch({
          type: SET_PINCODE_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/product/pincode/edit/${pincode._id}`, {
        pincode: newPincode
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete pincode api
export const deletePincode = id => {
  return async (dispatch, getState) => {
    try {
      let _id = getState().pincode.pincode._id;
      const response = await axios.delete(`/api/product/pincode/delete/${_id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_PINCODE,
          payload: _id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
