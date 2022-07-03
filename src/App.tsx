import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { StoreContext } from './store/provider';
import store from './store/store'
import Plans from './components/Plans';
import Tasks from './components/Tasks';

const customTheme = extendTheme({
  colors: {
    title: {
      800: '#45a28e',
      400: '#66fcf1',
      300: '#66fcf1',
      200: '#66fcf1',
    },
    text: {
      400: '#c5c6c7',
    },
    bg: {
      400: '#1f2833',
    },
    header: {
      400: '#0b0c10',
    },
  },
  styles: {
    global: {
      body: {
        fontSize: 14,
        bg: 'bg.400',
        color: 'white',
      },
      header: {
        h: '36px',
        py: 3,
        bg: 'header.400',
      },
      h1: {
        fontSize: 24,
        fontWeight: 700,
        color: 'title.400',
      },
      button: {
        px: 2,
        fontSize: 14,
        _hover: {
          background: 'none !important',
          color: 'title.400',
          boxShadow: 'none !important',
        },
        _active: {
          background: 'none !important',
          color: 'title.400',
          boxShadow: 'none !important',
        },
        _focus: {
          background: 'none !important',
          boxShadow: 'none !important',
        },
      },
      a: {
        color: 'title.400',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <StoreContext.Provider value={store}>
      <HashRouter>
        <Header />
        <Routes>
          <Route index element={<Tasks />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
      </HashRouter>
    </StoreContext.Provider>
  </ChakraProvider>
);

export default App;
