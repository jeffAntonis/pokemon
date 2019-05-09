import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Form, Button } from "react-bootstrap";

import api from '../services/api';

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getPokemons = async () => {
        setIsLoading(true);
        const response = await api.get('pokemons');
        
        setPokemons(response.data.data);
        setIsLoading(false);
    }

    const searchPokemon = async () => {
        if(name.length > 0){
            setIsLoading(true);
            const response = await api.get(`getByName/${name}`);
            
            setPokemons(response.data.data);
            setIsLoading(false);
        } else{
            getPokemons();
        }
    }

    const removePokemon = async (id) => {
        const response = await api.delete(`pokemons/${id}`);

        console.log(response);
        if(response.status == 204){
            alert("Pokemon excluído com sucesso");
            getPokemons();
        }
    }

    useEffect(() => {
        getPokemons();
    }, []);

    return (
        <>
        <Row>  
            <Col md="10">
                <Form.Group>
                    <Form.Control type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
                </Form.Group>
            </Col>
            <Col md="2">
                <Form.Group>
                <Button
                    variant="primary"
                    disabled={isLoading}
                    onClick={!isLoading ? searchPokemon : null}
                >
                    {isLoading ? 'Loading…' : 'Pesquisar'}
                </Button>        
                </Form.Group>
            </Col>
        </Row>
        <Row>
            {
                pokemons.map((pokemons, index) => {
                    return (
                        <Col sm="6" md="4" lg="3" key={index}>               
                            <Card style={{ width: '15rem', fontSize: '1em', overflow: 'hidden', padding: 0, marginBottom: 8, border: 'none', borderRadius: '.28571429rem', boxShadow: '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5' }} >
                                <Card.Img variant="top" src={pokemons.url_photo} style={{ width: "100px", height: "100px" }} />
                                <Card.Body>
                                    <Card.Title><a href={"/" + pokemons.id}>{pokemons.name}</a></Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <Button
                                        variant="danger"
                                        onClick={() => removePokemon(pokemons.id)}
                                    >
                                        Remover
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>          
                    );
                })
            }
        </Row>
        </>
    )
}

export default Home;
