/*
 *
 * Privacy Policy
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../../actions";

class Privacy extends React.PureComponent {
  render() {
    return (
      <div className="sell">
        <h3 className="text-uppercase">Privacy Policy</h3>
        <hr />
        <Row>
          <Col xs="12" md="12">
            <Row>
              <Col xs="12" className="order-2 order-md-1 text-md-center mb-3">
                <div className="agreement-banner-text">
                  <h3>Who we are</h3>
                  <p>
                  Our Company operates under the name and brand of Manpasand Furniture. Our Company is based in Mumbai operating and flourishing for more than 25 years in the Furniture industy. Our website address is: https://www.manpasandfurniture.in.
What personal data we collect and why we collect it
When you visit the Site, we automatically collect your Device Information. Device Information means information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. 
Furthermore, when you make a purchase or attempt to make a purchase through the Site, we collect your Order Information. Order Information” includes your name, billing address, shipping address, payment information (including credit card numbers), email address (including email address, if payment made via Razorpay), and phone number. 
When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
 After approval of your comment, your profile picture is visible to the public in the context of your comment.
                  </p>

                  <h3>USE OF PERSONAL INFORMATION</h3>
                  We use the Order Information that we collect generally to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). 
We use this Information to personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.
<br/>•	To improve our website in order to better serve you.
<br/>•	To allow us to better service you in responding to your customer service requests.
<br/>•	To administer a contest, promotion, survey or other site feature.
<br/>•	To quickly process your transactions.
<br/>•	To follow up with them after correspondence (email or phone inquiries)
<br/>•	Screen our orders for potential risk or fraud 
<br/>•	When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services. 
We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns). Additionally, we use Device Information for behavioural advertising including retargeting with advertisements that may interest you using the advertising platforms offered by: Facebook, Google, Snapchat, Pinterest, Reddit, Microsoft among others.
Cookies
“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. These are small files that a site or its service provider transfers to your computer’s hard drive through your Web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information. 
We use cookies to help remember and process the items in the shopping cart, understand and save user’s preferences for future visits and to compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
You can choose to turn off all cookies. If you turn cookies off, some features will be disabled. It won’t affect the user’s experience that make your site experience more efficient and the site may not function properly. However, you will still be able to place orders.
If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
When you log in, we will also set up several cookies to save your login information and your screen display choices. If you select “Remember Me”, your login will persist for two weeks.
Embedded content from other websites
Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.

        <h3>Analytics</h3>
        Who we share your data with
We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
What rights you have over your data
If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
Opt Out
As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. 
You can opt out of targeted advertising by using the links below:
<br/>•	Facebook: <a href='https://www.facebook.com/settings/?tab=ads'>https://www.facebook.com/settings/?tab=ads</a>
<br/>•	Google: <a href='https://www.google.com/settings/ads/anonymous'>https://www.google.com/settings/ads/anonymous</a>
<br/>•	Bing: <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</a>

<h3>DO NOT TRACK</h3>
Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
<h3>DATA RETENTION</h3>
When you place an order through the Site, we will maintain your Order Information for our records.
<h3>CHANGES</h3>
We may update this Privacy Policy from time to time including but not limited to reflect changes to our practices or for other operational, legal or regulatory reasons, without prior notice or information, as per our convenience. Kindly check the Privacy Policy for any changes. 
<h3>CONTACT US</h3>
For more information about our privacy practices, if you have questions, or if you would like to make a complaint, you can reach out to us by email at manpasandfurnitures@gmail.com

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

export default connect(mapStateToProps, actions)(Privacy);
