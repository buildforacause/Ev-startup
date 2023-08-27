/*
 *
 * Checkout
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';

import Go from './Go';
import Page404 from '../../components/Common/Page404';

class Checkout extends React.PureComponent {
  render() {
    return (
      <div className='address-dashboard'>
        <Switch>
          <Route exact path='/checkout/address' component={Go} />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Checkout);
