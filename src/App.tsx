import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import { useGetPokemonByIDQuery } from "./app/pokemonAPI";
import {
  setPokemonOne,
  setPokemonOneID,
  selectPokemonOneID,
} from "./features/pokemonOneSlice";
import {
  setPokemonTwo,
  setPokemonTwoID,
  selectPokemonTwoID,
} from "./features/pokemonTwoSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";

function App() {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState<boolean>(true);

  const pokemonOneID = useAppSelector(selectPokemonOneID);
  const pokemonTwoID = useAppSelector(selectPokemonTwoID);

  const navigate = useNavigate();

  const fetchPokemons = () => {
    const randomPokemonOne = Math.floor(Math.random() * 1154);
    let randomPokemonTwo = Math.floor(Math.random() * 1154);

    if (randomPokemonOne === randomPokemonTwo) {
      randomPokemonTwo++;
    }

    dispatch(setPokemonOneID(randomPokemonOne));
    dispatch(setPokemonTwoID(randomPokemonTwo));
    setSkip(false);
  };

  const {
    data: pokemonOne,
    error: pokemonOneError,
    isLoading: pokemonOneLoading,
  } = useGetPokemonByIDQuery(pokemonOneID, {
    skip,
  });
  const {
    data: pokemonTwo,
    error: pokemonTwoError,
    isLoading: pokemonTwoLoading,
  } = useGetPokemonByIDQuery(pokemonTwoID, {
    skip,
  });

  useEffect(() => {
    if (!pokemonTwo || !pokemonOne) return;
    dispatch(setPokemonOne(pokemonOne));
    dispatch(setPokemonTwo(pokemonTwo));
    navigate("/game");
  }, [pokemonOne, pokemonTwo]);

  useEffect(() => {
    if (pokemonOneError && pokemonTwoError) {
      fetchPokemons();
    } else {
      if (pokemonOneError) {
        let randomPokemonOne = Math.floor(Math.random() * 1154);
        if (randomPokemonOne === pokemonTwo.id) {
          randomPokemonOne++;
        }
        dispatch(setPokemonOneID(randomPokemonOne));
      }
      if (pokemonTwoError) {
        let randomPokemonTwo = Math.floor(Math.random() * 1154);
        if (randomPokemonTwo === pokemonOne.id) {
          randomPokemonTwo++;
        }
        dispatch(setPokemonTwoID(randomPokemonTwo));
      }
    }
  }, [pokemonOneError, pokemonTwoError]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home fetchPokemons={fetchPokemons} />} />
        <Route path="/game" element={<Game fetchPokemons={fetchPokemons} />} />
      </Routes>
    </>
  );
}

export default App;
