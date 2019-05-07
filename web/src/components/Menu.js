import React from 'react';
import { Navbar, Container } from "react-bootstrap";

export default props => (
    <Navbar bg="light">
        <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="/create">Criar</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);