import { FC } from "react";
import Button from "./Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type MenuProps = {
  fetchPokemons: () => void;
};

const Menu: FC<MenuProps> = ({ fetchPokemons }) => {
  const navigate = useNavigate();

  return (
    <MenuContainer>
      <Title>Menu:</Title>
      <MenuContainerInner>
        <Button text="Home" onClick={() => navigate("/")} />
        <Button text="New Game" onClick={() => fetchPokemons()} />
        <Button
          text="New opponent"
          onClick={() => console.log("New oponent")}
        />
      </MenuContainerInner>
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 220px;
  width: 250px;
  margin-top: 1.5em;
`;

const MenuContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-color: #fff7d6;
  border: 2px solid #ffcc00;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
`;

const Title = styled.p`
  margin: 0;
`;
