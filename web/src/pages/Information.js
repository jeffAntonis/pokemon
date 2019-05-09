import React, { useState, useEffect } from 'react';
import { Card, Col, Row, ListGroup, Image, Button, Form } from "react-bootstrap";

import api from '../services/api';
import ListDataPokemon from '../components/ListDataPokemon';

const Information = ({ match }) => {
    
    const [name, setName] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [change, setChange] = useState(false);
    const [types, setTypes] = useState([]);
    const [evolutions, setEvolutions] = useState([]);

    const updatePokemon = async () => {
        const response = await api.put(`pokemons/${pokemon.id}`, {
            name
        });

        if(response){
            const response = await api.post(`pokemon_types/alterTypes/${pokemon.id}`, {
                types
            });

            if(response){
                setChange(false);
                getInformation(match.params.id);
                getType(match.params.id);
                getEvolutions(match.params.id);
            }            
        }
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
                                onClick={() => { 
                                    if(change){
                                        getType(match.params.id);
                                    }
                                    setChange(!change); 
                                    setName(pokemon.name);
                                }}
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
                        <ListDataPokemon types={types} pokemon={pokemon} evolutions={evolutions} change={change} setTypes={setTypes} />
                    </Card>
                </Col>                            
            }
        </Row>
        </>
    )
}

export default Information;
