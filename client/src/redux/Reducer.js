import {
  GET_VIDEOGAMES,
  FILTER_BY_GENRE,
  FILTER_CREATE,
  ORDER_BY_RATING,
  ORDER_BY_ALPHABET,
  RESET,
  SEARCH_BY_NAME,
  GET_GENRES,
  POST_GAME,
  GET_PLATFORMS,
  GET_VIDEOGAME_BY_ID
} from "./Actions";

const initialState = {
  allVideoGames: [],
  videoGames: [],
  genres:[],
  platforms:[],
  detail:{}
};

const rootReducer = (state = initialState, action) => {
  // a mi estado videoGames que esta vacio enun principio, manda todo lo que te envie la accion
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideoGames: action.payload,
        videoGames: action.payload,
      };
    case FILTER_BY_GENRE:
      if (action.payload === "All") {
        return {
          ...state,
          videoGames: state.allVideoGames, // Restablecer al estado inicial
        };
      }
      return {
        ...state,
        videoGames: state.allVideoGames.filter((el) =>
          el.genre.includes(action.payload)
        ),
      };

    case FILTER_CREATE:
      if (action.payload === "All") {
        return {
          ...state,
          videoGames: state.allVideoGames, // Restablecer al estado inicial
        };
      } else if (action.payload === "True") {
        return {
          ...state,
          videoGames: state.allVideoGames.filter((el) => el.createInDb),
        };
      } else if (action.payload === "False") {
        return {
          ...state,
          videoGames: state.allVideoGames.filter((el) => !el.createInDb),
        };
      }
      break;
    case ORDER_BY_RATING:
      let ordenados;
      if (state.videoGames.length > 0 && action.payload === "Ascendente") {
        ordenados = state.videoGames.sort((a, b) =>
          a.rating > b.rating ? 1 : -1
        );
      } else if (
        state.videoGames.length === 0 &&
        action.payload === "Ascendente"
      ) {
        ordenados = state.allVideoGames.sort((a, b) =>
          a.rating > b.rating ? 1 : -1
        );
      } else if (
        state.videoGames.length > 0 &&
        action.payload === "Descendente"
      ) {
        ordenados = state.videoGames.sort((a, b) =>
          a.rating > b.rating ? -1 : 1
        );
      } else if (
        state.videoGames.length === 0 &&
        action.payload === "Descendente"
      ) {
        ordenados = state.allVideoGames.sort((a, b) =>
          a.rating > b.rating ? -1 : 1
        );
      }
      return {
        ...state,
        allVideoGames: [...ordenados],
        videoGames: [...ordenados],
      };
    case ORDER_BY_ALPHABET: //para que este orden funcionare tuve que hacer copias de los estados, si no no renderiza
    let orderedGames;
    if (action.payload === "AscendenteAlp") {
      if (state.videoGames.length > 0) {
        orderedGames = state.videoGames.slice().sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      } else {
        orderedGames = state.allVideoGames.slice().sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      }
    } else if (action.payload === "Descendentealp") {
      if (state.videoGames.length > 0) {
        orderedGames = state.videoGames.slice().sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      } else {
        orderedGames = state.allVideoGames.slice().sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      }
    }
    return {
      ...state,
      videoGames: orderedGames,
    };
  
      case RESET:
        return{
          ...state,
          videoGames:state.allVideoGames
        }
        case SEARCH_BY_NAME:
          return{
            ...state,
            videoGames:action.payload
          }

          case POST_GAME:
            return{
              ...state
            }

            case GET_GENRES:
              return{
                ...state,
                genres:action.payload
              }

              case GET_PLATFORMS:
                return{
                  ...state,
                  platforms:action.payload
                }
              case GET_VIDEOGAME_BY_ID:
                return{
                  ...state,
                  detail:action.payload
                }

    default:
      return { ...state };
  }
};

export default rootReducer;
