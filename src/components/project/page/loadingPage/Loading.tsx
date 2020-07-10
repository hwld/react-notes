import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@material-ui/core';

interface LoadingProps {
  hoge?: string;
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const LoadingText = styled(Typography)`
  font-size: 2.5rem;
`;

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Background data-testid="loadingPage">
      <CircularProgress
        size="5rem"
        color="secondary"
        data-testid="loadingCircle"
      />
      <LoadingText data-testid="loadingText">Now Loading</LoadingText>
    </Background>
  );
};

export default Loading;
