import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import ContentView from './ContentView';

interface SearchNotesListProps {
  hoge?: string;
  className?: string;
}

const SearchNotesList: React.FC<SearchNotesListProps> = ({ className }) => {
  const theme = useTheme();

  return (
    <ContentView
      className={className}
      content={<Typography>List</Typography>}
      footerMenu={<></>}
      footerColor={theme.palette.secondary.light}
    />
  );
};
export default SearchNotesList;