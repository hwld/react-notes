import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { logout } from 'services/auth';

interface SearchNotesAppBarProps {
  onMenuClick: () => void;
}

const StyledAppBar = styled(MuiAppBar)`
  background-color: ${props => props.theme.palette.secondary.light};
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const AppTitle = styled(Typography)`
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

const SearchNotesAppBar: React.FC<SearchNotesAppBarProps> = ({
  onMenuClick,
}) => {
  const history = useHistory();

  const onLogout = () => {
    logout();
    history.replace('/home');
  };

  const backHome = () => {
    history.replace('/home');
  };

  return (
    <StyledAppBar position="absolute">
      <Toolbar>
        <IconButton edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h4">Notes 検索モード</AppTitle>
        <Tooltip title={<Typography>ホームに戻る</Typography>}>
          <IconButton onClick={backHome}>
            <HomeIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title={<Typography>ログアウト</Typography>}>
          <IconButton onClick={onLogout}>
            <ExitToApp fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </StyledAppBar>
  );
};

export default SearchNotesAppBar;