import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { NoteField } from '../../../services/notes';

const FormField = styled.div`
  margin-top: 20px;
`;

const FormTextField = styled(TextField)`
  & label.Mui-focused,
  .MuiFormLabel-root {
    color: ${props => props.theme.palette.secondary.main};
  }

  & .MuiFormHelperText-root {
    font-size: large;
  }

  & .MuiFilledInput-input:-webkit-autofill {
    box-shadow: 0 0 0 100px ${props => props.theme.palette.primary.main}e5 inset;
  }
`;

type Props = {
  noteField: NoteField;
  onChange: (fieldName: keyof NoteField, value: string) => void;
};

const Component: React.FC<Props> = ({ noteField, onChange }) => {
  const { title, text } = noteField;

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('title', event.target.value);
  };

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('text', event.target.value);
  };

  return (
    <>
      <FormField>
        <FormTextField
          inputProps={{ maxLength: 100, autoComplete: 'off' }}
          placeholder="(100文字以内で入力してください)"
          id="editNoteFieldsTitle"
          label="タイトル"
          value={title}
          onChange={changeTitle}
          fullWidth
        />
      </FormField>
      <FormField>
        <FormTextField
          inputProps={{ maxLength: 5000 }}
          id="editNoteFieldsNote"
          label="メモ"
          placeholder="(5000文字以内で入力してください)"
          error={text.length === 0}
          helperText="※メモは必須項目です."
          value={text}
          onChange={changeText}
          fullWidth
          rowsMax="10"
          rows="10"
          multiline
        />
      </FormField>
    </>
  );
};

export const EditNoteFields = Component;
