import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBreed } from '../redux/actions';
import './CreateBreed.css';
import { getTemperaments } from '../redux/actions';
import { useNavigate } from 'react-router-dom';


export default function CreateBreed() {
    const temps = useSelector(state => state.temperaments);
    const initialBreed = {
        name: '',
        hMin: '',
        hMax: '',
        wMin: '',
        wMax: '',
        l_sMin: '',
        l_sMax: '',
        image: '',
        temperaments: []
    }
    const [breed, setBreed] = useState(initialBreed);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const remove = (e) => {
        e.preventDefault();
        setBreed({ ...breed, temperaments: breed.temperaments.filter(te => parseInt(te.id) !== parseInt(e.target.value)) })
      } 

    useEffect(() => {
        if(temps.length === 0) dispatch(getTemperaments())
    });

    function redirect() {
        navigate('/dogs/')
    }
 
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createBreed(breed));
        setBreed(initialBreed);
    };

       function handleInputChange(e) {
        let setting;
        let elem = e.target.name;
        if( elem === 'name'){
            if(/^[ a-zA-Z]+$/.test(e.target.value) !== true ){
                return alert ('It must to be only letters');
            }
        }
        if( elem === 'hMax' || elem ==='hMin' || elem === 'wMax' || elem === 'wMin' || elem === 'l_sMax' || elem === 'l_sMin'){
            if(/^[0-9]*$/.test(e.target.value) !== true ){
                return alert ('It must to be a number');
            }
        }
        if (elem === 'temperaments') {
            let temp = temps.find(t => t.id === Number(e.target.value));
            if (!breed.temperaments.includes(temp)) {
                setting = { temperaments: [...breed.temperaments, temp]};
            }
        }
        else {
            setting = { [e.target.name]: e.target.value }
        }
        setBreed({
            ...breed,
            ...setting
        })
    }



    return (
        <div className='divContainer'>
            <form className='containerForm' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name: </label>
                <input
                    type='text'
                    name='name'
                    value={breed.name}
                    onChange={handleInputChange}
                    placeholder='New breed name *'
                    
                />
                <br />
                <label htmlFor='image'>Image: </label>
                <input
                    type='text'
                    name='image'
                    value={breed.image}
                    onChange={handleInputChange}
                    placeholder='Url Image'
                />
                <br />
                <label htmlFor='height'>Height: </label>
                <input
                    type='text'
                    name='hMin'
                    value={breed.hMin}
                    onChange={handleInputChange}
                    placeholder='Min *'
                />
                <input
                    type='text'
                    name='hMax'
                    value={breed.hMax}
                    onChange={handleInputChange}
                    placeholder='Max *'
                />
                <br />
                <label htmlFor='weight'>Weight: </label>
                <input
                    type='text'
                    name='wMin'
                    value={breed.wMin}
                    onChange={handleInputChange}
                    placeholder='Min *'
                />
                <input
                    type='text'
                    name='wMax'
                    value={breed.wMax}
                    onChange={handleInputChange}
                    placeholder='Max *'
                />
                <br />
                <label htmlFor='life_span'>Life Span: </label>
                <input
                    type='text'
                    name='l_sMin'
                    value={breed.l_sMin}
                    onChange={handleInputChange}
                    placeholder='Min'
                />
                <input
                    type='text'
                    name='l_sMax'
                    value={breed.l_sMax}
                    onChange={handleInputChange}
                    placeholder='Max'
                />
                <br />
                <h3>Select Temperaments</h3>
                <select multiple name='temperaments' onChange={handleInputChange}>
                    {
                        temps.map(t => (
                            <option key={t.id} value={t.id}>{t.temperaments}</option>
                        ))
                    }
                </select>
                <div className = 'choice'> 
                    <h4>Temperaments Added</h4>
                    {breed.temperaments.map(t => (
                        <button onClick = {remove} key = {t.id} value = {t.id}>{t.temperaments} X </button>
                    ))}
                </div>
                <br />
                <button className = 'breed-submit' type='submit'>Create New Breed</button>
                <br/>
                <button className = 'form-back' type = 'button' onClick = {redirect}>Back To Home</button>
            </form>
        </div>
    )
}