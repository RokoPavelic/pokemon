import { FC } from "react";
import { PokeAPI } from "pokeapi-types";
import styled from "styled-components";
import Stats from "./Stats";

type PokemonCardProps = {
  pokemon: PokeAPI.Pokemon | undefined;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <CardContainer>
      <HealthBarContainer>
        <HealthValue>100%</HealthValue>
        <HealthBar></HealthBar>
      </HealthBarContainer>

      <p>{pokemon?.name}</p>
      <img src={pokemon?.sprites.front_shiny} alt="image" />
      <p>Stats:</p>
      <Stats stats={pokemon?.stats} />
    </CardContainer>
  );
};

export default PokemonCard;

const CardContainer = styled.div`
  width: 300px;
`;

const HealthBarContainer = styled.div`
  width: 100%;
`;

const HealthBar = styled.div`
  height: 10px;
  width: 100%;
  background-color: #62ff84;
  border: 2px solid #079325;
  border-radius: 6px;
`;

const HealthValue = styled.p`
  color: green;
`;
