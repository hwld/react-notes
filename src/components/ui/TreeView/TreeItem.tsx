import React, { useState, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SvgIcon, Typography } from '@material-ui/core';
import TreeViewContext from './TreeViewContext';

const TreeItemRoot = styled.ul`
  list-style: none;
  padding-inline-start: 10px;
`;

const TreeItemContentRoot = styled.div`
  :hover {
    background-color: ${props => props.theme.palette.action.hover};
  }
  height: 5vh;
`;

const TreeItemContent = styled.div<{ selected?: boolean }>`
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${props =>
    props.selected && props.theme.palette.action.selected};
`;

const TreeItemGroup = styled.li`
  list-style: none;
  padding-inline-start: 10px;
`;

interface TreeItemProps {
  label: string;
  nodeId: string;
}

const TreeItem: React.FC<TreeItemProps> = ({ children, label, nodeId }) => {
  const {
    nodes,
    addNode,
    removeNode,
    selectedId,
    selectNode,
    expandNode,
  } = useContext(TreeViewContext);

  useEffect(() => {
    addNode(nodeId);

    return () => {
      removeNode(nodeId);
    };
  }, [addNode, nodeId, removeNode]);

  const expandable = Boolean(
    Array.isArray(children) ? children.length : children,
  );

  const expanded: boolean = useMemo(() => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      return node.expanded;
    }

    return false;
  }, [nodeId, nodes]);

  const select = () => {
    selectNode(nodeId);
  };

  const expand = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    if (expandable) {
      expandNode(nodeId);
    }
  };

  const icon = () => {
    if (!expandable) return <></>;

    if (expanded) {
      return <ChevronRightIcon color="secondary" />;
    }

    return <ExpandMoreIcon color="secondary" />;
  };

  return (
    <TreeItemRoot>
      <TreeItemContentRoot>
        <TreeItemContent onClick={select} selected={nodeId === selectedId}>
          <SvgIcon focusable onClick={expand} fontSize="large">
            {icon()}
          </SvgIcon>
          <Typography>{label}</Typography>
        </TreeItemContent>
      </TreeItemContentRoot>
      <TreeItemGroup hidden={!expanded}>{children}</TreeItemGroup>
    </TreeItemRoot>
  );
};

export default TreeItem;
