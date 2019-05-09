import React, { Component, useState, useEffect } from 'react';
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from 'react-redux';

import api from '../services/api';
import { changeName } from "../actions/search";

class Home extends Component {
    state = {
        pokemons: [],
        isLoading: false
    }

    componentDidMount(){
        this.getPokemons();
    }

    getPokemons = async () => {
        this.setState({ isLoading: true });
        const response = await api.get('pokemons');
        
        this.setState({ pokemons: response.data.data, isLoading: false });
    }

    searchPokemon = async () => {
        const { name } = this.props;
        if(name.length > 0){
            this.setState({ isLoading: true });
            const response = await api.get(`getByName/${name}`);
            
            this.setState({ pokemons: response.data.data, isLoading: false });
        } else{
            this.getPokemons();
        }
    }

    removePokemon = async (id) => {
        const response = await api.delete(`pokemons/${id}`);

        if(response.status == 204){
            alert("Pokemon excluído com sucesso");
            this.getPokemons();
        }
    }

    render(){
        const { isLoading } = this.state;
        const { name, changeName } = this.props;
        return (
            <>
            <Row>  
                <Col md="10">
                    <Form.Group>
                        <Form.Control type="text" placeholder="Nome" value={name} onChange={(event) => changeName(event)} />
                    </Form.Group>
                </Col>
                <Col md="2">
                    <Form.Group>
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={!isLoading ? this.searchPokemon : null}
                    >
                        {isLoading ? 'Loading…' : 'Pesquisar'}
                    </Button>        
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {
                    this.state.pokemons.map((pokemons, index) => {
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
                                            onClick={() => this.removePokemon(pokemons.id)}
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
}

const mapStateToProps = (state) => {
    return (
        {
            name: state.search.name
        }
    )
}

export default connect(mapStateToProps, { changeName })(Home);
