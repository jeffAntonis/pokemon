import React from 'react';
import { ListGroup } from "react-bootstrap";

export default ({ types }) => (
    <>
        <ListGroup.Item style={{ fontSize: 20, fontWeight: 'bold' }}>Tipo(s):</ListGroup.Item>
        {
            types.map((type, index) => (
                <ListGroup.Item key={index}>{type.ds_type}</ListGroup.Item>
        ))
        }
    </>
);