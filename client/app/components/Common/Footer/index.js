/**
 *
 * Footer
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';

const Footer = () => {
  const infoLinks = [
    { id: 0, name: 'About Us', to: '/shipping' },
    { id: 1, name: 'Contact Us', to: '/contact' },
    { id: 2, name: 'Sell With Us', to: '/sell' },
    { id: 3, name: 'Shipping', to: '/shipping' }
  ];

  const footerBusinessLinks = (
    <ul className='support-links'>
      <li className='footer-link'>
        <Link to='/dashboard'>Account Details</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Orders</Link>
      </li>
    </ul>
  );

  const quickLinks = (
    <ul className='support-links'>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Privacy Policy</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Return Policy</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Terms Of Service</Link>
      </li>
    </ul>
  );

  const navLinks = (
    <ul className='support-links'>
      <li className='footer-link'>
        <Link to='/shop'>Browse Products</Link>
      </li>
      <li className='footer-link'>
        <Link to='/brands'>Shop By Brands</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Shop By Categories</Link>
      </li>
    </ul>
  );

  const footerLinks = infoLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-content'>
                    
        <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Navigation</h3>
            </div>
            <div className='block-content'>
              <ul>{navLinks}</ul>
            </div>
          </div>

          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Customer Service</h3>
            </div>
            <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div>
          </div>
          {/* <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Newsletter</h3>
              <Newsletter />
            </div>
          </div> */}
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Quick Links</h3>
            </div>
            <div className='block-content'>
              <ul>{quickLinks}</ul>
            </div>
          </div>
        </div>
        <div className='footer-copyright'>
          <span>© {new Date().getFullYear()} <a href="/" className='text-success' style={{fontWeight: 500}}>EV Store</a></span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
