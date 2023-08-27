/**
 *
 * BrandsPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import BrandList from '../../components/Store/BrandList';

class BrandsPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreBrands();
    this.props.fetchBrandsSelect();
  }

  render() {
    const { brands, brandnames } = this.props;
    return (
      <div className='brands-page'>
        <BrandList brands={brands} brandnames={brandnames} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brands: state.brand.storeBrands,
    brandnames: state.brand.brandsSelect
  };
};

export default connect(mapStateToProps, actions)(BrandsPage);
