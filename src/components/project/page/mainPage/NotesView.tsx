import React, {
  useState,
  forwardRef,
  PropsWithChildren,
  useMemo,
  useCallback,
} from 'react';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { NoteList, NoteListProps } from '../../ui/NoteList/NoteList';
import { ContentColumn } from '../common/ContentColumn';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { NotesSortOrder } from '../../../../services/notes';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { OpenAddNoteDialogButton } from '../../operation/addNote/OpenAddNoteDialogButton';
import { OpenRemoveNotesDialogButton } from '../../operation/removeNotes/OpenRemoveNotesDialogButton';
import { OpenUpdateNoteDialogButton } from '../../operation/updateNote/OpenUpdateNoteDialogButton';
import { OpenMoveNotesDialogButton } from '../../operation/moveNotes/OpenMoveNotesDialogButton';
import { OpenSortNotesDialogButton } from '../../operation/sortNotes/OpenSortNotesDialogButton';

export type NotesViewProps = {
  selectedCategoryIds: string[];
  focusedId?: NoteListProps['focusedId'];
  onSetFocusedId?: NoteListProps['onSetFocusedId'];
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

const Component = forwardRef<
  HTMLUListElement,
  PropsWithChildren<NotesViewProps>
>(function NotesView(
  { selectedCategoryIds, focusedId, onSetFocusedId, className, onKeyDown },
  ref,
) {
  const { isMobile } = useAppStateContext();
  const { notes } = useNotesContext();
  const { categories, updateNotesSortOrderInCategory } = useCategoriesContext();
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  // カテゴリーが複数選択されている場合にはこっちのソート順を使用する
  const [internalNotesSortOrder, setInternalNotesSortOrder] = useState<
    NotesSortOrder
  >({
    targetField: 'createdAt',
    order: 'asc',
  });

  const notesSortOrder: NotesSortOrder = useMemo(() => {
    if (selectedCategoryIds.length === 1) {
      const selectedCategory = categories.find(
        g => g.id === selectedCategoryIds[0],
      );
      if (selectedCategory) {
        return selectedCategory.notesSortOrder;
      }
    }

    return internalNotesSortOrder;
  }, [categories, internalNotesSortOrder, selectedCategoryIds]);

  const setNotesSortOrder = useCallback(
    (order: NotesSortOrder) => {
      if (selectedCategoryIds.length === 1) {
        updateNotesSortOrderInCategory({
          order: order.order,
          targetField: order.targetField,
          id: selectedCategoryIds[0],
        });
      } else {
        setInternalNotesSortOrder(order);
      }
    },
    [selectedCategoryIds, updateNotesSortOrderInCategory],
  );

  const viewNotes = useMemo(() => {
    return notes.filter(note => selectedCategoryIds.includes(note.categoryId));
  }, [notes, selectedCategoryIds]);

  return (
    <ContentColumn
      className={className}
      isFixedFooter={isMobile}
      footerMenu={
        <>
          <OpenAddNoteDialogButton
            disabled={selectedCategoryIds.length !== 1}
            categoryId={selectedCategoryIds[0] ?? ''}
          />
          <OpenRemoveNotesDialogButton
            disabled={selectedNoteIds.length === 0}
            targetNoteIds={selectedNoteIds}
          />
          <OpenUpdateNoteDialogButton
            disabled={selectedNoteIds.length !== 1}
            defaultNoteId={selectedNoteIds[0]}
          />
          <OpenMoveNotesDialogButton
            disabled={selectedNoteIds.length === 0}
            sourceNoteIds={selectedNoteIds}
          />
          <OpenSortNotesDialogButton
            disabled={selectedCategoryIds.length === 0}
            defaultSortOrder={notesSortOrder}
            sort={setNotesSortOrder}
          />
        </>
      }
    >
      {selectedCategoryIds.length !== 0 ? (
        <NoteList
          draggable
          notes={viewNotes}
          selectedNoteIds={selectedNoteIds}
          onNotesSelect={setSelectedNoteIds}
          focusedId={focusedId}
          onSetFocusedId={onSetFocusedId}
          onKeyDown={onKeyDown}
          notesSortOrder={notesSortOrder}
          ref={ref}
        />
      ) : (
        <Alert
          className={`${className}_alert`}
          severity="warning"
          aria-label="noselectedAlert"
        >
          カテゴリーを選択してください
        </Alert>
      )}
    </ContentColumn>
  );
});

const StyledComponent = styled(Component)`
  &_alert {
    margin: 20px auto;
    width: 80%;
  }
`;

export const NotesView = StyledComponent;
