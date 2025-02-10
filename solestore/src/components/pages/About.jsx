import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const About = ({ mode }) => {
  const aboutBanner = () => {
    if (window.innerWidth < 500) {
      return "/images/aboutUs_phone_bg.png";
    } else {
      return "/images/aboutUs_bg.png";
    }
  };
  return (
    <>
      <div data-theme={mode}>
        <div id="aboutPageBanner">
          <img src={aboutBanner()} alt="" width="100%" id="laptopAboutBanner" />
        </div>
        <Container>
          <Row className="m-5">
            <Col md={6} className="tw:flex tw:items-center">
              <img
                src={
                  mode === "light"
                    ? "/images/lightmode_logo.png"
                    : "/images/darkmode_logo.png"
                }
                alt="logo"
                className="tw:w-[50%] tw:rounded-full tw:h-auto tw:mx-auto"
              />
            </Col>
            <Col
              md={6}
              className="tw:dark:text-white tw:flex tw:items-center tw:flex tw:flex-col tw:items-start tw:justify-items-center"
            >
              <h1>Who are we?</h1>
              <p>
                We are students from NMIMS MPSTME MUMBAI, Creating our frist
                website design as our front end development project
              </p>
              <p>
                This is a random paragraph <br /> Generating random paragraphs
                can be an excellent way for writers to get their creative flow
                going at the beginning of the day. The writer has no idea what
                topic the random paragraph will be about when it appears. This
                forces the writer to use creativity to complete one of three
                common writing challenges. The writer can use the paragraph as
                the first one of a short story and build upon it. A second
                option is to use the random paragraph somewhere in a short story
                they create. The third option is to have the random paragraph be
                the ending paragraph in a short story. No matter which of these
                challenges is undertaken, the writer is forced to use creativity
                to incorporate the paragraph into their writing.
              </p>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
        <Container className="my-4 tw:dark:shadow-[0px_5px_10px_rgb(255,255,255)] tw:rounded-lg tw:dark:text-white tw:shadow-[0px_5px_10px_rgb(0,0,0)]">
          <Row>
            <h1 className="text-center tw:font-brand p-4">
              Know About the Creater of this Project
            </h1>
          </Row>
          <Row>
            <Col md={6} className="tw:flex tw:items-center my-3">
              <img
                src={"/images/aaditya_profile.jpeg"}
                alt="logo"
                className="tw:w-[40%] tw:rounded-full tw:h-auto tw:mx-auto"
              />
            </Col>
            <Col
              md={6}
              className="my-3 tw:dark:text-white tw:flex tw:items-center tw:flex-col tw:md:items-start tw:justify-items-center"
            >
              <Link
                to={"https://www.aadityamall.tech/"}
                className="tw:font-brand tw:font-bold pb-2 py-1 text-reset tw:no-underline tw:flex tw:justify-items-center tw:items-center"
              >
                Aaditya Mall <i class="fa fa-external-link tw:px-[10px]"></i>
              </Link>
              <Link
                to={"tel:9326430750"}
                className="py-1 text-reset tw:no-underline tw:flex tw:justify-items-center tw:items-center"
              >
                <i className="fa fa-phone"></i>
                <span className="tw:px-[10px]"> : 9326430750</span>
              </Link>
              <Link
                to={"mailto:aadityarmall@gmail.com"}
                className="py-1 text-reset tw:no-underline tw:flex tw:justify-items-center tw:items-center"
              >
                <i className="fa fa-envelope"></i>
                <span className="tw:px-[10px]">: aadityarmall@gmail.com</span>
              </Link>
              <div className="py-1 mb-2">
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
              <p className="tw:md:!text-left text-center">
                Pursuing Bachelor of Technology in the field of Computer Science
                with a specialization in Artificial Intelligence. Creative
                individual with good skills in math, logic, coding, and looking
                forward to learn new things.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;
