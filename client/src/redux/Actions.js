import axios from 'axios';


// constantes de acciones para evitar errores de  escritura en el reducer

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_CREATE = 'FILTER_CREATE'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const ORDER_BY_ALPHABET = 'ORDER_BY_ALPHABET'
export const RESET = 'RESET'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const GET_GENRES = 'GET_GENRES'
export const POST_GAME = 'POST_GAME'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'



export function getVideogames (){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type:GET_VIDEOGAMES,
            payload:json.data// me manda todos los videojuegos al state 
        })
    }
}

export function filterVideogamesByGenre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterCreated (payload){
    return{
        type: FILTER_CREATE,
        payload
    }
}

export function orderByRating(payload){
    return{
        type:ORDER_BY_RATING,
        payload
    }
}

export function orderByalphabet(payload){
    return{
        type:ORDER_BY_ALPHABET,
        payload
    }
}

export function reset (){
    return{type:RESET}

}


export function searchByName(name) {
    return async function(dispatch) {      
        try {
          let json = await axios.get(`http://localhost:3001/videogames/name?name=${name}`);
  
          if (json.data.length === 0) {
            alert('No se encontraron juegos con el nombre ingresado');
          } else {
            dispatch({
              type: SEARCH_BY_NAME,
              payload: json.data
            });
          }
        } catch (error) {
          alert('Videogame not found');
 }
}
}
  
     


export function getGenres (){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/genres')
        return dispatch ({
            type:GET_GENRES, 
            payload:json.data
        })
    }
}

export function getPlatforms (){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/platforms')
        return dispatch ({
            type:GET_PLATFORMS, 
            payload:json.data
        })
    }
}


export function postVidegame(payload){
    return async function (dispatch){
        let json = await axios.post('http://localhost:3001/videogames', payload) // cuando quiero postear loq ue viene  como payload lo hago asi
        return dispatch({
            type: POST_GAME,
            payload: json
        })
    }
}

export function getVideogameById (id){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispatch({
            type: GET_VIDEOGAME_BY_ID,
            payload: json.data
        })
    }
}

export function clearDetail(){
    return {
        type: CLEAR_DETAIL,
    } 
}