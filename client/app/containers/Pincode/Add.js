/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddPincode from '../../components/Manager/AddPincode';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  render() {
    const {
      history,
      pincodeFormData,
      pincodeChange,
      formErrors,
      addPincode
    } = this.props;

    return (
      <SubPage
        title='Add Pincode'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddPincode
          pincodeFormData={pincodeFormData}
          formErrors={formErrors}
          pincodeChange={pincodeChange}
          addPincode={addPincode}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    pincodeFormData: state.pincode.pincodeFormData,
    formErrors: state.category.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
