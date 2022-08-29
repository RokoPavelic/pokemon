import { useState, useEffect, FC } from "react";
import Kodimon from "../assets/kodimon 1.png";
import kodiLogo from "../assets/Kodi-logo.svg";
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
import { setLogs, setLastLog, clearLogs } from "../features/logsSlice";

type ArrowProps = {
  direction: number;
};

type OverlayProps = {
  isGameOver: boolean;
};

type GameProps = {
  fetchPokemons: () => void;
};

const Game: FC<GameProps> = ({ fetchPokemons }) => {
  const dispatch = useAppDispatch();
  const pokemonOne = useAppSelector(selectPokemonOne);
  const pokemonTwo = useAppSelector(selectPokemonTwo);

  const [direction, setDirection] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [pokemonOneHealth, setPokemonOneHealth] = useState<number>(100);
  const [pokemonTwoHealth, setPokemonTwoHealth] = useState<number>(100);
  const [attackingPokemon, setAttackingPokemon] = useState<PokeAPI.Pokemon>();
  const [defendingPokemon, setDefendingPokemon] = useState<PokeAPI.Pokemon>();

  useEffect(() => {
    if (!pokemonOne || !pokemonTwo) return;
    if (pokemonOne.stats[5].base_stat > pokemonTwo.stats[5].base_stat) {
      setDirection(180);
    } else {
      setDirection(0);
    }

    setPokemonOneHealth(pokemonOne.stats[0].base_stat);
    setPokemonTwoHealth(pokemonTwo.stats[0].base_stat);
    setAttackingPokemon(direction === 0 ? pokemonTwo : pokemonOne);
    setDefendingPokemon(direction === 180 ? pokemonTwo : pokemonOne);
    dispatch(clearLogs());
  }, [pokemonOne, pokemonTwo]);

  useEffect(() => {
    setAttackingPokemon(direction === 0 ? pokemonTwo : pokemonOne);
    setDefendingPokemon(direction === 180 ? pokemonTwo : pokemonOne);
  }, [direction]);

  const attack = () => {
    if (!pokemonOne || !pokemonTwo || !attackingPokemon || !defendingPokemon)
      return;

    setDisabled(true);
    setTimeout(() => setDisabled(false), 2000);
    if (direction === 0) {
      setDirection(180);
    } else {
      setDirection(0);
    }
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);

    setTimeout(() => {
      let damage = 0;
      const number = Math.floor(Math.random() * 10);

      if (number > 2) {
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

        dispatch(
          setLogs(
            `${attackingPokemon.name} attacked ${defendingPokemon.name}for
           ${Math.floor(damage)} DMG `
          )
        );
        dispatch(setLastLog(`${Math.floor(damage)} dmg!`));
      } else {
        dispatch(
          setLogs(`${attackingPokemon.name} missed ${defendingPokemon.name}`)
        );
        dispatch(setLastLog(`Miss!`));
      }
      setTimeout(() => dispatch(setLastLog("")), 1000);
    }, 1000);
  };

  useEffect(() => {
    if (pokemonTwoHealth === 0) dispatch(setLogs(`${pokemonTwo?.name} died`));
    if (pokemonOneHealth === 0) dispatch(setLogs(`${pokemonOne?.name} died`));
  }, [pokemonTwoHealth, pokemonOneHealth]);

  return (
    <>
      <Logo>
        <img src={kodiLogo} alt="logo" className="logo" />
        <img src={Kodimon} alt="kodimon" className="kodimon" />
      </Logo>

      <PokemonCardContainer>
        <PokemonCard
          pokemon={pokemonOne}
          side="left"
          animate={animate}
          direction={direction}
          pokemonHealth={pokemonOneHealth}
          defendingPokemon={defendingPokemon}
        />
        <Attack>
          <Arrow src={arrow} alt="" direction={direction} />
          <Button
            disabled={disabled}
            text="Attack"
            onClick={() => {
              attack();
            }}
          />
        </Attack>
        <PokemonCard
          pokemon={pokemonTwo}
          side="right"
          animate={animate}
          direction={direction}
          pokemonHealth={pokemonTwoHealth}
          defendingPokemon={defendingPokemon}
        />
      </PokemonCardContainer>

      <MenuAndLogs>
        <Menu fetchPokemons={fetchPokemons} />
        <Logs />
      </MenuAndLogs>

      <Overlay isGameOver={pokemonOneHealth === 0 || pokemonTwoHealth === 0}>
        <Winner>
          {pokemonOneHealth === 0
            ? `${pokemonTwo?.name} won! `
            : `${pokemonOne?.name} won!`}
        </Winner>

        <Menu fetchPokemons={fetchPokemons} />
      </Overlay>
    </>
  );
};

export default Game;

const PokemonCardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  p::first-letter {
    text-transform: capitalize;
  }
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
  width: 69%;
  justify-content: space-between;
`;

const Arrow = styled.img<ArrowProps>`
  transform: rotate(${(props) => props.direction}deg);
  width: 50px;
  height: 50px;
`;

const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 110vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: ${(props) => (props.isGameOver ? "flex" : "none")};
`;

const Winner = styled.p`
  font-size: 30px;
  font-weight: 700;
  font-style: italic;

  ::first-letter {
    text-transform: capitalize;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  height: 70px;
  margin-top: 0;

  .kodimon {
    width: 200px;
    height: 70px;
    z-index: 1;
    position: relative;
    top: -40px;
  }
  .logo {
    width: 50px;
    height: 60px;
    position: relative;
    top: 0px;
    left: -80px;
    rotate: -30deg;
    z-index: 1;
  }
`;
