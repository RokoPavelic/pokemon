import { FC } from "react";
import styled from "styled-components";

type PokemonStat = {
  stat: {
    name: string;
    url: string;
  };
  effort: number;
  base_stat: number;
};

type StatsProps = {
  stats: PokemonStat[] | undefined;
};

const Stats: FC<StatsProps> = ({ stats }) => {
  return (
    <StatsContainer>
      <Title>Stats</Title>
      <StatsContainerInner>
        {stats?.map((stat, i) => (
          <div key={i}>
            {stat.stat.name !== "special-attack" &&
              stat.stat.name !== "special-defense" && (
                <p>{`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}</p>
              )}
          </div>
        ))}
      </StatsContainerInner>
    </StatsContainer>
  );
};

export default Stats;

const StatsContainerInner = styled.div`
  background-color: #fff7d6;
  border: 2px solid #ffcc00;
  width: 90%;
  border-radius: 10px;
  padding: 10px;

  p {
    margin: 4px;
  }
`;

const StatsContainer = styled.div`
  width: 100%;
`;

const Title = styled.p`
  margin: 0;
`;
