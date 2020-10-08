import React from 'react';
import { render, fireEvent } from '../../../test-util';
import { MoveNotesDialog } from './MoveNotesDialog';
import { CategoriesContextProvider } from '../../../context/CategoriesContext';
import { NotesContextProvider } from '../../../context/NotesContext';
import { getDefaultCategoryService } from '../../../services/categories';
import {
  getDefaultNoteService,
  getDefaultNotesSortOrder,
} from '../../../services/notes';

describe('<MoveNotesDialog>', () => {
  test('メモの移動処理が正しく呼び出される', () => {
    const moveNotes = jest.fn();
    const { getByTestId } = render(
      <CategoriesContextProvider
        value={{
          ...getDefaultCategoryService(),
          categories: [
            {
              categoryName: 'testCategoryName',
              createdAt: new Date(),
              id: 'testCategory',
              parentCategoryId: '',
              childrenCategoryIds: [],
              notesSortOrder: getDefaultNotesSortOrder(),
            },
          ],
        }}
      >
        <NotesContextProvider
          value={{
            ...getDefaultNoteService(),
            moveNotes,
          }}
        >
          <MoveNotesDialog sourceNoteIds={['noteId']} />
        </NotesContextProvider>
      </CategoriesContextProvider>,
    );

    // ダイアログを開く
    fireEvent.click(getByTestId('activatorButton'));

    // 移動先カテゴリーを選択する
    fireEvent.click(getByTestId('clickLayer-testCategory'));

    // 移動させる
    fireEvent.click(getByTestId('doneButton'));

    expect(moveNotes.mock.calls[0][0]).toEqual(['noteId']);
    expect(moveNotes.mock.calls[0][1]).toBe('testCategory');
  });
});
