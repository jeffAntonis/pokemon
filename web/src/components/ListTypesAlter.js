import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Table } from "react-bootstrap";

import api from '../services/api';

export default ({ types, setTypes }) => {
    const [typesCombo, setTypesCombo] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);
    
    const getTypesCombo = async () => {
        const response = await api.get(`getTypesCombo`);
        
        setTypesCombo(response.data.data);
    }

    const addType = () => {
        let aux = types;
        let exist = false;

        if(typeSelected != ""){
            aux.map((type, index) => {
                if(type.ds_type === typeSelected){
                    exist = true;
                    return;
                }
            });
    
            if(!exist){
                aux.push({ ds_type: typeSelected });
                setTypeSelected(aux);
            }
        }
    }

    const removeType = (typeRemove) => {
        setTypes(types.filter(type => type.ds_type != typeRemove.ds_type));
    }

    useEffect(() => {
        getTypesCombo();
    }, []);
    
    return (
        <>
        <Row>
            <Col md="10">
                <Form.Group>
                    {/* <Form.Label>Tipo(s)</Form.Label> */}
                    <Form.Control as="select" onChange={(event) => setTypeSelected(event.target.value)}>
                        <option value="">::SELECIONE::</option>
                        {
                            typesCombo.map((type, index) => {
                                return <option value={type.ds_type} key={index}>{type.ds_type}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col md="2">
                <Form.Group>
                    <Button 
                        variant="primary"
                        onClick={() => addType()}
                    >
                        Relacionar
                    </Button>        
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Tipos Relacionados</th>
                            <th align="left">Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            types.map((type, index) => (
                                <tr key={index}>
                                    <td>{type.ds_type}</td>
                                    <td>
                                    <Button
                                            variant="danger"
                                            onClick={() => removeType(type)}
                                        >
                                            Remover
                                        </Button>  
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
        </>
    );
}