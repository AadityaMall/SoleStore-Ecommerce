import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Contact = ({ mode }) => {
  const contactBanner = () => {
    if (window.innerWidth < 500) {
      return "/images/contactUs_phone_bg.png";
    } else {
      return "/images/contactUs_bg.png";
    }
  };

  return (
    <>
      <div data-theme={mode}>
        <div id="contactPageBanner">
          <img 
            src={contactBanner()} 
            alt="" 
            width="100%" 
            id="laptopContactBanner" 
          />
        </div>

        <Container>
          <Row className="m-5 tw:dark:text-white">
            <Col md={6} className="tw:py-5 tw:px-2">
              <span className="tw:text-xl tw:font-bold">GET IN TOUCH</span>
              <h2 className="tw:my-4 tw:font-brand">Visit our agency location or contact us today.</h2>
              <h5 className="tw:mb-4">Head Office</h5>
              <div className="tw:flex tw:flex-col tw:gap-4">
                <div className="tw:flex tw:items-center tw:gap-3">
                  <i className="fa fa-map"></i>
                  <span>MPSTME, Vile Parle (W), Mumbai</span>
                </div>
                <div className="tw:flex tw:items-center tw:gap-3">
                  <i className="fa fa-envelope"></i>
                  <span>aadityarmall@gmail.com</span>
                </div>
                <div className="tw:flex tw:items-center tw:gap-3">
                  <i className="fa fa-phone"></i>
                  <span>9326430750</span>
                </div>
                <div className="tw:flex tw:items-center tw:gap-3">
                  <i className="fa fa-clock-o"></i>
                  <span>9:00 - 20:00 Monday- Friday</span>
                </div>
              </div>
            </Col>

            <Col md={6} className="tw:px-2 tw:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9775582333496!2d72.83381305123623!3d19.108640422298908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b888ae67fd%3A0xe0b9538d623ac5d2!2sMukesh%20Patel%20School%20of%20Technology%20Management%20%26%20Engineering!5e0!3m2!1sen!2sin!4v1712229935762!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="myMapFrame"
                className="tw:rounded-lg"
              ></iframe>
            </Col>
          </Row>
        </Container>

        <Container className="tw:mb-4 tw:dark:shadow-[0px_5px_10px_rgb(255,255,255)] tw:rounded-lg tw:dark:text-white tw:shadow-[0px_5px_10px_rgb(0,0,0)]">
          <Row className="tw:m-3 tw:p-4">
            <div className="tw:text-center">
              <span className="tw:text-xl tw:font-bold">LEAVE A MESSAGE</span>
              <h2 className="tw:my-4 tw:font-brand">We love your feedbacks!</h2>
            </div>
          </Row>
          <Row className="tw:p-4">
            <Col md={8}>
              <form
                action="https://formspree.io/f/xvojerbo"
                method="POST"
                className="tw:flex tw:flex-col tw:gap-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  name="Name"
                  className="tw:p-2 tw:rounded-md tw:border tw:dark:bg-gray-700 tw:dark:border-gray-600"
                />
                <input
                  type="email"
                  placeholder="Email Id"
                  required
                  name="Email"
                  className="tw:p-2 tw:rounded-md tw:border tw:dark:bg-gray-700 tw:dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  name="Subject"
                  className="tw:p-2 tw:rounded-md tw:border tw:dark:bg-gray-700 tw:dark:border-gray-600"
                />
                <textarea
                  name="message"
                  cols="30"
                  rows="10"
                  placeholder="Your Message"
                  required
                  className="tw:p-2 tw:rounded-md tw:border tw:dark:bg-gray-700 tw:dark:border-gray-600"
                ></textarea>
                <button 
                  type="submit"
                  className="tw:bg-gray-800 tw:text-white tw:dark:bg-gray-700 tw:py-2 tw:px-4 tw:rounded-md 
                  tw:hover:bg-gray-700 tw:dark:hover:bg-gray-600 tw:transition-colors"
                >
                  SUBMIT
                </button>
              </form>
            </Col>

            <Col md={4} className="tw:flex tw:flex-col tw:justify-center tw:items-center">
              <div className="tw:flex tw:flex-col tw:items-center tw:gap-4">
                <img
                  src="/images/aaditya_profile.jpeg"
                  alt="aadityarmall"
                  className="tw:w-[150px] tw:h-[150px] tw:rounded-full tw:object-cover"
                />
                <div className="tw:text-center">
                  <p className="tw:mb-1"><span className="tw:font-bold">Name:</span> Aaditya Mall</p>
                  <p className="tw:mb-1"><span className="tw:font-bold">Roll Number:</span> C002</p>
                  <p className="tw:mb-1">
                    <i className="fa fa-phone tw:mr-2"></i>
                    <span>9326430750</span>
                  </p>
                  <p className="tw:mb-1">
                    <i className="fa fa-envelope tw:mr-2"></i>
                    <span>aadityarmall@gmail.com</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Contact; 