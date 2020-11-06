import { useTypedController } from '@hookform/strictly-typed';
import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CategoryField } from '../../../services/categories';

type FormCategoryField = Record<keyof CategoryField, string>;

type Props = {
  className?: string;
  id: string;
  defaultField?: CategoryField;
  onSubmit: (field: CategoryField) => void;
};

const Component: React.FC<Props> = ({
  className,
  id,
  defaultField,
  onSubmit,
}) => {
  const { control, errors, handleSubmit } = useForm<FormCategoryField>({
    defaultValues: {
      categoryName: defaultField?.categoryName || '',
    },
  });
  const TypedController = useTypedController<FormCategoryField>({ control });

  const editCategory = (field: FormCategoryField) => {
    const newFields: CategoryField = { categoryName: field.categoryName };
    onSubmit(newFields);
  };

  return (
    <form id={id} onSubmit={handleSubmit(editCategory)} className={className}>
      <TypedController
        name="categoryName"
        render={props => (
          <TextField
            id="EditCategoryName"
            label="カテゴリー名"
            placeholder="(100文字以内で入力してください)"
            inputProps={{ autoComplete: 'off' }}
            error={!!errors.categoryName}
            fullWidth
            {...props}
          />
        )}
        rules={{
          maxLength: { value: 100, message: '100文字以内で入力してください' },
          required: { value: true, message: 'カテゴリー名は必須項目です' },
        }}
      />
      <div className="errorField">
        <Typography className="errorText">
          {errors.categoryName?.message}
        </Typography>
      </div>
    </form>
  );
};

const StyledComponent = styled(Component)`
  & > .errorField {
    height: 25px;

    & > .errorText {
      margin-left: 5px;
      color: ${props => props.theme.palette.error.main};
    }
  }

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

export const CategoryForm = StyledComponent;