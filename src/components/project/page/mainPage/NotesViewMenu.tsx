import React from 'react';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import AddNoteDialog from '../../operation/AddNoteDialog';
import RemoveNoteDialog from '../../operation/RemoveNoteDialog';
import MoveNotesDialog from '../../operation/MoveNotesDialog';
import SortNotesDialog from '../../operation/SortNotesDialog';

interface NoteViewMenuProps {
  sortNotes: (order: NotesSortOrder) => void;
  defaultNotesSortOrder: NotesSortOrder;
  selectedGenreId: string;
  selectedNoteIds: string[];
}

const NoteViewMenu: React.FC<NoteViewMenuProps> = ({
  sortNotes,
  defaultNotesSortOrder,
  selectedGenreId,
  selectedNoteIds,
}) => {
  return (
    <>
      <AddNoteDialog selectedGenreId={selectedGenreId} />
      <RemoveNoteDialog selectedNoteIds={selectedNoteIds} />
      <MoveNotesDialog selectedNotesIds={selectedNoteIds} />
      <SortNotesDialog
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
        selectedGenreId={selectedGenreId}
      />
    </>
  );
};

export default NoteViewMenu;