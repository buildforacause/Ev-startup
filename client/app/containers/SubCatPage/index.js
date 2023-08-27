/**
 *
 * SubCatPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import { fetchStoreCategories } from '../Category/actions';
import axios from 'axios';
import SubCatList from '../../components/Store/SubCatList';

class SubCatPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      slug: "",
      brandnames: []
    }
}

  async componentDidMount() {
    let brands = (await axios.get(`/api/category/list/${this.props.match.params.slug}`));
    brands = brands.data.responsetogive;
    let brandnames = [];
    brands.map(brand => {
      brandnames.push({"value": brand.name, "label": brand.name})
    })
    this.setState({
      slug : this.props.match.params.slug,
      brands : brands,
      brandnames: brandnames
    })
  }

  render() {
    return (
      <div className='brands-page'>
        {this.state.brands.length > 0 ? (<SubCatList brandnames={this.state.brandnames} brands={this.state.brands} brand={this.state.slug}/>) : (<h4 className='mx-2'>No Products In This Category</h4>)}
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.category.storeCategories
  };
};

export default connect(mapStateToProps, actions)(SubCatPage);
