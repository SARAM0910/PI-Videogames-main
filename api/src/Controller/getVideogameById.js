require('dotenv').config();
const axios = require("axios");
const { getVideoGameDb } = require("./getAllVideogames");
const { YOUR_API_KEY } = process.env;

const getVideogameById = async (req,res) => {
  const { id } = req.params;

  try {
    const formatId = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; ///expresion regex para comprobar si hablamos de un ID API o un ID UUID de la base de datos, es pecifica para validar un UUID por que el formato es especifico.
    const formatIdTest = formatId.test(id);// revisa si el Id del parametro es o no UUDDI
    
    if (formatIdTest) {// si es true el test busca el id en la base de datos
      const dbGames = await getVideoGameDb();
      const dbGameById = dbGames.find((videogame) => videogame.id === id);
      if (dbGameById){
        return res.json(dbGameById)
      }else {
        return res.status(404).json({ message: "No game found with that ID in the database" });
      }
    }else {// su es false lo busca en la api 
      const apiUrlById = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
      );
      const apiGame = apiUrlById.data;
      const apiGameById = {
        id: apiGame.id,
        name: apiGame.name,
        description: apiGame.description,
        platform: apiGame.platforms.map(el => el.platform.name),
        image: apiGame.background_image,
        released: apiGame.released,
        rating: apiGame.rating,
        genre: apiGame.genres.map(el => el.name),
        createInDb: false,
      };
      return res.json(apiGameById);
    }      
  } catch (error) {
    return res.status(500).json({ message: 'No game found with that ID' });
  }
};


module.exports = getVideogameById;