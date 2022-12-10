import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function MainNav({ onLogout }) {

    return (
      <Navbar bg="light" expand="lg" className="py-0 mx-0 px-0">
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link className="rounded-0" as={NavLink} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="rounded-0" as={NavLink} to="/students">
              Students
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="rounded-0" as={NavLink} to="/new_student">
              New Student
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="rounded-0" to="/logout" as={NavLink} onClick={onLogout}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>  
    )
  }

  export default MainNav;