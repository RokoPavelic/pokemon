import { FC } from "react";
import { PokeAPI } from "pokeapi-types";
import styled, { keyframes } from "styled-components";
import Stats from "./Stats";

type PokemonCardProps = {
  pokemon: PokeAPI.Pokemon | undefined;
  side: string;
  animate: boolean;
  direction: number;
};

type ImgProps = {
  side: string;
  animate: boolean;
  direction: number;
};

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  side,
  animate,
  direction,
}) => {
  return (
    <CardContainer>
      <HealthBarContainer>
        <HealthValue>100%</HealthValue>
        <HealthBar></HealthBar>
      </HealthBarContainer>
      <p>{pokemon?.name}</p>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

const HealthBarContainer = styled.div`
  width: 100%;
`;

const HealthBar = styled.div`
  height: 10px;
  width: 100%;
  background: -webkit-linear-gradient(right, white 50%, red 50%);
  border: 2px solid #079325;
  border-radius: 6px;
`;

const HealthValue = styled.p`
  color: green;
`;

const leftAttack = keyframes`
0% {
    left: 0;
    transform: translateX(0);
  }
50% {
    left: 100%;
    transform: translateX(-550%);
  }
100% {
    left: 0;
    transform: translateX(0);
  }
`;

const rightAttack = keyframes`
0% {
    right: 0;
    transform: translateX(0);
  }
50% {
    right: 100%;
    transform: translateX(550%);
  }
100% {
    right: 0;
    transform: translateX(0);
  }
`;

const ImgLeft = styled.img<ImgProps>`
  animation: ${(props) => props.animate && props.direction === 0 && rightAttack}
    2s linear;
  width: 150px;
  height: 150px;
`;

const ImgRight = styled.img<ImgProps>`
  animation: ${(props) =>
      props.animate && props.direction === 180 && leftAttack}
    2s linear;
  width: 150px;
  height: 150px;
`;
