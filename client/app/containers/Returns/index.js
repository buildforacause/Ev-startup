/*
 *
 * Return Policy
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../../actions";

class Returns extends React.PureComponent {
  render() {
    return (
      <div className="sell">
        <h3 className="text-uppercase">Returns Policy</h3>
        <h5>
     •	Refunds, exchanges and repairs will NOT be provided after delivery has occurred UNLESS the item is defective or significantly different to those shown or described to you.
<br/>•	If you believe an item is defective, we may need to have the item assessed by the manufacturer to determine whether or not you are entitled to an exchange, refund or repair.
<br/>•	Our products are well-packaged to withstand damage during shipping. In case if the package is damaged, it is advised to video record while opening on the package, and if an item looks damaged or parts are missing, please take a photo and notify us along with the video as well as the photo within 24 hours of receipt.

</h5>
        <hr />
        <Row>
          <Col xs="12" md="12">
            <Row>
              <Col xs="12" className="order-2 order-md-1 text-md-center mb-3">
                <div className="agreement-banner-text">
                  <h3>GUIDELINES FOR RETURNS</h3>
                  <p>
                •	Pack the items securely. Please wrap the product so it does not get damaged in shipment. All returned products must be in the same condition in which they were received. Please select a box size that fits your product. Include a copy of the invoice in the package.
                <br/>•	Fill the RETURN FORM and send it with the package.
                <br/>•	Returns shall be addressed to the following Name & address:
                <h5>Manpasand Furnitures</h5>
                        (Address here)<br/>
•	Please consider sending registered mail for your return package. Caraccessory.in cannot be responsible for packages that are lost by mail.
<br/>•	Original shipping costs are non-refundable (exceptions – wrongly shipped or faulty/defective products).
<br/>•	After inspection to ensure the product is returned in original and working condition, store credits are issued within 7 days of product receipt by manpasandfurniture.in.
<br/>•	Refunds will not be issued for products that are soiled, damaged or have missing parts.
<br/>•	If your order has shipped, or is in the process of being shipped, we will be unable to cancel your order. You will need to follow the return instructions once you receive the package.
<br/>•	Please notify us about damaged furniture within 24 hours of receipt, and make sure you keep all the original boxes and packaging. Restocking fee may be applied.

                  </p>

                  <h3>CUSTOMER ENQUIRIES</h3>
                For any customer enquiries concerning incomplete or incorrect orders, or refund issues please send an email to manpasandfurnitures@gmail.com. Please quote your invoice number.
                  
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, actions)(Returns);
