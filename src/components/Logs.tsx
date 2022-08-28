import styled from "styled-components";
import { selectLogs } from "../features/logsSlice";
import { useAppSelector } from "../app/hooks";

const Logs = () => {
  const logs = useAppSelector(selectLogs);

  return (
    <LogsContainer>
      <Title>Logs:</Title>
      <LogsContainerInner>
        {logs.map((log, i) => (
          <p key={i}>{log}</p>
        ))}
      </LogsContainerInner>
    </LogsContainer>
  );
};

export default Logs;

const LogsContainer = styled.div`
  width: 500px;
  height: 200px;
  p::first-letter {
    text-transform: capitalize;
  }
`;

const LogsContainerInner = styled.div`
  background-color: #fff7d6;
  border: 2px solid #ffcc00;
  border-radius: 10px;
  height: 100%;
  overflow: scroll;
  padding: 10px;
`;
const Title = styled.p`
  margin: 0;
`;
