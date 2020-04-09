import React, { useContext } from 'react';
import { DialogTitle, DialogContent, SvgIconProps } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import NotesContext from '../../../context/NotesContext';
import OperationDialog from './OperationDialog';

interface RemoveNoteDialogProps {
  selectedNoteIds: string[];
  size?: SvgIconProps['fontSize'];
}

const RemoveNoteDialog: React.FC<RemoveNoteDialogProps> = ({
  selectedNoteIds,
  size,
}) => {
  const { removeNote } = useContext(NotesContext);

  const remove = () => {
    selectedNoteIds.forEach(id => removeNote(id));
  };

  return (
    <OperationDialog
      tooltipText="メモを削除"
      activatorIcon={<DeleteNoteIcon fontSize={size} />}
      activatorDisabled={selectedNoteIds.length === 0}
      doneText="削除"
      onDone={remove}
    >
      <DialogTitle>メモの削除</DialogTitle>
      <DialogContent>削除してよろしいですか?</DialogContent>
    </OperationDialog>
  );
};

export default RemoveNoteDialog;