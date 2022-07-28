import React, { FC } from 'react';
import {
  Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useColorMode,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import MenuItem from './components/MenuItem';

const MenuConfig = [
  { path: '/', title: 'Задачи' },
  { path: '/plans', title: 'Планы' },
  { path: '/summary', title: 'Итоги' },
  { path: '/settings', title: 'Настройки' },
]

interface IMenu {
  isOpen: boolean,
  onClose: () => void
}

const Menu: FC<IMenu> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate()

  const { colorMode } = useColorMode()

  electron.on('tasks', () => { navigate('/') })
  electron.on('plans', () => { navigate('/plans') })
  electron.on('settings', () => { navigate('/settings') })
  electron.on('summary', () => { navigate('/summary') })

  const btnRef = React.useRef()

  return (
    <Drawer
      closeOnEsc
      closeOnOverlayClick
      finalFocusRef={btnRef}
      onClose={onClose}
      isOpen={isOpen}
      placement="left"
    >
      <DrawerOverlay />
      <DrawerContent background={colorMode === 'dark' ? 'back.400' : 'back.800'}>
        <DrawerHeader
          fontSize={14}
          display="flex"
          alignItems="center"
          color={colorMode === 'dark' ? 'main.400' : 'green.400'}
        >
          Меню
        </DrawerHeader>
        <DrawerBody>
          {MenuConfig.map(({ title, path }) => (
            <MenuItem
              key={title}
              path={path}
              onClose={onClose}
              title={title}
            />
          ))}
        </DrawerBody>

      </DrawerContent>
    </Drawer>
  );
};

export default observer(Menu);
