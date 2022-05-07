import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearBreedDetail, detailBreed } from '../redux/actions';
import './DetailBreed.css';



export default function DetailBreed() {
    const detail = useSelector(state => state.breedDetail)
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(detailBreed(id))
        return dispatch(clearBreedDetail())
    },[dispatch, id])
   
    return(
        <div className = 'detail_container'>
            {
             <div className = 'detail-breed'>
                <img className = 'detail-img' src = {detail.image} alt = 'dog not ready'/>
                <h4 className = 'detail-name'>{detail.name}</h4>
                <p>Weight: {detail.weight?.join(' - ')} kg</p>
                <p>Height: {detail.height} cm</p>
                <p>Life Span: {detail.life_span}</p>
                <p>Temperaments: {detail.temperaments}</p>
                            
                <Link to = '/dogs'>
                    <button className = 'detail-button'>Back</button>
                </Link>
            </div>
            }
        </div>
    )
}