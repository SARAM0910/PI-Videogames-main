require('dotenv').config();
const axios = require("axios");
const { getVideoGameDb } = require("./getAllVideogames");
const { YOUR_API_KEY } = process.env;

const getVideogameQuery = async (req, res) => {
  const name = req.query.name;

  try {
    const namequery = name.toLowerCase();
    const apiUrl = await axios.get(
      `https://api.rawg.io/api/games?search=${namequery}&key=${YOUR_API_KEY}`
    );
      const apiResults = apiUrl.data.results
      const apiGameQuery = await apiResults.map(el => {//busco los juegos en la api
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
    
    const dbGames= await getVideoGameDb();
    const bdGameQuery =  dbGames.filter(videogame => videogame.name.toLowerCase().includes(namequery));//filtro los juegos en la base de datos

    const totalQueryGames= [...apiGameQuery,...bdGameQuery];// hago un solo array con lo de la api y lo de la base de datos

    if(totalQueryGames.length === 0){ // verifico si hay juegos
        return res.status(404).json({ message: "No games found with that name." });
    }

    res.json(totalQueryGames);
       

  } catch (error) {
    res.status(500).json({message:"Error when searching for video games."});
  }
};


module.exports= getVideogameQuery;
