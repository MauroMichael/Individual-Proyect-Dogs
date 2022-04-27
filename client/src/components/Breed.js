import React from 'react';
import { Link } from 'react-router-dom';
import { detailBreed } from '../redux/actions/index.js';
import { useDispatch } from 'react-redux';
import './Breed.css'

export default function Breed ({id, name, image, temperaments, weight}){
    const dispatch = useDispatch();

    const detailDispatch = e => {
        dispatch(detailBreed(id))
    };

    return (
        <div key={id}>
            <div className = 'breedImg'>
                <img src = {image} alt = 'Not aviable'/>                        
            </div>
            <div>
                <Link to = {`/dogs/${id}`}>
                    <h4 onClick = {detailDispatch}> {name} </h4>
                </Link>
                <p>Temperaments: {temperaments} </p>
                <p>Weight: {weight} </p>
            </div>
        </div>
    )
}