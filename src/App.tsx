import React, { useEffect } from 'react';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Header from './components/Header';
import { useStore } from './store/provider';
import Plans from './components/Plans';
import Tasks from './components/Tasks';
import Settings from './components/Settings';
import Summary from './components/Summary';
import Login from './components/Login';

const App = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { isAuth, isAllSettings } = useStore()

  useEffect(() => {
    if (!isAuth && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [location.pathname])

  useEffect(() => {
    if (isAuth && !isAllSettings) {
      navigate('/settings')
    }
  }, [location.pathname])

  return (
    <Flex direction="column" height="100%">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route index element={<Tasks />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Flex>
  )
};
export default App;
