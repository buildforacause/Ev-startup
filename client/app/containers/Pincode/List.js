/*
 *
 * Pincode
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import PincodeList from '../../components/Manager/PincodeList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchPincodes();
  }

  render() {
    const { history, pincodes, isLoading } = this.props;

    return (
      <>
        <SubPage
          title='Pincodes'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/pincode/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : pincodes.length > 0 ? (
            <PincodeList pincodes={pincodes} />
          ) : (
            <NotFound message='No pincodes found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    pincodes: state.pincode.pincodes,
    isLoading: state.category.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
