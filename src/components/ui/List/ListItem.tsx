import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { ListItem as MuiListItem, useForkRef } from '@material-ui/core';
import { useDrag, DragPreviewImage } from 'react-dnd';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { ListContext } from './ListContext';
import { ItemTypes } from '../ItemTypes';

export type ListItemDropType = {
  type: string;
  ids: string[];
};

type Props = {
  className?: string;
  itemId: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const Component = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props>
>(function ListItem({ children, className, itemId, onKeyDown }, ref) {
  const {
    selectedIds,
    draggable,
    selectItem,
    removeItemId,
    isFocused,
    focus,
    unFocus,
  } = useContext(ListContext);

  const itemRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(itemRef, ref);

  const focused = isFocused(itemId);

  const [, drag, preview] = useDrag({
    item: { type: ItemTypes.ListItem, ids: [...selectedIds] },
    begin: monitor => {
      if (!selectedIds.includes(itemId)) {
        selectItem([itemId]);

        return { type: ItemTypes.ListItem, ids: [itemId] };
      }

      return monitor.getItem();
    },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        selectItem([]);
      }
    },
  });

  const handleClick = useCallback(() => {
    if (!isFocused(itemId)) {
      focus(itemId);
    }

    if (!selectedIds.includes(itemId)) {
      selectItem([...selectedIds, itemId]);
    } else {
      selectItem(selectedIds.filter(id => id !== itemId));
    }
  }, [focus, isFocused, itemId, selectItem, selectedIds]);

  useEffect(() => {
    return () => {
      removeItemId(itemId);
    };
  }, [itemId, removeItemId]);

  useEffect(() => {
    if (itemRef.current && isFocused(itemId)) {
      itemRef.current.focus();
    }
  }, [isFocused, itemId]);

  return (
    <div
      className={className}
      ref={draggable ? drag : null}
      data-testid={`dragLayer-${itemId}`}
    >
      <MuiListItem
        className={`list-item ${focused && 'focused'}`}
        ref={handleRef}
        button
        onClick={handleClick}
        onKeyDown={onKeyDown}
        onFocus={(event: React.FocusEvent<HTMLDivElement>) => {
          event.stopPropagation();
          focus(itemId);
        }}
        onBlur={() => {
          unFocus(itemId);
        }}
        selected={selectedIds.includes(itemId)}
        data-testid={`selectLayer-${itemId}`}
        tabIndex={-1}
      >
        {children}
      </MuiListItem>
      <DragPreviewImage
        connect={preview}
        src={`${process.env.PUBLIC_URL}/note.svg`}
      />
    </div>
  );
});

const StyledComponent = styled(Component)`
  & > .list-item {
    border: 1px solid ${props => props.theme.palette.primary.light};
    border-radius: 10px;

    &.focused {
      background-color: ${props => props.theme.palette.action.hover};
      border: 1px solid ${props => props.theme.palette.secondary.light};
    }

    &.Mui-selected {
      background-color: ${props =>
        fade(
          props.theme.palette.action.selected,
          props.theme.palette.action.selectedOpacity,
        )};
    }

    &.Mui-selected.Mui-focusVisible,
    &.Mui-selected:focus,
    &.Mui-selected:hover {
      background-color: ${props =>
        fade(
          props.theme.palette.action.selected,
          props.theme.palette.action.selectedOpacity +
            props.theme.palette.action.hoverOpacity,
        )};
    }
  }
`;

export const ListItem = StyledComponent;
