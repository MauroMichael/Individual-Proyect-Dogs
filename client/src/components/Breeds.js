import React, { useEffect, useState } from 'react';
import Breed from './Breed';
import { breeds, getBreed, temperamentFilter, getTemperaments, sortAZ, sortZA, sortHeavier, sortLighter } from '../redux/actions/index.js'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Breeds.css'



export default function Breeds() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state);
    const currentBreeds = allDogs.breedByName.length === 0 ? allDogs.dogsBreeds : allDogs.breedByName;

    useEffect(() => {
        dispatch(breeds())
    }, [dispatch]);

    const temperaments = useSelector(state => state.temperaments)
    const finalTemp = e => {
        dispatch(temperamentFilter((e.target.value).toLowerCase()))
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    const [search, setSearch] = useState({name: ''});
    const changeHandler = e => {
        setSearch({name: e.target.value})
    }
    const submitHandler = e => {
        e.preventDefault();
        if(search.name && search.name.match(/^[a-zA-Z]+$/)) dispatch(getBreed(search.name));
        else alert('You must to input a name breed')
        setSearch({name: ''});
    }
    function handleSortBreed(e) {
        if((e.target.value) === 'up') return dispatch(sortAZ());
        if((e.target.value) === 'down') return dispatch(sortZA());
        return
    }
    function handleSortWeight(e) {
        if((e.target.value) === 'less') return dispatch(sortLighter());
        if((e.target.value) === 'more') return dispatch(sortHeavier());
        return
    }
  

    return(
        <div className = 'gral_container'>
            <div className = 'navBar'>
                <div>
                    <form onSubmit = {submitHandler}>
                        <input placeholder = 'Insert Breed' onChange = {changeHandler} value = {search.name}/>
                        <button type = 'submit'> Search Breed </button>
                    </form>
                <div>
                            <select onChange = {finalTemp}>
                                <option defaultValue>Temperament Filter</option>
                                {temperaments?.map(t => (
                                    <option key = {t.id} value = {t.temperaments}>{t.temperaments}</option>
                                ))}
                            </select>
                            </div>
                    <select onChange = {handleSortBreed}>
                        <option defaultValue = '' >Name Sort</option>
                        <option value = 'up'>A - Z Sort</option>
                        <option value = 'down'>Z - A Sort</option>
                    </select>
                    <select onChange = {handleSortWeight}>
                        <option defaultValue = '' >Weight Sort</option>
                        <option value = 'less'>Min - Max Sort</option>
                        <option value = 'more'>Max - Min Sort</option>
                    </select>
                    <Link to = '/dogs/createBreed'>
                        <button type = 'button'>Create New Breed</button>
                    </Link>
                </div>
            </div>
            <div className = 'breedsDogs'>
                {
                    currentBreeds?.map(b => (
                        <Breed
                            image = {b.image}
                            name = {b.name}
                            weight = {b.weight}
                            key = {b.id}
                            id = {b.id}
                            temperaments = {b.temperaments}
                        />
                    ))
                }
            </div>
        </div>
    )
}