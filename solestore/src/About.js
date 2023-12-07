import React from "react";
import "./components/css/About.css";
const About = (props) => {
  const darkLogo = "./images/darkmode_logo.png";
  const lightLogo = "./images/lightmode_logo.png";

  const aboutBanner = () => {
    if (window.innerWidth < 500) {
      return "./images/aboutUs_phone_bg.png";
    } else {
      return "./images/aboutUs_bg.png";
    }
  };

  const creatorsCssSeter = () => {
    if (props.mode === "light") {
      return {
        boxShadow: "0px 5px 10px rgb(58, 56, 56)",
        borderRadius: "25px",
        paddingBottom: "30px",
      };
    } else {
      return {
        boxShadow: "0px 5px 10px rgb(255, 255, 255)",
        borderRadius: "25px",
        paddingBottom: "30px",
      };
    }
  };

  return (
    <>
      <div className={`text-${props.mode === "light" ? "dark" : "light"}`}>
        <div id="aboutPageBanner">
          <img src={aboutBanner()} alt="" width="100%" id="laptopAboutBanner" />
        </div>

        <div className="row m-5">
          <div className="col-md-6 mb-4 align-img adjust-padding">
            <img
              src={props.mode === "light" ? lightLogo : darkLogo}
              alt="logo"
              className="about-logo adjust-img"
              id="aboutUsMainLogo"
            />
          </div>

          <div id="text" className="col-md-6">
            <h1>Who are we?</h1>
            <p>
              We are students from NMIMS MPSTME MUMBAI, Creating our frist
              website design as our front end development project
            </p>
            <p>
              This is a random paragraph <br /> Generating random paragraphs can
              be an excellent way for writers to get their creative flow going
              at the beginning of the day. The writer has no idea what topic the
              random paragraph will be about when it appears. This forces the
              writer to use creativity to complete one of three common writing
              challenges. The writer can use the paragraph as the first one of a
              short story and build upon it. A second option is to use the
              random paragraph somewhere in a short story they create. The third
              option is to have the random paragraph be the ending paragraph in
              a short story. No matter which of these challenges is undertaken,
              the writer is forced to use creativity to incorporate the
              paragraph into their writing.
            </p>
            <br />
            <br />
          </div>
        </div>

        <div className="container mt-4 mb-4" style={creatorsCssSeter()}>
          <h1 id="mainContentHeader">Know about creator of this project</h1>
          <div className="row align-data">
            <div className="col-sm-6 align-img adjust-padding">
              <img
                src="../images/aaditya_profile.jpeg"
                alt="aadityarmall"
                className="adjust-img prof-img"
              />
            </div>
            <div className="col-sm-6 creatorMainBox my-4">
              <span>Aaditya Mall</span>
              <br />
              Phone : 9326430750 <br /> Email : aadityarmall@gmail.com
              <div className="format-socials-icons mb-2">
                <a href="https://facebook.com" className="me-4 text-reset">
                  <i className="fa fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" className="me-4 text-reset">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="https://linkedin.com" className="me-4 text-reset">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="https://github.com" className="me-4 text-reset">
                  <i className="fa fa-github"></i>
                </a>
              </div>
              Pursuing Bachelor of Technology in the field of Computer Science
              with a specialization in Artificial Intelligence. Creative
              individual with good skills in math, logic, coding, and looking
              forward to learn new things.
            </div>
          </div>
        </div>
        <hr className="format-hr" />
      </div>
    </>
  );
};

export default About;
