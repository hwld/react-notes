import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

interface ContentColumnProps {
  className?: string;
  content: ReactNode;
  footerMenu: ReactNode;
  footerColor: string;
}

const ViewRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Toolbar)`
  min-height: 64px;
`;

const Content = styled.div`
  height: 85%;
  overflow: auto;
`;

const FooterMenu = styled(Toolbar)`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.color};
  min-height: 75px;
`;

const ContentColumn: React.FC<ContentColumnProps> = ({
  className,
  content,
  footerMenu,
  footerColor,
}) => {
  return (
    <ViewRoot className={className}>
      <Header />
      <Divider />

      <Content>{content}</Content>

      <FooterMenu color={footerColor}>{footerMenu}</FooterMenu>
    </ViewRoot>
  );
};

export default ContentColumn;