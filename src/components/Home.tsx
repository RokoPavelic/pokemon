import { useEffect, useState } from "react";
import Button from "./Button";
import Kodimon from "../assets/kodimon 1.png";
import kodiLogo from "../assets/Kodi-logo.svg";
import styled from "styled-components";
import { useGetPokemonByIDQuery } from "../app/pokemonAPI";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { setPokemonOne } from "../features/pokemonOneSlice";
import { setPokemonTwo } from "../features/pokemonTwoSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState<boolean>(true);
  const [pokemonOneID, setPokmonOneID] = useState<string>("");
  const [pokemonTwoID, setPokmonTwoID] = useState<string>("");

  const navigate = useNavigate();

  const fetchPokemons = () => {
    const randomPokemonOne = Math.floor(Math.random() * 1154);
    let randomPokemonTwo = Math.floor(Math.random() * 1154);

    if (randomPokemonOne === randomPokemonTwo) {
      randomPokemonTwo++;
    }

    setPokmonOneID(randomPokemonOne.toString());
    setPokmonTwoID(randomPokemonTwo.toString());
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
  }, [pokemonTwoLoading, pokemonOneLoading]);

  useEffect(() => {
    if (pokemonOneError && pokemonTwoError) {
      fetchPokemons();
    } else {
      if (pokemonOneError) {
        let randomPokemonOne = Math.floor(Math.random() * 1154);
        if (randomPokemonOne === pokemonTwo.id) {
          randomPokemonOne++;
        }
        setPokmonOneID(randomPokemonOne.toString());
      }
      if (pokemonTwoError) {
        let randomPokemonTwo = Math.floor(Math.random() * 1154);
        if (randomPokemonTwo === pokemonOne.id) {
          randomPokemonTwo++;
        }
        setPokmonTwoID(randomPokemonTwo.toString());
      }
    }
  }, [pokemonOneError, pokemonTwoError]);

  return (
    <Start>
      <img src={kodiLogo} alt="logo" className="logo" />
      <img src={Kodimon} alt="kodimon" />
      <Button text="New Game" onClick={fetchPokemons} />
    </Start>
  );
};

export default Home;

const Start = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    z-index: 1;
  }

  .logo {
    position: relative;
    top: 140px;
    rotate: -30deg;
  }
`;
