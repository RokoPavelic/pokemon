import React, { FC } from "react";
import Button from "./Button";

type HomeProps = {
  fetchPokemons: () => void;
};

const Home: FC<HomeProps> = ({ fetchPokemons }) => {
  return (
    <div>
      <Button text="New Game" onClick={fetchPokemons} />
    </div>
  );
};

export default Home;
