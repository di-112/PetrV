import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom'
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';

const Header = () => {
  const { token, me, setMe } = useStore()

  const navigate = useNavigate()

  const location = useLocation()

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Flex
      position="absolute"
      left={0}
      px={10}
      as="header"
      top="0"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      paddingLeft={5}
    >
      <IconButton
        variant="ghost"
        w={2}
        minWidth={1}
        h={2}
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
        aria-label="menu"
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        closeOnOverlayClick
        closeOnEsc
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent background="bg.400">
          <DrawerHeader fontSize={14} display="flex" alignItems="center">Меню</DrawerHeader>
          <DrawerBody>
            <Box>
              <Button
                onClick={() => {
                  navigate('/')
                  onClose()
                }}
                variant="unstyled"
                color={location.pathname === '/'
                  ? 'title.400'
                  : 'white'}
              >
                Задачи
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() => {
                  navigate('/plans')
                  onClose()
                }}
                variant="unstyled"
                color={location.pathname === '/plans'
                  ? 'title.400'
                  : 'white'}
              >
                Планы
              </Button>
            </Box>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
      <Box color="title.400" fontWeight={700}>
        {me?.login}
      </Box>
      <IconButton
        aria-label="test"
        icon={<SmallCloseIcon />}
        onClick={() => electron.close()}
      />
      <Box />
    </Flex>
  );
};

export default observer(Header);
