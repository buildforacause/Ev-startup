/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditPincode from '../../components/Manager/EditPincode';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetPincode();
    const _id = this.props.match.params.id;
    this.props.fetchPincode(_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetPincode();
      const _id = this.props.match.params.id;
      this.props.fetchPincode(_id);
    }
  }

  render() {
    const {
      history,
      pincode,
      formErrors,
      deletePincode,
      editPincode,
      pincodeEditChange,
      editFormErrors
    } = this.props;

    return (
      <SubPage
        title='Edit Pincode'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        {pincode?._id ? (
          <EditPincode
            formErrors={formErrors}
            deletePincode={deletePincode}
            pincode={pincode}
            pincodeChange={pincodeEditChange}
            editPincode={editPincode}
            editFormErrors={editFormErrors}
          />
        ) : (
          <NotFound message='No pincode found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    pincode: state.pincode.pincode,
    formErrors: state.pincode.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
