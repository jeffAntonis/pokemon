import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Image, Table, Button } from "react-bootstrap";
import api from '../services/api';

const Create = () => {
    const [name, setName] = useState('');
    const [urlPhoto, setUrlPhoto] = useState('');
    const [typesCombo, setTypesCombo] = useState([]);
    const [evolutionsCombo, setEvolutionsCombo] = useState([]);
    const [typeSelected, setTypeSelected] = useState('');
    const [typesSelected, setTypesSelected] = useState([]);
    const [listTypes, setListTypes] = useState([]);
    const [listEvolutions, setListEvolutions] = useState([]);
    const [evolutionSelected, setEvolutionSelected] = useState('');
    const [evolutionsSelected, setEvolutionsSelected] = useState([]);

    const createPokemon = async () => {
        const response = await api.post(`pokemons`, {
            name, 
            url_photo: urlPhoto
        });            

        console.log(response);
        if(response.data.status == "SUCCESS"){
            let id = response.data.data.id;

            typesSelected.map((type) => {
                if(type != ""){
                    insertTypesPokemon(type, id);
                }
            });

            evolutionsSelected.map((evolution) => {
                if(evolution != ""){
                    insertEvolutionsPokemon(evolution, id);
                }
            });

            alert("Pokemon criado com sucesso");
            setName('');
            setUrlPhoto('');
            setTypeSelected('');
            setTypesSelected([]);
            setListTypes([]);
            renderListTypes();

        } else{
            alert("Erro ao criar Pokemon");
        }
    }

    const insertTypesPokemon = async (type, id) => {
        await api.post(`/pokemon_types`, {
            ds_type: type, 
            pokemon_id: id
        });            
    }

    const insertEvolutionsPokemon = async (evolution, id) => {
        await api.post(`/pokemon_evolutions`, {
            pokemon_name_evolution: evolution, 
            pokemon_id: id
        });            
    }

    const addType = () => {
        let aux = typesSelected;
        let exist = false;

        aux.map((type, index) => {
            if(type === typeSelected){
                exist = true;
                return;
            }
        });

        if(!exist){
            aux.push(typeSelected);
            setTypesSelected(aux);
        }        
        
        renderListTypes();
    }

    const addEvolution = () => {
        let aux = evolutionsSelected;
        let exist = false;

        aux.map((evolution, index) => {
            if(evolution === evolutionSelected){
                exist = true;
                return;
            }
        });

        if(!exist){
            aux.push(evolutionSelected);
            setEvolutionsSelected(aux);
        }        
        
        renderListEvolutions();
    }

    const removeEvolution = (evolutionRemove) => {
        let aux = evolutionsSelected;

        aux.map((evolution, index) => {
            if(evolution === evolutionRemove){
                aux.splice(index, 1); 
            }
        });

        setEvolutionsSelected(aux);

        renderListEvolutions();
    }

    const renderListEvolutions = () => {
        let list = []

        if(evolutionsSelected.length > 0){
            list = evolutionsSelected.map((evolution, index) => {
                return (
                    <tr key={index}>
                        <td>{evolution}</td>
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
            });
        } 

        setListEvolutions(list);
    }

    const removeType = (typeRemove) => {
        let aux = typesSelected;

        aux.map((type, index) => {
            if(type === typeRemove){
                aux.splice(index, 1); 
            }
        });

        setTypesSelected(aux);

        renderListTypes();
    }

    const renderListTypes = () => {
        let list = []

        if(typesSelected.length > 0){
            list = typesSelected.map((type, index) => {
                return (
                    <tr key={index}>
                        <td>{type}</td>
                        <td>
                        <Button
                                variant="danger"
                                onClick={() => removeType(type)}
                            >
                                Remover
                            </Button>  
                        </td>
                    </tr>
                );
            });
        } 

        setListTypes(list);
    }

    useEffect(() => {

        const getTypesCombo = async () => {
            const response = await api.get(`getTypesCombo`);
            
            setTypesCombo(response.data.data);

        }

        const getEvolutionsCombo = async () => {
            const response = await api.get(`getEvolutionsCombo`);
            
            setEvolutionsCombo(response.data.data);

        }

        getTypesCombo();
        getEvolutionsCombo();
    }, []);


    return (
        <>
            <Row>
                <Col md="12">
                    <h4>Cadastrar Pokemon</h4>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md="12">
                    <Form.Group>
                        <Form.Control type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md="6">
                    <Form.Group>
                        <Form.Control type="text" placeholder="Url Foto" value={urlPhoto} onChange={(event) => setUrlPhoto(event.target.value)} />
                    </Form.Group>
                </Col>
                <Col md="6">
                    <Form.Group>
                        <Image src={urlPhoto} rounded style={{ width: "100", height: "100" }} alt="Preview" />
                    </Form.Group>
                </Col>
            </Row>
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
                            {listTypes}   
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
                            {listEvolutions}   
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col md="12">
                    <Form.Group align="right">
                        <Button
                            variant="primary"
                            onClick={() => createPokemon()}
                        >
                            Confirmar
                        </Button>        
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
};

export default Create;
