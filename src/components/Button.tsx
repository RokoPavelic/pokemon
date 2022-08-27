import { FC, useEffect } from "react";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};
const Button: FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <MainButton disabled={disabled} onClick={onClick} text={text}>
      {text}
    </MainButton>
  );
};

export default Button;

const MainButton = styled.button<ButtonProps>`
  background-color: #0073bc;
  color: white;
  border: 2px solid #73b9e5;
  border-radius: 20px;
  height: 40px;
  width: 200px;
  cursor: pointer;
  font-size: 20px;
  font-family: "Bellota Text";
  font-weight: 700;
  font-style: italic;
  opacity: ${(props) => (props.disabled === true ? "30%" : "100%")};
`;
