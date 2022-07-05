import React, { useEffect, useRef } from 'react';
import {
  Text, Flex, IconButton, useDisclosure, useColorMode, Box,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite';
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import Menu from './components/Menu';

const Header = () => {
  const { token, me, setMe } = useStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    const fetchMe = async () => {
      const client = new RedmineClient(token)
      const data = await client.getMe()
      if (data) {
        setMe(data)
      }
    }
    fetchMe()
  }, [])

  const burger = useRef()

  return (
    <Flex
      as="header"
      position="absolute"
      left={0}
      top="0"
      w="100%"
      px={5}
      justifyContent="space-between"
      alignItems="center"
    >
      <IconButton
        h={2}
        w={2}
        ref={burger}
        minWidth={1}
        variant="ghost"
        background="none !important"
        onClick={onOpen}
        aria-label="menu"
        color={colorMode === 'dark' ? 'main.400' : 'main.800'}
        icon={<HamburgerIcon />}
      />
      <Flex alignItems="center">
        <Text color={colorMode === 'dark' ? 'main.400' : 'main.800'} fontWeight={700}>
          {me?.login}
        </Text>
        <IconButton
          height="24px"
          width="24px"
          background="none !important"
          color={colorMode === 'dark' ? 'main.400' : 'main.800'}
          minWidth={0}
          marginLeft={3}
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
      </Flex>
      <Menu
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default observer(Header);
