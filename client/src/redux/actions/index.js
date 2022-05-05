import axios from 'axios';
export const ALL_BREEDS = 'ALL_BREEDS';
export const DETAIL_BREED = 'DETAIL_BREED';
export const GET_BREED = 'GET_BREED';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const TEMPERAMENT_FILTER = 'TEMPERAMENT_FILTER';
export const BREED_FILTER = 'BREED_FILTER';
export const CREATE_BREED = 'CREATE_BREED';
export const NAME_AZ = 'NAME_AZ';
export const NAME_ZA = 'NAME_ZA';
export const WEIGHT_MIN_MAX = 'WEIGHT_MIN_MAX';
export const WEIGHT_MAX_MIN = 'WEIGHT_MAX_MIN';
export const GET_DB_BREEDS = 'GET_DB_BREEDS';
export const GET_API_BREEDS = 'GET_API_BREEDS';
export const CLEAR_BREED_BY_NAME = 'CLEAR_BREED_BY_NAME';
export const CLEAR_BREED_DETAIL = 'CLEAR_BREED_DETAIL';

export function breeds() {
    return function(dispatch) {
        axios.get('http://localhost:3001/dogs')
        .then(res => {
            const response = res.data;
            dispatch({type: ALL_BREEDS, payload: response})
        })
        .catch(e => {
            console.log('Error', e);
        })
    }
}

export function detailBreed(id) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/dogs/${id}`)
        .then(res => {
            const response = res.data;
            dispatch({type: DETAIL_BREED, payload: response})
        })
        .catch(e => {
            console.log('Error', e)
        })
    }
}

export function getBreed(name) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/dogs?name=${name}`)
        .then(res => {
            const response = res.data;
            dispatch({type: GET_BREED, payload: response})
            console.log(response)
        })
        .catch(e => {
            console.log('Error', e)
        })
    }
}

export function getTemperaments() {
    return function(dispatch) {
        axios.get('http://localhost:3001/temperament')
        .then(res => {
            const response = res.data;
            dispatch({type:GET_TEMPERAMENTS, payload: response})
        })
        .catch(e => {
            console.log('Error', e)
        })
    }
}

export function temperamentFilter(temperament) {
    return { type: TEMPERAMENT_FILTER, 
             payload: temperament
            }
}
export function sortAZ() {
    return { type: NAME_AZ }
}

export function sortZA() {
    return { type: NAME_ZA }
}
export function sortLighter() {
    return { type: WEIGHT_MIN_MAX }
}
export function sortHeavier() {
    return { type: WEIGHT_MAX_MIN}
}

export function createBreed(pupie) {
    return function (dispatch) {
        let dogBreed = {
            name: pupie.name,
            height: `${pupie.hMin} - ${pupie.hMax}`,
            weight: `${pupie.wMin} - ${pupie.wMax}`,
            life_span: `${pupie.l_sMin} - ${pupie.l_sMax}`,
            image: pupie.image,
            temperaments: pupie.temperaments.map(t => parseInt(t.id))
        }
        if(!dogBreed.name){
            return alert('You must to input a name')
        } else {
            axios.post(`http://localhost:3001/dog`, dogBreed)
                .then(res => {
                    const response = res.data;
                    dispatch({
                        type: CREATE_BREED,
                        payload: response
                    })
                })
                return alert('The breed has succesfully created')
        }
    }

}

export function getDbBreeds(){
    return {
        type: GET_DB_BREEDS
    }
}

export function getApiBreeds() {
    return {
        type: GET_API_BREEDS
    }
}

export function clearBreedByName() {
    return { type: CLEAR_BREED_BY_NAME}
}

export function clearBreedDetail() {
    return { type: CLEAR_BREED_DETAIL}
}



