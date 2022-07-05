import React, { useEffect, useRef } from 'react';
import {
  Text, Flex, IconButton, useDisclosure,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import Menu from './components/Menu';

const Header = () => {
  const { token, me, setMe } = useStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      px={10}
      paddingLeft={5}
      justifyContent="space-between"
      alignItems="center"
    >
      <IconButton
        h={2}
        w={2}
        ref={burger}
        minWidth={1}
        variant="ghost"
        onClick={onOpen}
        aria-label="menu"
        icon={<HamburgerIcon />}
      />
      <Text color="main.400" fontWeight={700}>
        {me?.login}
      </Text>
      <Menu
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default observer(Header);
