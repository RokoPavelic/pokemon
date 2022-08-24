import React from "react";
import styled from "styled-components";

const Logs = () => {
  return (
    <LogsContainer>
      <Title>Logs:</Title>
      <LogsContainerInner></LogsContainerInner>
    </LogsContainer>
  );
};

export default Logs;

const LogsContainer = styled.div`
  width: 500px;
  height: 200px;
`;

const LogsContainerInner = styled.div`
  background-color: #fff7d6;
  border: 2px solid #ffcc00;
  border-radius: 10px;
  height: 100%;
`;
const Title = styled.p``;
