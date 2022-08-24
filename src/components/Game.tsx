import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { PokeAPI } from "pokeapi-types";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import Button from "./Button";
import arrow from "../assets/arrow.svg";
import Menu from "./Menu";
import Logs from "./Logs";

type ArrowProps = {
  direction: number;
};

type GameProps = {
  pokemonOne: PokeAPI.Pokemon;
  pokemonTwo: PokeAPI.Pokemon;
  setPokemonOne: Dispatch<SetStateAction<PokeAPI.Pokemon | undefined>>;
  setPokemonTwo: Dispatch<SetStateAction<PokeAPI.Pokemon | undefined>>;
};

const Game: FC<GameProps> = ({ pokemonOne, pokemonTwo }) => {
  const [direction, setDirection] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);
  const [attacking, setAttacking] = useState<string[]>([]);
  const [pokemonOneHealth, setPokemonOneHealth] = useState<number>(0);
  const [pokemonTwoHealth, setPokemonTwoHealth] = useState<number>(0);

  useEffect(() => {
    if (pokemonOne.stats[5].base_stat > pokemonTwo.stats[5].base_stat) {
      setDirection(180);
    }
    setPokemonOneHealth(pokemonOne.stats[0].base_stat);
    setPokemonTwoHealth(pokemonTwo.stats[0].base_stat);
  }, []);

  const attack = () => {
    const attackingPokemon = direction === 0 ? pokemonTwo : pokemonOne;
    const defendingPokemon = direction === 180 ? pokemonTwo : pokemonOne;

    let damage = 0;

    const num = Math.floor(Math.random() * 10);
    if (num > 2) {
      damage =
        (attackingPokemon.stats[1].base_stat / 2) *
        (defendingPokemon.stats[2].base_stat / 100);

      if (attackingPokemon.name === pokemonOne.name) {
        setPokemonTwoHealth((prev) => prev - damage);
      } else {
        setPokemonOneHealth((prev) => prev - damage);
      }

      setAttacking((prev) => [
        ...prev,
        `${attackingPokemon.name} attacked ${
          defendingPokemon.name
        } for ${Math.floor(damage)}DMG `,
      ]);
    } else {
      setAttacking((prev) => [
        ...prev,
        `${attackingPokemon.name} missed ${defendingPokemon.name}`,
      ]);
    }
  };

  const handleAnimate = () => {
    if (direction === 0) {
      setDirection(180);
    } else {
      setDirection(0);
    }
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
    setTimeout(() => attack(), 1000);
  };

  return (
    <>
      <PokemonCardContainer>
        <PokemonCard
          pokemon={pokemonOne}
          side="left"
          animate={animate}
          direction={direction}
          pokemonHealth={pokemonOneHealth}
        />
        <Attack>
          <Arrow src={arrow} alt="" direction={direction} />
          <Button
            text="Attack"
            onClick={() => {
              handleAnimate();
            }}
          />
        </Attack>
        <PokemonCard
          pokemon={pokemonTwo}
          side="right"
          animate={animate}
          direction={direction}
          pokemonHealth={pokemonTwoHealth}
        />
      </PokemonCardContainer>

      <MenuAndLogs>
        <Menu />
        <Logs attacking={attacking} />
      </MenuAndLogs>
    </>
  );
};

export default Game;

const PokemonCardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;

const Attack = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MenuAndLogs = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
`;

const Arrow = styled.img<ArrowProps>`
  transform: rotate(${(props) => props.direction}deg);
  width: 50px;
  height: 50px;
`;
