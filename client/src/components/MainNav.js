import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function MainNav() {
    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then(() => {
          setUser("");
          navigate("/");
        });
      }

    return (
      <Navbar bg="light" expand="lg" className="py-0 mx-0 px-0">
        <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link className="rounded-0" as={NavLink} to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="rounded-0"
            as={NavLink}
            onClick={handleLogout}
          >
            Logout
          </Nav.Link>
        </Nav.Item>
        <NavDropdown className="rounded-0" title="Advising">
          <NavDropdown.Item
            className="rounded-0"
            as={NavLink}
            to="/students"
          >
            Students
          </NavDropdown.Item>
          <NavDropdown.Item
            className="rounded-0"
            as={NavLink}
            to="/new-student"
          >
            New Student
          </NavDropdown.Item>
        </NavDropdown>
        </Nav>
      </Navbar>  
    )
  }

  export default MainNav;