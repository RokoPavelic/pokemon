import React, { FC } from "react";
import Button from "./Button";
import Kodimon from "../assets/kodimon 1.png";
import kodiLogo from "../assets/Kodi-logo.svg";
import styled from "styled-components";

type HomeProps = {
  fetchPokemons: () => void;
};

const Home: FC<HomeProps> = ({ fetchPokemons }) => {
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
