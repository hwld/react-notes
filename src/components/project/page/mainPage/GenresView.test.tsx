import React, { useState } from 'react';
import { render, dragAndDrop } from '../../../../test-util';
import GenresView from './GenresView';
import { Genre } from '../../../../services/genres';
import {
  genresContextDefaultValue,
  GenresContextProvider,
} from '../../../../context/GenresContext';

describe('<GenresView>', () => {
  const GenreViewTest: React.FC<{
    moveGenre: (sourceGenreId: string, destGenreId: string) => {};
  }> = ({ moveGenre }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <GenresContextProvider
        value={{
          ...genresContextDefaultValue,
          genres: [
            {
              genreName: 'genre1',
              id: 'genre1',
              childrenGenreIds: [],
              parentGenreId: '',
              createdAt: new Date(),
            },
            {
              genreName: 'genre2',
              id: 'genre2',
              childrenGenreIds: [],
              parentGenreId: '',
              createdAt: new Date(),
            },
          ],
          moveGenre,
        }}
      >
        <GenresView
          selectedGenreIds={selectedIds}
          onGenreSelect={setSelectedIds}
        />
      </GenresContextProvider>
    );
  };
  test('コンテキストに含まれるmoveGenreが正しく呼び出されている', () => {
    const moveGenre = jest.fn((sourceGenreId: string, destGenreId: string) => ({
      sourceGenreId,
      destGenreId,
    }));
    const { getByTestId } = render(<GenreViewTest moveGenre={moveGenre} />);
    dragAndDrop(
      getByTestId('dragLayer-genre2'),
      getByTestId('dropLayer-genre1'),
    );
    expect(moveGenre.mock.calls.length).toBe(1);
  });
});
