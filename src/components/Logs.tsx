import { FC } from "react";
import styled from "styled-components";

type LogsProps = {
  attacking: string[];
};

const Logs: FC<LogsProps> = ({ attacking }) => {
  return (
    <LogsContainer>
      <Title>Logs:</Title>
      <LogsContainerInner>
        {attacking.map((attack) => (
          <p>{attack}</p>
        ))}
      </LogsContainerInner>
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
  overflow: scroll;
`;
const Title = styled.p``;
