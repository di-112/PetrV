import React, { useEffect, useRef } from 'react';
import {
  Flex, IconButton, Text, useColorMode, useDisclosure,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
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
        bg="none !important"
        borderWidth={0}
        onClick={onOpen}
        aria-label="menu"
        color={colorMode === 'dark' ? 'main.400' : 'green.400'}
        icon={<HamburgerIcon />}
      />
      <Flex alignItems="center">
        <Text color={colorMode === 'dark' ? 'main.400' : 'green.400'} fontWeight={700}>
          {me?.login}
        </Text>
        <IconButton
          height="24px"
          width="24px"
          bg="none !important"
          variant="unstyled"
          color={colorMode === 'dark' ? 'main.400' : 'green.400'}
          minWidth={0}
          marginLeft={3}
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label="colorMode"
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
