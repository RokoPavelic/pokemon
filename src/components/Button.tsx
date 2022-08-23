import { FC } from "react";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick: () => void;
};
const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return <MainButton onClick={onClick}>{text}</MainButton>;
};

export default Button;

const MainButton = styled.button`
  background-color: #0073bc;
  color: white;
  border: 2px solid #73b9e5;
  border-radius: 20px;
  height: 25px;
  width: 100px;
`;
