import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import NoteView from 'components/NoteView';
import AppBar from 'components/AppBar';
import GenreView from './GenreView';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const Drawer = styled.div<{ width: string; isOpen: boolean }>`
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  flex-basis: ${props => `${props.width}px`};
  margin-left: ${props => (props.isOpen ? '0px' : `-${props.width}px`)};
  transition-duration: 0.3s;
  overflow: auto;
`;

const StyledNoteView = styled(NoteView)`
  height: 100%;
  flex: 1;
`;

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  return (
    <Background>
      <AppBar onMenuClick={() => setIsOpen(state => !state)} />
      <Drawer width="500" isOpen={isOpen}>
        <GenreView
          onGenreSelect={(event: React.ChangeEvent<{}>, genreId: string) => {
            setSelectedGenreId(genreId);
          }}
        />
      </Drawer>
      <StyledNoteView selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
