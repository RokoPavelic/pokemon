import { FC, useState } from "react";
import Button from "./Button";
import Kodimon from "../assets/kodimon 1.png";
import kodiLogo from "../assets/Kodi-logo.svg";
import styled from "styled-components";
import Spinner from "./Spinner";

type HomeProps = {
  fetchPokemons: () => void;
};

const Home: FC<HomeProps> = ({ fetchPokemons }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <Start>
      <img src={kodiLogo} alt="logo" className="logo" />
      <img src={Kodimon} alt="kodimon" />
      <Spinner disabled={disabled} />
      <Button
        text="New Game"
        onClick={() => {
          fetchPokemons();
          setDisabled(true);
        }}
        disabled={disabled}
      />
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
