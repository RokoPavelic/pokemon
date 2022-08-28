import { FC } from "react";
import styled, { keyframes } from "styled-components";

type SpinnerProps = {
  disabled: boolean;
};

type RingProps = {
  disabled: boolean;
};

const Spinner: FC<SpinnerProps> = ({ disabled }) => {
  return (
    <Ring disabled={disabled}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Ring>
  );
};

export default Spinner;

const spinAnimation = keyframes`
    {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const Ring = styled.div<RingProps>`
  display: ${(props) => (props.disabled ? "inline-block" : "none")};
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #0073bc;
    border-radius: 50%;
    animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #0073bc transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
