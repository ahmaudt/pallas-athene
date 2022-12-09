import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

function SignUp({ onSignUp }) {
  const navigate = useNavigate();
  const [uga_my_id, setUgaMyId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uga_my_id, first_name, last_name, password }),
    })
      .then((r) => r.json())
      .then((user) => {
        onSignUp(user);
        navigate('/students')
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>UGA MyID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter UGA MyID"
          value={uga_my_id}
          onChange={(e) => setUgaMyId(e.target.value)}
        />
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Sign Up</Button>
    </form>
  );
}