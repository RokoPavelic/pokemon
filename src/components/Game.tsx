import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { PokeAPI } from "pokeapi-types";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import Button from "./Button";
import arrow from "../assets/arrow.svg";
import Menu from "./Menu";
import Logs from "./Logs";
import { selectPokemonOne } from "../features/pokemonOneSlice";
import { selectPokemonTwo } from "../features/pokemonTwoSlice";

type ArrowProps = {
  direction: number;
};

const Game = () => {
  const pokemonOne = useAppSelector(selectPokemonOne);
  const pokemonTwo = useAppSelector(selectPokemonTwo);

  const [direction, setDirection] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  const [pokemonOneHealth, setPokemonOneHealth] = useState<number>(0);
  const [pokemonTwoHealth, setPokemonTwoHealth] = useState<number>(0);

  /* move to redux */
  const [attacking, setAttacking] = useState<string[]>([]);

  useEffect(() => {
    if (!pokemonOne || !pokemonTwo) return;
    console.log(pokemonOne);
    console.log(pokemonTwo);
    if (pokemonOne.stats[5].base_stat > pokemonTwo.stats[5].base_stat) {
      setDirection(180);
    }
    setPokemonOneHealth(pokemonOne.stats[0].base_stat);
    setPokemonTwoHealth(pokemonTwo.stats[0].base_stat);
  }, []);

  const attack = () => {
    if (!pokemonOne || !pokemonTwo) return;
    const attackingPokemon = direction === 0 ? pokemonTwo : pokemonOne;
    const defendingPokemon = direction === 180 ? pokemonTwo : pokemonOne;

    let damage = 0;

    const num = Math.floor(Math.random() * 10);

    if (num > 2) {
      console.log(attackingPokemon.stats[1].base_stat);
      console.log(defendingPokemon.stats[2].base_stat);
      damage =
        (attackingPokemon.stats[1].base_stat / 2) *
        (defendingPokemon.stats[2].base_stat / 100);

      if (attackingPokemon.name === pokemonOne.name) {
        const health = pokemonTwoHealth - damage;
        setPokemonTwoHealth(health < 0 ? 0 : health);
      } else {
        const health = pokemonOneHealth - damage;
        setPokemonOneHealth(health < 0 ? 0 : health);
      }

      const message =
        /* move to redux */
        setAttacking((prev) => [
          ...prev,
          `${attackingPokemon.name} attacked ${
            defendingPokemon.name
          } for ${Math.floor(damage)} DMG `,
        ]);
    } else {
      setAttacking((prev) => [
        ...prev,
        `${attackingPokemon.name} missed ${defendingPokemon.name}`,
      ]);
    }
  };

  useEffect(() => {
    if (pokemonTwoHealth === 0) console.log(`${pokemonTwo?.name} died`);
    if (pokemonOneHealth === 0) console.log(`${pokemonOne?.name} died`);
  }, [pokemonTwoHealth, pokemonOneHealth]);

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
