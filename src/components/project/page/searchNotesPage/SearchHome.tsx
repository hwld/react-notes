import React, { useState } from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import { SearchColumn } from './SearchColumn';
import { ResultNotesColumn } from './ResultNotesColumn';
import { Drawer } from '../../../ui/Drawer/Drawer';
import { SearchNotesCriteria } from '../../../../services/notes';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { useOpener } from '../../../../util/hooks/useOpener';
import { AppHeader } from '../../ui/AppHeader';
import { IconButton } from '../../../ui/IconButton';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  const { isOpen, open, close, invert } = useOpener(true);
  const [searchCriteria, setSearchCriteria] = useState<SearchNotesCriteria>({
    categoryId: '',
    title: '',
    text: '',
  });
  const { isMobile } = useAppStateContext();
  const history = useHistory();

  const backHome = () => {
    history.replace('/home');
  };

  return (
    <div className={className} data-testid="searchNotestPage">
      <AppHeader title="検索" onMenuClick={invert}>
        <IconButton tooltipText="ホームに戻る" onClick={backHome}>
          <HomeIcon />
        </IconButton>
      </AppHeader>

      <Drawer
        width={isMobile ? '80' : '30'}
        isPresistent={!isMobile}
        open={isOpen}
        onOpen={open}
        onClose={close}
      >
        <SearchColumn setCriteria={setSearchCriteria} />
      </Drawer>
      <ResultNotesColumn searchCriteria={searchCriteria} />
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};

  /* props => props... の ">" がstylelintに引っかかる */
  /* stylelint-disable-next-line selector-combinator-space-before */
  ${props => props.theme.breakpoints.down('xs')} {
    display: block;
  }
`;

export const SearchHome = StyledComponent;
