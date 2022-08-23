import { FC } from "react";
import { PokeAPI } from "pokeapi-types";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";

type GameProps = {
  pokemonOne: PokeAPI.Pokemon | undefined;
  pokemonTwo: PokeAPI.Pokemon | undefined;
};

const Game: FC<GameProps> = ({ pokemonOne, pokemonTwo }) => {
  return (
    <PokemonCardContainer>
      <PokemonCard pokemon={pokemonOne} />
      
      <PokemonCard pokemon={pokemonTwo} />
    </PokemonCardContainer>
  );
};

export default Game;

const PokemonCardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
