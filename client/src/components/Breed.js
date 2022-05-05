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
        <div className = 'breed-container' key={id}>
            <div className = 'breed-name'>
                {id === undefined ? 'The Breed Does Not Exist. ' :
                <Link className = 'breed-link' to = {`/dogs/${id}`}>
                    <h4 className = 'breed-title' onClick = {detailDispatch}> {name} </h4>
                </Link>   
                }
            </div>
            <div className = 'breed-img-data'>
                <div className = 'breed-img'>
                    <img src = {image} alt = 'Not aviable'/>                        
                </div>
                <div className = 'breed-data'>
                    {temperaments === 'empty00' ? ' Keep trying!':
                    <p className = 'breed-temps'><span className = 'breed-temp'>Temperaments:</span><br/>{temperaments} </p>
                                    }
                    {weight === 'empty00' ? null:                
                    <p className = 'breed-weights'><span className = 'breed-weight'>Weight:</span><br/> {weight[0]} - {weight[1]} </p>
                    }
                </div>
            </div>
        </div>
    )
}