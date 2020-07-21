import * as React from 'react';
import { useContext } from 'react';
import { Genre, GenreField } from '../services/genres';

type GenresContextValue = {
  genres: Genre[];
  addGenre: (parentGenreId: string, genreField: GenreField) => void;
  removeGenre: (id: string) => void;
  updateGenre: (genre: GenreField & { id: string }) => void;
  moveGenre: (genreId: string, destGenreId: string) => void;
};

export const genresContextDefaultValue: GenresContextValue = {
  genres: [],

  addGenre: () => {},
  removeGenre: () => {},
  updateGenre: () => {},
  moveGenre: () => {},
};

const GenresContext = React.createContext<GenresContextValue>(
  genresContextDefaultValue,
);

export const GenresContextProvider: React.FC<{ value: GenresContextValue }> = ({
  children,
  value,
}) => {
  return (
    <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
  );
};

export const useGenresContext = () => useContext(GenresContext);