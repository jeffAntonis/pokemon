import React, { useState, useEffect } from 'react';
import { Card, Col, Row, ListGroup, Image } from "react-bootstrap";

import api from '../services/api';

const Information = ({ match }) => {
    const [pokemon, setPokemon] = useState([]);
    const [types, setTypes] = useState([]);
    const [evolutions, setEvolutions] = useState([]);
    // const [evolutionsPokers, setEvolutionsPokers] = useState([]);

    // const teste = () => {
    //     const aux = [];
    //     console.log('iae');
    //     evolutions.map((evolution, index) => {
    //         console.log(evolution);
    //         aux.push(getEvolutionsPokers(evolution.pokemon_name_evolution));
    //     });

    //     setEvolutionsPokers(aux);
    // }

    // const getEvolutionsPokers = async (name) => {
    //     const response = await api.get(`getByName/${name}`);
    //     // setEvolutionsPokers(response.data.data);
    //     return response.data.data;
    // }

    useEffect(() => {
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
                        <Card.Img variant="top" src={pokemon.url_photo} style={{ width: "200px", height: "200px" }} />
                        <Card.Body>
                            <Card.Title><a href={"/" + pokemon.id}>{pokemon.name}</a></Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item style={{ fontSize: 20, fontWeight: 'bold' }}>Tipo(s):</ListGroup.Item>
                            {
                                types.map((type, index) => {
                                    return <ListGroup.Item key={index}>{type.ds_type}</ListGroup.Item>
                                })
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
