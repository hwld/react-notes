import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import SearchNoteIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { logout } from 'services/auth';

interface HeaderProps {
  onMenuClick: () => void;
}

const TopLayerHeader = styled(MuiAppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const AppTitle = styled(Typography)`
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const history = useHistory();

  const onLogout = () => {
    logout();
  };

  const goSearchMode = () => {
    history.replace('/search');
  };

  return (
    <TopLayerHeader position="absolute">
      <Toolbar>
        <IconButton edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h4">Notes</AppTitle>
        <Tooltip title={<Typography>検索モードに移動</Typography>}>
          <IconButton onClick={goSearchMode}>
            <SearchNoteIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title={<Typography>ログアウト</Typography>}>
          <IconButton onClick={onLogout}>
            <ExitToApp fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </TopLayerHeader>
  );
};

export default Header;