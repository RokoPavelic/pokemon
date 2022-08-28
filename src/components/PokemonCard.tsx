import { FC, useState, useEffect } from "react";
import { PokeAPI } from "pokeapi-types";
import styled, { keyframes } from "styled-components";
import Stats from "./Stats";
import { selectLastLog } from "../features/logsSlice";
import { useAppSelector } from "../app/hooks";

type PokemonCardProps = {
  pokemon: PokeAPI.Pokemon | undefined;
  side: string;
  animate: boolean;
  direction: number;
  pokemonHealth: number;

  defendingPokemon: PokeAPI.Pokemon | undefined;
};

type MiniLogProps = {
  lastLog: string;
  side: string;
};

type ImgProps = {
  side: string;
  animate: boolean;
  direction: number;
};

type HealthBarProps = {
  health: number;
};

type HealthValueProps = {
  health: number;
};

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  side,
  animate,
  direction,
  pokemonHealth,
  defendingPokemon,
}) => {
  const [health, setHealth] = useState<number>(100);

  const lastLog = useAppSelector(selectLastLog);

  useEffect(() => {
    if (!pokemon) return;
    setHealth((pokemonHealth / pokemon?.stats[0].base_stat) * 100);
  }, [pokemonHealth]);

  return (
    <CardContainer>
      <HealthBarContainer>
        <HealthValue health={health}>{Math.floor(health)}%</HealthValue>
        <HealthBar health={health}>
          <div />
        </HealthBar>
      </HealthBarContainer>
      <p>{pokemon?.name}</p>
      <MiniLog side={side} lastLog={lastLog}>
        {defendingPokemon?.name !== pokemon?.name ? lastLog : ""}
      </MiniLog>

      {side === "left" ? (
        <ImgLeft
          src={pokemon?.sprites.front_shiny}
          alt="image"
          side={side}
          animate={animate}
          direction={direction}
        />
      ) : (
        <ImgRight
          src={pokemon?.sprites.front_shiny}
          alt="image"
          side={side}
          animate={animate}
          direction={direction}
        />
      )}
      <Stats stats={pokemon?.stats} />
    </CardContainer>
  );
};

export default PokemonCard;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

const HealthBarContainer = styled.div`
  width: 100%;
`;

const HealthBar = styled.div<HealthBarProps>`
  height: 10px;
  width: 100%;
  border: 2px solid
    ${(props) =>
      props.health > 50
        ? "#079325"
        : props.health <= 50 && props.health > 30
        ? "#FFCC00"
        : "red"};
  border-radius: 6px;

  div {
    height: 100%;
    width: ${(props) => props.health}%;
    background-color: ${(props) =>
      props.health > 50
        ? "#62FF84"
        : props.health <= 50 && props.health > 30
        ? "orange"
        : "#FF7575"};
    border-radius: 5px;
  }
`;

const HealthValue = styled.p<HealthValueProps>`
  margin-bottom: 0;
  margin-top: 3em;
  text-align: center;

  color: ${(props) =>
    props.health > 50
      ? "green"
      : props.health <= 50 && props.health > 30
      ? "orange"
      : "red"};
`;

const leftAttack = keyframes`
0% {
    left: 0;
    transform: translateY(-0%);
    transform: rotateY(180deg)
    
  }
  
  20% {
    left: 0;
    transform: translateY(-20%);
    
  }
  30% {
    left: 0;
    transform: translateY(-30%);
   
  }
  40% {
    left: 0;
    transform: translateY(-40%);
   
  }
50% {
    left: 100%;
    transform: translateX(-600%);
  }
100% {
    left: 0;
    transform: translateX(0);
  }
`;

const rightAttack = keyframes`
0% {
    right: 0;
    transform: translateY(-0%);
    transform: rotateX(-180deg)
  }
  20% {
    right: 0;
    transform: translateY(-20%);
  }
  30% {
    right: 0;
    transform: translateY(-30%);
  }
  40% {
    right: 0;
    transform: translateY(-40%);
  }
50% {
    right: 100%;
    transform: translateX(600%);
   
  }
100% {
    right: 0;
    transform: translateY(0);
    
  }
`;

const ImgLeft = styled.img<ImgProps>`
  animation: ${(props) => props.animate && props.direction === 0 && rightAttack}
    2s ease-in-out;

  width: 150px;
  height: 150px;
`;

const ImgRight = styled.img<ImgProps>`
  animation: ${(props) =>
      props.animate && props.direction === 180 && leftAttack}
    2s ease-in-out;
  width: 150px;
  height: 150px;
`;

const MiniLog = styled.p<MiniLogProps>`
  font-size: 30px;
  font-weight: 700;
  font-style: italic;
  margin: 0;
  padding: 0;
  rotate: 5deg;
  position: absolute;
  top: 0;
  left: ${(props) => (props.side === "left" ? "50%" : "10%")};
  color: ${(props) => (props.lastLog === "Miss!" ? "black" : "red")};
`;
