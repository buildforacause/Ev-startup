/*
 *
 * Pincode
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';
import { ROLES } from '../../constants';
import Add from './Add';
import Edit from './Edit';
import List from './List';
import Page404 from '../../components/Common/Page404';

class Pincode extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='category-dashboard'>
        <Switch>
          <Route exact path='/dashboard/pincode' component={List} />
          <Route exact path='/dashboard/pincode/edit/:id' component={Edit} />
          {user.role === ROLES.Admin && (
          <Route exact path='/dashboard/pincode/add' component={Add} />
          )} 
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

export default connect(mapStateToProps, actions)(Pincode);
