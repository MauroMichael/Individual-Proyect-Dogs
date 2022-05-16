import React from 'react';
import { Link } from 'react-router-dom';
import './Breed.css'



export default function Breed ({id, name, image, temperaments, weight}){


      return (
        <div className = 'breed-container' key={id}>
            <div className = 'breed-name'>
                {id === undefined ? <h2>The Breed Does Not Exist.</h2> :
                <Link className = 'breed-link' to = {`/dogs/${id}`}>
                    <h4 className = 'breed-title'> {name} </h4>
                </Link>   
                }
            </div>
            <div className = 'breed-img-data'>
                <div className = 'breed-img'>
                    <img src = {image} alt = 'Not aviable'/>                        
                </div>
                <div className = 'breed-data'>
                    {temperaments === 'empty00' ? <h3>Keep trying!</h3>:
                    <p className = 'breed-temps'><span className = 'breed-temp'>Temperaments:</span><br/>{temperaments} </p>
                                    }
                    {weight === 'empty00' ? null:                
                    <p className = 'breed-weights'><span className = 'breed-weight'>Weight:</span><br/> {weight[0]} - {weight[1]} kg</p>
                    }
                </div>
            </div>
        </div>
    )
}