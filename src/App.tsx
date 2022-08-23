import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { PokeAPI } from "pokeapi-types";
import Button from "./components/Button";
import Game from "./components/Game";
import Home from "./components/Home";

function App() {
  const [pokemonOne, setPokemonOne] = useState<PokeAPI.Pokemon | undefined>();
  const [pokemonTwo, setPokemonTwo] = useState<PokeAPI.Pokemon | undefined>();

  const navigate = useNavigate();

  const fetchPokemons = () => {
    const randomPokemonOne = Math.floor(Math.random() * 1154);
    let randomPokemonTwo = Math.floor(Math.random() * 1154);

    if (randomPokemonOne === randomPokemonTwo) {
      randomPokemonTwo++;
    }

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonOne}`)
      .then((response) => {
        setPokemonOne(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonTwo}`)
      .then((response) => {
        setPokemonTwo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/game");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home fetchPokemons={fetchPokemons} />} />
        <Route
          path="/game"
          element={<Game pokemonOne={pokemonOne} pokemonTwo={pokemonTwo} />}
        />
      </Routes>
    </>
  );
}

export default App;
