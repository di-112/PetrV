import React, { FC } from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom'

interface IMenuItem {
  title: string,
  path: string,
  onClose: () => void
}

const MenuItem: FC<IMenuItem> = ({
  title,
  path,
  onClose,
}) => {
  const navigate = useNavigate()

  const location = useLocation()

  const onClick = () => {
    navigate(path)
    onClose()
  }

  const { colorMode } = useColorMode()

  const isActive = location.pathname === path

  const activeColor = colorMode === 'dark' ? 'main.400' : 'main.800'
  const color = colorMode === 'dark' ? 'white' : 'black'

  return (
    <Box>
      <Button
        fontSize={14}
        onClick={onClick}
        variant="unstyled"
        color={isActive ? activeColor : color}
        textShadow={(!isActive || colorMode === 'dark') ? 'none' : '-1px 1px 0 #000, '
          + '1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000'}
      >
        {title}
      </Button>
    </Box>

  );
};

export default observer(MenuItem);
