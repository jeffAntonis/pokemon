import React from 'react';
import { ListGroup, Image, Container } from "react-bootstrap";
import ListTypes from './ListTypes';
import ListTypesAlter from './ListTypesAlter';

export default ({ types, pokemon, evolutions, change, setTypes, setEvolutions }) => {
    if(change){
        return (<ListAlter types={types} pokemon={pokemon} evolutions={evolutions} setTypes={setTypes} setEvolutions={setEvolutions} />);
    } else{
        return (<ListView types={types} pokemon={pokemon} evolutions={evolutions}  />);
    }
}

const ListView = ({ types, pokemon, evolutions }) => (
    <ListGroup className="list-group-flush">
        <ListTypes types={types} />
        
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
);

const ListAlter = ({ types, pokemon, evolutions, setTypes, setEvolutions }) => (
    <Container>
        <ListTypesAlter types={types} setTypes={setTypes} evolutions={evolutions} setEvolutions={setEvolutions} pokemon={pokemon} />
    </Container>
);