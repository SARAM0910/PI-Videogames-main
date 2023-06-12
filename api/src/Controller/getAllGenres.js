const axios = require("axios");
require('dotenv').config();
const {Genre} = require("../db");
const { YOUR_API_KEY } = process.env;

const getAllGenres = async (req, res) => {
    try {
        const apiUrlGenres = await axios.get (`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
        const genresApi = apiUrlGenres.data.results;
        const allGenres = genresApi.map (el => el.name);

        // console.log("All genres:", allGenres)
        for(let name of allGenres){
            await Genre.findOrCreate({
                where: {name:name}
            })
        }
        const genresIndB = await Genre.findAll();

        res.send(genresIndB)
        

    } catch (error) {
        res.status(500).json({ message: "Error retrieving genres" });
    }
}
  

module.exports = getAllGenres
