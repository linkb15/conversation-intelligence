import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Proxima Nova;
    src: local('./assets/fonts/ProximaNova Regular.otf') format("opentype");
  }
  @font-face {
    font-family: Proxima Nova;
    font-weight: 500;
    src: local('./assets/fonts/ProximaNova Medium.ttf') format("truetype");
  }
  @font-face {
    font-family: Proxima Nova;
    font-weight: 600;
    src: local('./assets/fonts/ProximaNova SemiBold.otf') format("opentype");
  }
  @font-face {
    font-family: Proxima Nova;
    font-weight: 700;
    src: local('./assets/fonts/ProximaNova Bold.otf') format("opentype");
  }
  body {
    font-family: Proxima Nova, sans-serif;
    margin:0;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    line-height: 1.4;
    }
`;

const store = configureStore();
const theme = store.getState().theme;
console.log(theme);
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
