import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBreed } from '../redux/actions';
import { Link } from 'react-router-dom';
import './CreateBreed.css';


export default function CreateBreed() {
    const temperaments = useSelector(state => state.temperaments);
    const [breed, setBreed] = useState({
        name: '',
        hMin: '',
        hMax: '',
        wMin: '',
        wMax: '',
        l_sMin: '',
        l_sMax: '',
        image: '',
        temperaments: []
    });

    const dispatch = useDispatch();

    function handleSubmit(){
    
    };

    function handleInputChange(){
        
    }




    return (
        <div className = 'divContainer'>
            <form className = 'containerForm' onSubmit = {handleSubmit}>
                <label htmlFor = 'name'>Name: </label>
                <input
                    type = 'text'
                    name = 'name'
                    value = {breed.name}
                    onChange = {handleInputChange}
                    placeholder = 'New breeds name'
                />
            </form>
        </div>
    )
}