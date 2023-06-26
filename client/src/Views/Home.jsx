import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getVideogames,
  filterVideogamesByGenre,
  filterCreated,
  orderByRating,
  orderByalphabet,
  reset,
} from "../redux/Actions";
import Card from "../Components/CardGame";
import Nav from "../Components/Nav";
import Paginado from "../Components/Paginado";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videoGames); // me estoy trayendo todo lo que este en el state en el array de videogames
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    dispatch(getVideogames());
    fetchGenres();
  }, [dispatch]);

  // aqui llamo los generos de la ruta de generos que los crea en la base de datos
  const fetchGenres = async () => {
    const response = await axios.get("http://localhost:3001/genres");
    setGenres(response.data);
  };

  // paginado  la logica viene del componente
  const [currentPage, setCurrentPage] = useState(1); // este cominza en uno por que siempre comiezo en la pagina 1 esta es mi pagina de inicio
  // eslint-disable-next-line
  const [videogamesPerPage, setVideogamesPerPage] = useState(15); // este state indica 15 juegos por pagina
  const indexLasteGame = currentPage * videogamesPerPage; // 15
  const indexFirstGame = indexLasteGame - videogamesPerPage; //0
  let currentGame;
  if (allVideogames.length > 0) {
    currentGame = allVideogames.slice(indexFirstGame, indexLasteGame);
  } else {
    currentGame = [];
  }

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleFilterByGenre(e) {
    dispatch(filterVideogamesByGenre(e.target.value));
  }

  function handleCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleOrder(e) {
    dispatch(orderByRating(e.target.value));
  }

  function handleAlphabetOrder(e) {
    dispatch(orderByalphabet(e.target.value));
  }

  function handleReset() {
    dispatch(reset());
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className={style.titleContainer}>
        <h1>VIDEOGAMES</h1>
      </div>
      <div className={style.filtercontainer}>
        <div className={style.filtercontainer}>
        <h2 className={style.origintitle}>Origin</h2> {/* aqui esta el filtro por base de datos*/}
          <select  onChange={handleCreated}>
            {" "}
            <option value="All">All</option>
            <option value="False">Api</option>
            <option value="True">Database</option>
          </select>
        </div>

        <div className={style.filtercontainer}>
        <h2 className={style.origintitle}>Rating</h2> {/* filtro de rating */}
        <select  onChange={handleOrder}>
          {" "}
          <option value="Descendente">Mayor</option>
          <option value="Ascendente">Minor</option>
        </select>
        </div>

        <div className={style.filtercontainer}>
        <h2 className={style.origintitle}>Genre</h2> {/* aqui el filtro por genero */}
        <select  onChange={handleFilterByGenre}>
          {" "}
          <option value="All">All Genres</option>
          {genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            );
          })}
        </select>
        </div>

        <div className={style.filtercontainer}>
        <h2 className={style.origintitle}>Alphabet</h2>  {/* filtro alfabetico */}
        <select  onChange={handleAlphabetOrder}>
          {" "}
          <option value="All">...</option>
          <option value="AscendenteAlp">A-Z</option>
          <option value="Descendentealp">Z-A</option>
        </select>
        </div>
        <div className={style.filtercontainer}>
        <h2 className={style.origintitle}>Rating</h2>
                <select className= {style.select} onChange={handleOrder}> {/* filtro de rating */}
                <option value="Descendente">Mayor</option>
                <option value="Ascendente">Minor</option>
            </select>
        </div>
        <div className={style.filtercontainer}>
          <button className={style.resetButton}onClick={handleReset}>Reset</button>
        </div>
      </div>

     <div className={style.cardsList}>
        {currentGame?.map((el) => {
          // me traiego las propiedades del estado global y se las paso al componete Card y renderizo las tarjetas.
          return (
            <Card
              key={el.id}
              name={el.name}
              image={el.image}
              genre={el.genre}
              genres={el.genres}
              id={el.id}
            />
          );
        })}
      </div>
      <Paginado
        videogamePerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />
    </div>
  );
}
