import React, { useEffect, useState } from 'react';
import Breed from './Breed';
import { breeds, getBreed, temperamentFilter, getTemperaments, sortAZ, sortZA, sortHeavier, sortLighter, getApiBreeds, getDbBreeds, clearBreedByName } from '../redux/actions/index.js'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import './Breeds.css'
import henryDog from './dog.png';



export default function Breeds() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const indexLastDog = currentPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
   
    const currentBreeds = allDogs.breedByName.length === 0 ? allDogs.dogsBreeds?.slice(indexFirstDog, indexLastDog)
    : allDogs.breedByName?.slice(indexFirstDog, indexLastDog);

    useEffect(() => {
        dispatch(breeds());
        dispatch(getTemperaments());
    }, [dispatch]);

    const state = useSelector(state => state)
    const finalTemp = e => {
        dispatch(temperamentFilter((e.target.value).toLowerCase()))
    }

    const [search, setSearch] = useState({name: ''});
    const changeHandler = e => {
        setSearch({name: e.target.value})
    }
    const submitHandler = e => {
        e.preventDefault();
        if(!search.name) {
            alert('You must to input a name breed');
        }else if(!search.name.match(/^[ a-zA-Z]+$/)) {
            alert('You must to input only letters') 
            setSearch({name: ''});
        }
        else {
            dispatch(getBreed(search.name))
            setSearch({name: ''});
        }   
    }
    function handleSortBreed(e) {
        if((e.target.value) === 'up') return dispatch(sortAZ());
        if((e.target.value) === 'down') return dispatch(sortZA());
        if((e.target.value) === 'all') return dispatch(breeds())
        return
    }
    function handleSortWeight(e) {
        if((e.target.value) === 'less') return dispatch(sortLighter());
        if((e.target.value) === 'more') return dispatch(sortHeavier());
        if((e.target.value) === 'all') return dispatch(breeds())
        return
    }
    function handlePaginate(pageNumber) {
        setCurrentPage(pageNumber)
    }
    function handleDbApiBreeds(e){
        if((e.target.value) === 'api') return dispatch(getApiBreeds());
        if((e.target.value) === 'db') return dispatch(getDbBreeds());
    }
    function clear() {
        dispatch(clearBreedByName())
    }
    
    return(
        <div className = 'gral_container'>
            <div className = 'navBar'>
                <img src = {henryDog} onClick = {clear} className = 'doggie' alt = 'no aviable'/>

                <div className = 'selectors'>
                    <form className = 'form' onSubmit = {submitHandler}>
                        <input className = 'insert-breed' placeholder = 'Insert Breed' onChange = {changeHandler} value = {search.name}/>
                        <button className = 'search-submit' type = 'submit'> Search Breed </button>
                    </form>
                <div>
                    <select className = 'select-temp 'onChange = {finalTemp}>
                        <option defaultValue>Temperament Filter</option>
                        {state.temperaments?.map(t => (
                            <option key = {t.id} value = {t.temperaments}>{t.temperaments}</option>
                        ))}
                    </select>
                </div>
                    <select className = 'sort-name' onChange = {handleSortBreed}>
                        <option value  = 'all' >Name Sort</option>
                        <option value = 'up' >A - Z Sort</option>
                        <option value = 'down' >Z - A Sort</option>
                    </select>
                    <select className = 'sort-weight' onChange = {handleSortWeight}>
                        <option value = 'all' >Weight Sort</option>
                        <option value = 'less'>Min - Max Sort</option>
                        <option value = 'more'>Max - Min Sort</option>
                    </select>
                    <select className = 'db-api' onChange = {handleDbApiBreeds}>
                        <option defaultValue>Origin Filter Breeds</option>
                        <option value = 'db'>Created Breeds</option>
                        <option value = 'api'>Existed Breeds</option>
                    </select>

                    <Link to = '/dogs/createBreed'>
                        <button className = 'create'  type = 'button'>Create New Breed</button>
                    </Link>
                </div>
            </div>
            <div className = 'breeds-dogs-pagination'>
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
                <div className = 'pagination'>
                    <Pagination
                    dogsPerPage = {dogsPerPage}
                    totalDogs = {allDogs.breedByName.length === 0 ? allDogs.dogsBreeds.length : allDogs.breedByName.length}
                    paginate = {handlePaginate}
                    />                
                </div>
            </div>
        </div>
    )
}