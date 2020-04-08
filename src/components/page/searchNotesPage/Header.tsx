import React from 'components/page/searchNotesPage/node_modules/react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from 'components/page/searchNotesPage/node_modules/@material-ui/core';
import HomeIcon from 'components/page/searchNotesPage/node_modules/@material-ui/icons/Home';
import MenuIcon from 'components/page/searchNotesPage/node_modules/@material-ui/icons/Menu';
import ExitToApp from 'components/page/searchNotesPage/node_modules/@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useHistory } from 'components/page/searchNotesPage/node_modules/react-router-dom';
import { logout } from 'services/auth';

interface HeaderProps {
  onMenuClick: () => void;
}

const TopLayerHeader = styled(MuiAppBar)`
  background-color: ${props => props.theme.palette.secondary.light};
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

  const backHome = () => {
    history.replace('/home');
  };

  return (
    <TopLayerHeader position="absolute">
      <Toolbar>
        <IconButton edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h4">検索モード</AppTitle>
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
    </TopLayerHeader>
  );
};

export default Header;
