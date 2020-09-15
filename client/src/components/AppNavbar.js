import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavbarToggler, Collapse } from 'reactstrap';

const AppNavBar = () => {
  return (
    <>
      <Navbar color="dark" expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Side Project's Blog(하규 블로그)
          </Link>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              <h1 className="text-white">authLink</h1>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavBar;
