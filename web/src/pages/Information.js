import React, { useState, useEffect } from 'react';
import { Card, Col, Row, ListGroup, Image, Button, Form } from "react-bootstrap";

import api from '../services/api';

const Information = ({ match }) => {
    
    const [name, setName] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [change, setChange] = useState(false);
    const [types, setTypes] = useState([]);
    const [evolutions, setEvolutions] = useState([]);
    const [listTypes, setListTypes] = useState([]);

    const updatePokemon = async () => {
        const response = await api.put(`pokemons/${pokemon.id}`, {
            name
        });

        if(response){
            setChange(false);
            getInformation(match.params.id);
            getType(match.params.id);
            getEvolutions(match.params.id);
        }
    }

    const renderListTypes = () => {
        let list = []
        console.log(types);

        if(change){
            list = types.map((type, index) => {
                return (
                    <tr key={index}>
                        <td>{type.ds_type}</td>
                        <td>
                        <Button
                                variant="danger"
                                onClick={() => {}}
                            >
                                Remover
                            </Button>  
                        </td>
                    </tr>
                );
            });
        } else {
            list = types.map((type, index) => {
                console.log(type);
                return (<ListGroup.Item key={index}>{type.ds_type}</ListGroup.Item>);
            })

            console.log(list);
        } 

        setListTypes(list);
    }

    const getInformation = async (id) => {
        const response = await api.get(`pokemons/${id}`);
        
        setPokemon(response.data.data);
    }

    const getType = async (id) => {
        const response = await api.get(`getTypes/${id}`);
        setTypes(response.data.data);
    }
    
    const getEvolutions = async (id) => {
        const response = await api.get(`getEvolutions/${id}`);
        setEvolutions(response.data.data);
    } 
    
    useEffect(() => {              
        
        getInformation(match.params.id);
        getType(match.params.id);
        getEvolutions(match.params.id);
        renderListTypes();
    }, []);

    return (
        <>
        <Row>
            {
                <Col md="12">               
                    <Card style={{ fontSize: '1em', overflow: 'hidden', padding: 0, marginBottom: 8, border: 'none', borderRadius: '.28571429rem', boxShadow: '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5' }} >
                        <Card.Header align="right">
                            <Button
                                variant="info"
                                onClick={() => { setChange(!change); setName(pokemon.name) }}
                            >
                                {change ? 'Cancelar' : 'Alterar'}
                            </Button>
                            {change ? 
                                <Button
                                    variant="success"
                                    onClick={() => { updatePokemon() }}
                                >
                                    Confirmar
                                </Button> : null}
                        </Card.Header>
                        <Card.Img variant="top" src={pokemon.url_photo} style={{ width: "200px", height: "200px" }} />
                        <Card.Body>
                            <Card.Title>
                                {
                                    change ?
                                    <Form.Control type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
                                    :
                                    <a href={"/" + pokemon.id}>{pokemon.name}</a>
                                }
                            </Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item style={{ fontSize: 20, fontWeight: 'bold' }}>Tipo(s):</ListGroup.Item>
                            {
                                types.map((type, index) => {
                                    return <ListGroup.Item key={index}>{type.ds_type}</ListGroup.Item>
                                })
                                // listTypes
                            }
                            
                            <ListGroup.Item style={{ fontSize: 20, fontWeight: 'bold' }}>Evoluções:</ListGroup.Item>
                            {   
                                (evolutions.length > 0) ?
                                    (evolutions[evolutions.length - 1][0].name != pokemon.name) ?
                                        evolutions.map((evolution, index) => {
                                            if(evolution[0].name != pokemon.name){
                                                return <ListGroup.Item key={index}>{evolution[0].name} <Image src={evolution[0].url_photo} /></ListGroup.Item>
                                            }
                                        })
                                    :  null
                                : null
                            }
                        </ListGroup>
                    </Card>
                </Col>                            
            }
        </Row>
        </>
    )
}

export default Information;
