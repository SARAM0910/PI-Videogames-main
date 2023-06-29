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
  GET_VIDEOGAME_BY_ID,
  CLEAR_DETAIL

} from "./Actions";

const initialState = {
  allVideoGames: [],
  videoGames: [],
  filteredVideoGames: [],
  genres: [],
  platforms: [],
  detail: {},
  filters: {
    genre: "All",
    create: "All",
    rating: "",
    alphabet: "",
  },
  // gameLoaded:false
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideoGames: action.payload,
        videoGames: action.payload,
        filteredVideoGames: action.payload,
        // gameLoaded:true
      };

      case FILTER_BY_GENRE:
        let filteredByGenre = state.allVideoGames;
      
        if (action.payload !== "All") {
          filteredByGenre = state.allVideoGames.filter((el) => {
            const hasGenre =
              el.genres?.some((genre) => genre.name === action.payload) || // some, me devuelve true si al menos un elemento cumple con la condición.
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
      const createFilter = action.payload;

      const filteredByCreation = state.allVideoGames.filter((game) => {
        const genreMatch =
          state.filters.genre === "All" ||
          game.genres?.some((genre) => genre.name === state.filters.genre) ||
          (game.genre && game.genre.includes(state.filters.genre));

        const createMatch =
          createFilter === "All" ||
          (createFilter === "True" && game.createInDb) ||
          (createFilter === "False" && !game.createInDb);

        return genreMatch && createMatch;
      });

      return {
        ...state,
        videoGames: filteredByCreation,
        filteredVideoGames: filteredByCreation,
        filters: {
          ...state.filters,
          create: createFilter,
        },
      };

    case ORDER_BY_RATING:
      const ratingFilter = action.payload;

      const orderedByRating = state.filteredVideoGames.slice().sort((a, b) => {
        if (ratingFilter === "Ascendente") {
          return a.rating - b.rating;
        } else if (ratingFilter === "Descendente") {
          return b.rating - a.rating;
        }

        return 0;
      });

      return {
        ...state,
        videoGames: orderedByRating,
        filters: {
          ...state.filters,
          rating: ratingFilter,
        },
      };

    case ORDER_BY_ALPHABET:
      const alphabetFilter = action.payload;

      const orderedByAlphabet = state.filteredVideoGames.slice().sort((a, b) => {
        if (alphabetFilter === "AscendenteAlp") {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else if (alphabetFilter === "DescendenteAlp") {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }

        return 0;
      });

      return {
        ...state,
        videoGames: orderedByAlphabet,
        filters: {
          ...state.filters,
          alphabet: alphabetFilter,
        },
      };

      case RESET:
        return {
          ...state,
          videoGames: state.allVideoGames,
          filteredVideoGames: state.allVideoGames,
          filters: {
            genre: "All",
            create: "All",
            rating: "",
            alphabet: "",
          },
        };

        case SEARCH_BY_NAME:
          const searchResult = action.payload;

    return {
      ...state,
      videoGames: searchResult,
      filteredVideoGames: searchResult,
    };
  
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case POST_GAME:
      return state;

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };

      case CLEAR_DETAIL:
            return {
                ...state,
                detail: []
            }

    default:
      return state;
  }
};

export default rootReducer;



