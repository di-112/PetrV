import React from 'react';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { StoreContext } from './store/provider';
import store from './store/store'
import Plans from './components/Plans';
import Tasks from './components/Tasks';
import Settings from './components/Settings';
import Summary from './components/Summary';
import { theme } from './theme';

const customTheme = extendTheme(theme)

const App = () => (
  <ChakraProvider theme={customTheme}>
    <StoreContext.Provider value={store}>
      <HashRouter>
        <Header />
        <Routes>
          <Route index element={<Tasks />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </HashRouter>
    </StoreContext.Provider>
  </ChakraProvider>
);

export default App;
