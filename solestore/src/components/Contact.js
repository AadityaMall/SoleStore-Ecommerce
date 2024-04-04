import React from "react";
import "./Layout/css/Contact.css";
import { useEffect } from "react";

const Contact = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const contactBanner = () => {
    if (window.innerWidth < 500) {
      return "./images/contactUs_phone_bg.png";
    } else {
      return "./images/contactUs_bg.png";
    }
  };
  const contactformButton = () => {
    if (props.mode === "light") {
      return {};
    } else {
      return {
        color: "white",
      };
    }
  };

  return (
    <>
      <div className={`text-${props.mode === "light" ? "dark" : "light"}`}>
        <div id="contactPageBanner">
          <img
            src={contactBanner()}
            width="100%"
            alt=""
            id="laptopContactBanner"
          />
        </div>

        <div className="row m-5">
          <div id="contactDetails" className="col-md-6 py-5 px-2">
            <span>GET IN TOUCH</span>
            <h2>Visit our agency location or contact us today.</h2>
            <h5>Head Office</h5>
            <ul>
              <li>
                <i className="fa fa-map"></i>
                <span>MPSTME, Vile Parle (W), Mumbai</span>
              </li>
              <li>
                <i className="fa fa-envelope"></i>
                <span>aadityarmall@gmail.com</span>
              </li>
              <li>
                <i className="fa fa-phone"></i>
                <span>9326430750</span>
              </li>
              <li>
                <i className="fa fa-clock-o"></i>
                <span>9:00 - 20:00 Monday- Friday</span>
              </li>
            </ul>
          </div>

          <div id="map" className="col-md-6 px-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9775582333496!2d72.83381305123623!3d19.108640422298908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b888ae67fd%3A0xe0b9538d623ac5d2!2sMukesh%20Patel%20School%20of%20Technology%20Management%20%26%20Engineering!5e0!3m2!1sen!2sin!4v1712229935762!5m2!1sen!2sin"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="myMapFrame"
            ></iframe>
          </div>
        </div>

        <div id="contactTable" className="container mb-4">
          <div className="row m-3 p-4">
            <div className="col-md-12 p-0">
              <span>LEAVE A MESSAGE</span>
              <h2>We love your feedbacks!</h2>
            </div>
            <div className="col p-0 mt-4">
              <div className="row">
                <div className="col-md-8">
                  <form
                    action="https://formspree.io/f/xvojerbo"
                    id="contactForm"
                    className="adjust-flex"
                    method="POST"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      id=""
                      required
                      autofill="off"
                      name="Name"
                    />
                    <input
                      type="email"
                      placeholder="Email Id"
                      id=""
                      required
                      autofill="off"
                      name="Email"
                    />
                    <input type="text" placeholder="Subject" name="Subject" />
                    <textarea
                      name="message"
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Your Message"
                      required
                    ></textarea>
                    <button value="submit" style={contactformButton()}>
                      SUBMIT
                    </button>
                  </form>
                </div>
                <div className="col-md-4">
                  <div className="adjust-flex">
                    <div className="people-details">
                      <img
                        src="../images/aaditya_profile.jpeg"
                        alt="aadityarmall"
                      />
                      <p>
                        <span>Name :</span> Aaditya Mall <br />{" "}
                        <span>Roll Number :</span> C002
                        <br />
                        <span>Phone :</span> 9326430750 <br />
                        <span>Email :</span> aadityarmall@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
