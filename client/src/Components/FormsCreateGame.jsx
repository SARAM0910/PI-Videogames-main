import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVidegame, getPlatforms, getGenres } from "../redux/Actions";
import { Link,} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validationCreateForm } from "./ValidationsCreateForm";

export default function CreateForm() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const navigate = useNavigate() // con esto me redirecciono al donde lo necesito, aqui lo use para irme al home despues de crear el game

  const [errors,setErrors]= useState({
     name: "",
    description: "",
    image: "",
    released: "",
    rating: "",
    genre: [],
    platform: [],
  })

  const [input, setInnput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: "",
    genre: [],
    platform: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleChange (e){
    setInnput({
      ...input,
      [e.target.name]:e.target.value
    })

    setErrors(validationCreateForm({
      ...input,
      [e.target.name]:e.target.value
    }))
  }

  function handleSelectGenre (e){
    setInnput({
      ...input,
      genre : [...input.genre,e.target.value]
    })

    setErrors(validationCreateForm({
      ...input,
      genre : [...input.genre,e.target.value]
    }))
  }

  
  function handleSelectPlatform (e){
    setInnput({
      ...input,
      platform : [...input.platform,e.target.value]
    })

    setErrors(validationCreateForm({
      ...input,
      platform : [...input.platform,e.target.value]
    }))
  }

  // function Handlesubmit (e){
  //   e.preventDefault()
  //   dispatch(postVidegame(input))
  //   alert ('Game created')
  //   setInnput({
  //   name: "",
  //   description: "",
  //   image: "",
  //   released: "",
  //   rating: "",
  //   genre: [],
  //   platform: [],
  //   })
  //   navigate('/Home')

  // }
  function Handlesubmit(e) {
    e.preventDefault();
    
    const formErrors = validationCreateForm(input);
    setErrors(formErrors);
  
    // Verificar si existen errores
    if (Object.keys(formErrors).length === 0) {
      dispatch(postVidegame(input));
      alert('Game created');
      setInnput({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        genre: [],
        platform: [],
      });
      navigate('/Home');
    }
  }
  return (
      <div>
        <div>
          <Link to="/home">X</Link>
        </div>
        <h1>¡Crea tu Videojuego!</h1>
        <form action="newgame">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' onChange={handleChange} value={input.name} />
            <p>{errors.name}</p>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input type="text" name='description'onChange={handleChange} value={input.description} />
            <p>{errors.description}</p>
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input type="text" name='image'onChange={handleChange} value={input.image} />
            <p>{errors.image}</p>
          </div>
          <div>
          {/* Agrega el elemento img para mostrar la imagen */}
          {input.image && <img src={input.image} alt="Game" />}
        </div>
          <div>
            <label htmlFor="released">Released</label>
            <input type="text" placeholder='AAAA-MM-DD' name='released' onChange={handleChange} value={input.released} />
            <p>{errors.released}</p>
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input type="number" name='rating' onChange={handleChange} value={input.rating} />
            <p>{errors.rating}</p>
          </div>
          <div>
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            multiple
            value={input.genre}
            onChange={handleSelectGenre}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <div>
            Selected Genre(s): {input.genre.join(", ")}
          </div>
          <p>{errors.genre}</p>
          </div>
          <div>
          <label htmlFor="platform">Platforms:</label>
          <select
            name="platform"
            multiple
            value={input.platform}
            onChange={handleSelectPlatform}
          >
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
            </select>
            <div>
            Selected Platform(s): {input.platform.join(", ")}
          </div>
          <p>{errors.platform}</p>
          </div>
          <button onClick={Handlesubmit}>Create</button>
        </form>
      </div>
    );
  }