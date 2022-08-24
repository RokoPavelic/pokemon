import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";

type MenuProps = {};

const Menu = () => {
  return (
    <MenuContainer>
      <Title>Menu:</Title>
      <MenuContainerInner>
        <Link to="/">
          <Button text="Home" onClick={() => console.log("Home")} />
        </Link>
        <Button text="New Game" onClick={() => console.log("Home")} />
        <Button text="New opponent" onClick={() => console.log("Home")} />
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

  margin-left: 2em;
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

const Title = styled.p``;
