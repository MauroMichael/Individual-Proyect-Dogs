import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './DetailBreed.css';



export default function DetailBreed() {
    const detail = useSelector(state => state.breedDetail)
   
    return(
        <div className = 'detail_container'>
            {
            detail ? <div>
                        <img src = {detail.image} alt = 'dog not ready'/>
                        <h3>{detail.name}</h3>
                        <p>Weight: {detail.weight}</p>
                        <p>Height: {detail.height}</p>
                        <p>Life Span: {detail.life_span}</p>
                        <p>Temperaments: {detail.temperaments}</p>
                                    
                        <Link to = '/dogs'>
                            <button>Back</button>
                        </Link>
                    </div>
                    : <p>Loading Detail</p>

            }
        </div>
    )
}