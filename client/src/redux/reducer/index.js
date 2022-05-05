import { ALL_BREEDS, DETAIL_BREED, GET_BREED, GET_TEMPERAMENTS, NAME_AZ, NAME_ZA, TEMPERAMENT_FILTER, WEIGHT_MIN_MAX, WEIGHT_MAX_MIN, CREATE_BREED, GET_DB_BREEDS, GET_API_BREEDS, CLEAR_BREED_BY_NAME, CLEAR_BREED_DETAIL } from "../actions";

const initalState = {
    dogsBreeds: [],
    temperaments: [],
    breedDetail: {},
    breedByName: []
}

function nameSort(arr, prop) {
    let sorted = [];
    if(prop === 'name'){
        sorted = arr.sort((a, b) => {
            if(a[prop] < b[prop]) {return -1};
            if(a[prop] > b[prop]) {return 1};
            return 0
        })
    } else {
            sorted = arr.sort((a, b) => {
            if(a[prop][0] < b[prop][0]) {return -1};
            if(a[prop][0] > b[prop][0]) {return 1};
            return 0
        })
    }
    return sorted;
}

function rootReducer ( state = initalState, action){
    switch(action.type){
        case ALL_BREEDS:
            return {
                ...state,
                dogsBreeds: action.payload
            };
        case GET_BREED:
            return {
                ...state,
                breedByName: action.payload
            }
        case DETAIL_BREED:
            return {
                ...state,
                breedDetail: action.payload
            }
        case TEMPERAMENT_FILTER:
            let backUp = [...state.dogsBreeds];
            let onlyTemps = backUp.filter(d => d.temperaments?.toLowerCase().includes(action.payload));
            return {
                ...state, 
                breedByName: onlyTemps 
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case NAME_AZ:
            if(state.breedByName.length === 0) {
                let nameSorted = nameSort([...state.dogsBreeds], 'name')
                return {
                    ...state,
                    dogsBreeds: nameSorted
                }
            } else {
                let nameSorted = nameSort([...state.breedByName], 'name')
                return {
                    ...state,
                    breedByName: nameSorted
                }
            }
        case NAME_ZA:
            if(state.breedByName.length === 0) {
                let nameSorted = nameSort([...state.dogsBreeds], 'name').reverse()
                return {
                    ...state,
                    dogsBreeds: nameSorted
                }
            } else {
                let nameSorted = nameSort([...state.breedByName], 'name').reverse()
                return {
                    ...state,
                    breedByName: nameSorted
                }
            }
        case WEIGHT_MIN_MAX:
            if(state.breedByName.length === 0) {
                let nameSorted = nameSort([...state.dogsBreeds], 'weight')
                return {
                    ...state,
                    dogsBreeds: nameSorted
                }
            } else {
                let nameSorted = nameSort([...state.breedByName], 'weight')
                return {
                    ...state,
                    breedByName: nameSorted
                }
            }
        case WEIGHT_MAX_MIN:
            if(state.breedByName.length === 0) {
                let nameSorted = nameSort([...state.dogsBreeds], 'weight').reverse()
                return {
                    ...state,
                    dogsBreeds: nameSorted
                }
            } else {
                let nameSorted = nameSort([...state.breedByName], 'weight').reverse()
                return {
                    ...state,
                    breedByName: nameSorted
                }
            }
        case CREATE_BREED: {
            return {...state}
            }
        case GET_DB_BREEDS: {
            let resultDb = state.dogsBreeds.filter(d => d.id > 264);
            if(resultDb.length > 0)
                return{
                    ...state,
                     breedByName: resultDb
                }
            else {
                return {
                    ...state,
                    error: { msg: 'No breeds finded'}
                }
            }
        }
        case GET_API_BREEDS: {
            let resultApi = state.dogsBreeds.filter(d => d.id <= 264);
            if(resultApi.length > 0)
                return{
                    ...state,
                    breedByName: resultApi
                }
            else {
                return {
                    ...state,
                    error: { msg: 'No breeds finded'}
                }
            }
        }
        case CLEAR_BREED_BY_NAME: {
            return {
                ...state,
                breedByName: []
            }
        }
        case CLEAR_BREED_DETAIL: {
            return {
                ...state,
                breedDetail: {}
            }
        }
        default:
            return state
            }
}

export default rootReducer;