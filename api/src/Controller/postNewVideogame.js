const {Videogame,Genre,Platform} = require("../db")

const postVideogame = async(req,res)=>{//recibo las propiedades del body
    let {
        id,
        name,
        image,
        platform,
        description,
        released,
        rating,
        genre,
        createInDb
    } = req.body;

    let VideogameCreated= await Videogame.create({
        id,
        name,
        image,
        platform,
        description,
        released,
        rating,
        createInDb
    });

    let genereCreated = await Genre.findAll({// como los genros ya estan creados, aqui busco los generos que coinciden con lo que recibo por body 
        where:{name: genre}
    });

    let platformCreated = await Platform.findAll({
        where:{name: platform}
    })

    VideogameCreated.addGenre(genereCreated);
    VideogameCreated.addPlatform(platformCreated);

    res.send('videogame created successfully')

}


module.exports = postVideogame