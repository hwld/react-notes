import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import TreeViewContext, { TreeNode } from './TreeViewContext';

const Tree = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  background-color: ${props => props.theme.palette.primary.main};
  margin-top: 0;
  margin-bottom: 0;
`;

interface TreeViewProps {
  className?: string;
  defaultSelectedId?: string;
  onNodeSelect?: (id: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  children,
  className,
  defaultSelectedId = '',
  onNodeSelect,
}) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedId, setSelectedId] = useState(defaultSelectedId);

  // 内部の選択状態と外部の選択状態を同時に設定する
  const selectId = useCallback(
    (id: string) => {
      setSelectedId(id);
      if (onNodeSelect) onNodeSelect(id);
    },
    [onNodeSelect],
  );

  // 選択されているノードが存在しない場合、選択状態を解除する
  useEffect(() => {
    if (
      selectedId !== '' &&
      nodes.length !== 0 &&
      nodes.filter(node => node.id === selectedId).length === 0
    ) {
      selectId('');
    }
  }, [nodes, selectId, selectedId]);

  const addNode = useCallback((id: string) => {
    setNodes(state => [...state, { id, expanded: false }]);
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes(state => state.filter(node => node.id !== id));
  }, []);

  const selectNode = useCallback(
    (id: string) => {
      if (selectedId !== id) {
        selectId(id);
      } else {
        selectId('');
      }
    },
    [selectId, selectedId],
  );

  const expandNode = useCallback((id: string) => {
    setNodes(state => {
      return state.map(node => {
        if (node.id === id) return { id: node.id, expanded: !node.expanded };

        return node;
      });
    });
  }, []);

  return (
    <TreeViewContext.Provider
      value={{ nodes, addNode, removeNode, selectedId, selectNode, expandNode }}
    >
      <Tree
        onClick={() => {
          selectId('');
        }}
        className={className}
      >
        {children}
      </Tree>
    </TreeViewContext.Provider>
  );
};

export default TreeView;
