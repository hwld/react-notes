import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { render, fireEvent } from '../../../test-util';
import TreeView from './TreeView';
import TreeItem from './TreeItem';

describe('<TreeView>', () => {
  describe('選択関係', () => {
    test('選択状態のアイテムを削除すると、選択状態から除外される', () => {
      const nodeSelect = jest.fn();
      const { rerender } = render(
        <DndProvider backend={HTML5Backend}>
          <TreeView selectedIds={['item']} onNodeSelect={nodeSelect}>
            <TreeItem label="item" nodeId="item" />
          </TreeView>
        </DndProvider>,
      );

      rerender(
        <DndProvider backend={HTML5Backend}>
          <TreeView selectedIds={['item']} onNodeSelect={nodeSelect} />
        </DndProvider>,
      );

      expect(nodeSelect.mock.calls.length).toBe(1);
      //  選択解除
      expect(nodeSelect.mock.calls[0][0]).toEqual([]);
    });
  });

  describe('ドラッグアンドドロップ', () => {
    const DropTreeView: React.FC<{
      onDrop: () => void;
      multiple?: boolean;
    }> = ({ onDrop, multiple = false }) => {
      const [selectedIds, setSelectedIds] = useState<string[]>([]);

      return (
        <DndProvider backend={HTML5Backend}>
          <TreeView
            multiple={multiple}
            isDrag
            onDrop={onDrop}
            onNodeSelect={ids => setSelectedIds(ids)}
            selectedIds={selectedIds}
          >
            <TreeItem label="parent" nodeId="parent">
              <TreeItem label="child" nodeId="child">
                <TreeItem label="grandChild" nodeId="grandChild" />
              </TreeItem>
            </TreeItem>
          </TreeView>
        </DndProvider>
      );
    };

    const DragAndDrop = (src: HTMLElement, dst: HTMLElement) => {
      fireEvent.dragStart(src);
      fireEvent.dragEnter(dst);
      fireEvent.drop(dst);
      fireEvent.dragLeave(dst);
      fireEvent.dragEnd(src);
    };

    test('TreeItemは親以上のTreeItemにdropできる.', () => {
      const onDrop = jest.fn();

      const { getByTestId } = render(<DropTreeView onDrop={onDrop} />);

      DragAndDrop(
        getByTestId('dragLayer-grandChild'),
        getByTestId('dropLayer-child'),
      );

      DragAndDrop(
        getByTestId('dragLayer-grandChild'),
        getByTestId('dropLayer-parent'),
      );

      expect(onDrop.mock.calls.length).toBe(2);
      expect(onDrop.mock.calls[0][0]).toEqual(['grandChild']);
      expect(onDrop.mock.calls[0][1]).toEqual('child');

      expect(onDrop.mock.calls[1][0]).toEqual(['grandChild']);
      expect(onDrop.mock.calls[1][1]).toEqual('parent');
    });

    test('TreeItemは子以下のTreeItemにdropできない.', () => {
      const onDrop = jest.fn();

      const { getByTestId } = render(<DropTreeView onDrop={onDrop} />);

      DragAndDrop(
        getByTestId('dragLayer-parent'),
        getByTestId('dropLayer-child'),
      );

      DragAndDrop(
        getByTestId('dragLayer-parent'),
        getByTestId('dropLayer-grandChild'),
      );
      expect(onDrop.mock.calls.length).toBe(0);
    });

    test('複数のTreeItemをdropできる', () => {
      const onDrop = jest.fn();

      const { getByTestId } = render(<DropTreeView onDrop={onDrop} multiple />);

      fireEvent.click(getByTestId('clickLayer-child'));
      fireEvent.click(getByTestId('clickLayer-grandChild'), { ctrlKey: true });

      DragAndDrop(
        getByTestId('dragLayer-child'),
        getByTestId('dropLayer-parent'),
      );

      expect(onDrop.mock.calls.length).toBe(1);
      expect(onDrop.mock.calls[0][0]).toEqual(['child', 'grandChild']);
      expect(onDrop.mock.calls[0][1]).toBe('parent');
    });
  });
});
