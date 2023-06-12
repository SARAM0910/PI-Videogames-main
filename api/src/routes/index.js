const express = require('express');
// const { Router } = require('express');
const {getAllVideogames} = require('../Controller/getAllVideogames');
const getVideogameById = require('../Controller/getVideogameById')
const getAllGenres = require('../Controller/getAllGenres');
const getVideogameQuery = require('../Controller/getVideogamesQuery');
const postVideogame = require('../Controller/postNewVideogame');
const getAllPlatforms = require('../Controller/getAllPlatforms');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames',getAllVideogames);

router.get('/videogames/name',getVideogameQuery);  // mi url de consulta en insomnia para que funcione correctamente el controller es ejemplo http://localhost:3001/videogames/name?name=witcher  

router.get('/videogames/:id',getVideogameById);

router.get('/genres',getAllGenres);

router.get('/platforms',getAllPlatforms);

router.post('/videogames',postVideogame);




module.exports = router;
