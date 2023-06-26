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
  filteredVideoGames: [],
  genres:[],
  platforms:[],
  detail:{},
  filters: {
    genre: "All",
    create: "All",
    rating: "",
    alphabet: "",
  },
};

const rootReducer = (state = initialState, action) => {
  // a mi estado videoGames que esta vacio enun principio, manda todo lo que te envie la accion
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideoGames: action.payload,
        videoGames: action.payload,
        filteredVideoGames: action.payload,
      };

    case FILTER_BY_GENRE:
      let filteredByGenre = state.allVideoGames;

      if (action.payload !== "All") {
        filteredByGenre = state.filteredVideoGames.filter((el) => {
          const hasGenre =
            el.genres?.some((genre) => genre.name === action.payload) ||
            (el.genre && el.genre.includes(action.payload));

          return hasGenre;
        });
      }

      return {
        ...state,
        videoGames: filteredByGenre,
        filteredVideoGames: filteredByGenre,
        filters: {
          ...state.filters,
          genre: action.payload,
        },
      };


    case FILTER_CREATE:
      let filteredByCreation = state.allVideoGames;
      
      if (action.payload !== "All") {
        if (action.payload === "True") {
          filteredByCreation = state.filteredVideoGames.filter((el) => el.createInDb);
        } else if (action.payload === "False") {
          filteredByCreation = state.filteredVideoGames.filter((el) => !el.createInDb);
        }
      }

      return {
        ...state,
        videoGames: filteredByCreation,
        filteredVideoGames: filteredByCreation,
        filters: {
          ...state.filters,
          create: action.payload,
        },
      };

    case ORDER_BY_RATING:
      let orderedByRating = state.filteredVideoGames.slice();
      
      if (action.payload === "Ascendente") {
        orderedByRating.sort((a, b) => a.rating - b.rating);
      } else if (action.payload === "Descendente") {
        orderedByRating.sort((a, b) => b.rating - a.rating);
      }

      return {
        ...state,
        videoGames: orderedByRating,
        filters: {
          ...state.filters,
          rating: action.payload,
        },
      };
    case ORDER_BY_ALPHABET: 
    let orderedByAlphabet = state.filteredVideoGames.slice();

    if (action.payload === "AscendenteAlp") {
      orderedByAlphabet.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (action.payload === "DescendenteAlp") {
      orderedByAlphabet.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    }
    
    return {
      ...state,
      videoGames: orderedByAlphabet,
      filters: {
        ...state.filters,
        alphabet: action.payload,
      },
    };
      
     
      case RESET:
        return {
          ...state,
          videoGames: state.allVideoGames,
          filteredVideoGames: state.allVideoGames,
        };
        
        case SEARCH_BY_NAME:
          const searchResult = action.payload;

  // Verifica si no hay filtros aplicados actualmente
  if (
    state.filters.genre === "All" &&
    state.filters.create === "All" &&
    state.filters.rating === "" &&
    state.filters.alphabet === ""
  ) {
    // Actualiza tanto los videojuegos filtrados como los videojuegos totales
    return {
      ...state,
      videoGames: searchResult,
      filteredVideoGames: searchResult,
    };
  }

  // Aplica la búsqueda a todos los videojuegos
  const filteredByName = state.allVideoGames.filter((game) =>
    game.name.toLowerCase().includes(searchResult.toLowerCase())
  );

  return {
    ...state,
    videoGames: filteredByName,
    filteredVideoGames: filteredByName,
  };
    
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
