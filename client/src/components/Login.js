import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login({ onLogin }) {
    const [uga_my_id, setUgaMyId] = useState("");
    const [password, setPasswordDigest] = useState("");
    const [user, setUser] = useState({
        password: "",
        uga_my_id: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/v1/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: password, uga_my_id: uga_my_id}),
        })
        .then((res) => res.json())
        .then((data) => {
            onLogin(data)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>UGA MyID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter UGA MyID"
                    name='uga_my_id'
                    value={uga_my_id}
                    onChange={(e) => setUgaMyId(e.target.value)}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name='password'
                    value={password}
                    onChange={(e) => setPasswordDigest(e.target.value)}
                />
            </Form.Group>
            

            <Button type="submit">Log In</Button>
        </Form>
    );
}

export default Login;