import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login({ onLogin }) {
    const [uga_my_id, setUgaMyId] = useState("");
    const [password_digest, setPasswordDigest] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uga_my_id, password_digest }),
        })
        .then((r) => r.json())
        .then((user) => {
            onLogin(user)
        })
        // fetch("/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ uga_my_id, password }),
        //     })
        //     .then((r) => r.json())
        //     .then((user) => {
        //         onLogin(user);
        //     }
        // );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>UGA MyID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter UGA MyID"
                    value={uga_my_id}
                    onChange={(e) => setUgaMyId(e.target.value)}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password_digest}
                    onChange={(e) => setPasswordDigest(e.target.value)}
                />
            </Form.Group>
            

            <Button type="submit">Log In</Button>
        </Form>
    );
}

export default Login;