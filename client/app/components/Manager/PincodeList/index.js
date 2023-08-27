/**
 *
 * PincodeList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const PincodeList = props => {
  const { pincodes } = props;

  return (
    <div className='c-list'>
      {pincodes.map((pincode, index) => (
        <Link
          to={`/dashboard/pincode/edit/${pincode._id}`}
          key={index}
          className='d-block mb-3 p-4 category-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{pincode.pincode}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PincodeList;
