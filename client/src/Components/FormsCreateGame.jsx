import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVidegame, getPlatforms, getGenres } from "../redux/Actions";
import { Link,} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validationCreateForm } from "./ValidationsCreateForm";
import style from "./Form.module.css"
import iconoClose from "../Assets/IconoClose.jpg"


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
      <div className={style.FormContainer}>
        <div>
          <Link to="/home">
          <img src={iconoClose} alt="close" width='35px' height='35px'/>
          </Link>
        </div>
        <h1 className={style.titleContainer}>¡Crea tu Videojuego!</h1>
        <form className={style.formulario}action="newgame">

          <div className={style.labelConatiner}>
            <label className={style.labelStyle} htmlFor="name">Name</label>
            <input className={style.inpuStileName}type="text" name='name' onChange={handleChange} value={input.name} />
          </div>
          <div><p className={style.errorStyleName}>{errors.name}</p></div>

          <div className={style.labelConatiner}>
            <label className={style.labelStyle} htmlFor="description">Description</label>
            <textarea className={style.inpuStileDescription}type="text" name='description'onChange={handleChange} value={input.description}/>
          </div>
          <div><p className={style.errorStyleDescription}>{errors.description}</p></div>

          <div className={style.labelConatiner}>
            <label className={style.labelStyle} htmlFor="image">Image</label>
            <input className={style.inpuStileImage} type="text" name='image'onChange={handleChange} value={input.image} />
          </div>
          <div><p className={style.errorStyleImage}>{errors.image}</p></div>
          <div className={style.labelConatiner}>
          {/* Agrega el elemento img para mostrar la imagen */}
          {input.image && <img src={input.image} alt="Game" />}
        </div>

          <div className={style.labelConatiner}>
            <label className={style.labelStyle} htmlFor="released">Released</label>
            <input className={style.inpuStileReleased}type="text" placeholder='YYYY-MM-DD' name='released' onChange={handleChange} value={input.released} />
          </div>
          <div> <p className={style.errorStyleReleased}>{errors.released}</p></div>

          <div className={style.labelConatiner}>
            <label className={style.labelStyle} htmlFor="rating">Rating</label>
            <input className={style.inpuStileRating} type="number" name='rating' onChange={handleChange} value={input.rating} />           
          </div>
          <div>
            </div>
            <div><p className={style.errorStyleRating}>{errors.rating}</p></div>


          <div >
          <label className={style.labelStyle} htmlFor="genre">Genre</label>
          <select className={style.selectGenre}
            name="genre"
            multiple
            value={input.genre}
            onChange={handleSelectGenre}
          >
            {genres.map((genre) => (
              <option  key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>

          <div className={style.arrayGenresStyle}>
           Selected Genre(s): {input.genre.join(", ")}
          </div>

          <p className={style.arrayError}>{errors.genre}</p>
          </div>

          <div>
          <label className={style.labelStyle} htmlFor="platform">Platforms:</label>
          <select className={style.selectPaltform}
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

            <div className={style.arrayGenresStyle}>
            Selected Platform(s): {input.platform.join(", ")}
          </div>

          <p className={style.arrayError}>{errors.platform}</p>
          </div>

          <button className={style.createButton} onClick={Handlesubmit}>Create</button>

        </form>
      </div>
    );
  }