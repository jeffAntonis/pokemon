import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Table } from "react-bootstrap";

import api from '../services/api';

export default ({ types, setTypes, evolutions, setEvolutions, pokemon }) => {
    const [typesCombo, setTypesCombo] = useState([]);
    const [evolutionsCombo, setEvolutionsCombo] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);
    const [evolutionSelected, setEvolutionSelected] = useState('');
    
    const getTypesCombo = async () => {
        const response = await api.get(`getTypesCombo`);
        
        setTypesCombo(response.data.data);
    }

    const getEvolutionsCombo = async () => {
        const response = await api.get(`getEvolutionsCombo`);
        
        setEvolutionsCombo(response.data.data);
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

    const addEvolution = () => {
        let aux = evolutions;
        let exist = false;

        if(evolutionSelected != ""){
            aux.map((evolution, index) => {
                if(evolution.pokemon_name_evolution === evolutionSelected){
                    exist = true;
                    return;
                }
            });
    
            if(!exist){
                aux.push({ 0 : {name: evolutionSelected} });
                setEvolutionSelected(aux);
            }
        }
    }

    const removeType = (typeRemove) => {
        setTypes(types.filter(type => type.ds_type != typeRemove.ds_type));
    }

    const removeEvolution = (evolutionRemove) => {
        setEvolutions(evolutions.filter(evolution => evolution[0].name != evolutionRemove[0].name));
    }

    useEffect(() => {
        getTypesCombo();
        getEvolutionsCombo();
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
        <br/>
            <Row>
                <Col md="10">
                    <Form.Group>
                        {/* <Form.Label>Tipo(s)</Form.Label> */}
                        <Form.Control as="select" onChange={(event) => setEvolutionSelected(event.target.value)}>
                            <option value="">::SELECIONE::</option>
                            {
                                evolutionsCombo.map((evolution, index) => {
                                    return <option value={evolution.pokemon_name_evolution} key={index}>{evolution.pokemon_name_evolution}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md="2">
                    <Form.Group>
                        <Button 
                            variant="primary"
                            onClick={() => addEvolution()}
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
                                <th>Evoluções Relacionados</th>
                                <th align="left">Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            (evolutions.length > 0) ?
                                (evolutions[evolutions.length - 1][0].name != pokemon.name) ?
                                    evolutions.map((evolution, index) => {
                                        if(evolution[0].name != pokemon.name){
                                            return (
                                                <tr key={index}>
                                                    <td>{evolution[0].name}</td>
                                                    <td>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => removeEvolution(evolution)}
                                                        >
                                                            Remover
                                                        </Button>  
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })
                                :  null
                            : null
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
}