import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expanded={expanded}
      expand="md"
      bg="light"
      fixed="top"
      className="p-2 shadow-sm"
    >
      <Container>
        <Navbar.Brand href="/">CertiMail</Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded((prev) => !prev)}
          aria-controls="navbar-nav"
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
