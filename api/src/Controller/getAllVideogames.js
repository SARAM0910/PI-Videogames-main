const axios = require("axios");
require('dotenv').config();
const { Videogame, Genre, Platform } = require("../db");
const { YOUR_API_KEY } = process.env;

const getVideogamesApi = async () => {
  try {
    const apiUrl = await axios.get(// saco los vidojuegos de la API
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
      // `https://api.rawg.io/api/games?page=1&page_size=40&key=${YOUR_API_KEY}`
    );
    const infoApiVideogame = apiUrl.data.results;
    const apiInfo = infoApiVideogame.map(el => {
      return {
        id: el.id,
        name: el.name,
        description: el.description,
        platform: el.platforms.map(el => el.platform.name),
        image: el.background_image,
        released: el.released_at,
        rating: el.rating,
        genre: el.genres.map(el => el.name),
        createInDb: false,
      };
    });
    return apiInfo;
  } catch (error) {
    console.error("Error al obtener los videojuegos de la API:", error.message);
    return []; // Devuelve un arreglo vacío en caso de error
  }
};


const getVideoGameDb = async () => {// saco los video juegos de la base de datos
  try {
    return await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Platform,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ] 
    });
  } catch (error) {
    console.error("Error al obtener los videojuegos de la base de datos:", error.message);
    return []; // Devuelve un arreglo vacío en caso de error
  }
};

const getAllVideogames = async (req,res) => { // hago un solo conjunto  de juegos y envio la respuesta 
  try {
    const apiIn = await getVideogamesApi();
    const bdIn = await getVideoGameDb();
    const allVid = apiIn.concat(bdIn);
    res.json(allVid)
  } catch (error) {
    console.error("Error al obtener todos los videojuegos:", error.message);
    res.status(500).json({error:'Error al obtener todos los videojuegos'})
  }
};

module.exports = {
  getVideogamesApi,
  getVideoGameDb,
  getAllVideogames,
};




