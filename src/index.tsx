import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { appTheme } from './theme/appTheme';
import * as serviceWorker from './serviceWorker';
import { App } from './App';

ReactDOM.render(
  <StylesProvider injectFirst>
    <MaterialThemeProvider theme={appTheme}>
      <StyledThemeProvider theme={appTheme}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </StyledThemeProvider>
    </MaterialThemeProvider>
  </StylesProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
