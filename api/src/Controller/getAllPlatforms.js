const axios = require("axios");
require('dotenv').config();
const {Platform} = require("../db");
const { YOUR_API_KEY } = process.env;

const getAllPlatforms = async (req, res) => {
    try {
        const apiUrlPlatforms = await axios.get (`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`);
        const platformsApi = apiUrlPlatforms.data.results;
        const allPlatforms = platformsApi.map (el => el.name);

        // console.log("All genres:", allGenres)
        for(let name of allPlatforms){
            await Platform.findOrCreate({
                where: {name:name}
            })
        }
        const platformIndB = await Platform.findAll();

        res.send(platformIndB)
        

    } catch (error) {
        res.status(500).json({ message: "Error retrieving genres" });
    }
}
  

module.exports = getAllPlatforms