import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.less'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { HashRouter } from 'react-router-dom';
import { StoreContext } from './store/provider';
import store from './store/store'
import { theme } from './theme';

const customTheme = extendTheme(theme)

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <StoreContext.Provider value={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </StoreContext.Provider>
  </ChakraProvider>,
  document.getElementById('root'),
)
