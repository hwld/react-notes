import React, { useState } from 'react';
import styled from 'styled-components';
import NoteView from 'components/Page/mainPage/NoteView';
import Header from 'components/Page/mainPage/Header';
import Drawer from 'components/util/Drawer/Drawer';
import GenreView from './GenreView';

const Background = styled.div`
  display: ${props => (props.theme.breakpoints.down('xs') ? 'flex' : 'block')};
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const LeftDrawer = styled(Drawer)``;

const RightNoteView = styled(NoteView)`
  flex: 1;
`;

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  return (
    <Background>
      <Header onMenuClick={() => setIsOpen(state => !state)} />
      <LeftDrawer
        width="30"
        mobileWidth="80"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <GenreView
          onGenreSelect={(genreId: string) => {
            setSelectedGenreId(genreId);
          }}
          selectedGenreId={selectedGenreId}
        />
      </LeftDrawer>
      <RightNoteView selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
