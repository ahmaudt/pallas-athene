import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login({ onLogin }) {
    const [ugaMyId, setUgaMyId] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ ugaMyId, password }),
            })
            .then((r) => r.json())
            .then((user) => {
                onLogin(user);
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>UGA MyID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter UGA MyID"
                    value={ugaMyId}
                    onChange={(e) => setUgaMyId(e.target.value)}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            

            <Button type="submit">Log In</Button>
        </Form>
    );
}

export default Login;