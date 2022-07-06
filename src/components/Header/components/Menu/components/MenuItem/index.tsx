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

  const activeColor = colorMode === 'dark' ? 'main.400' : 'green.400'
  const color = colorMode === 'dark' ? 'white' : 'black'

  return (
    <Box>
      <Button
        fontSize={14}
        onClick={onClick}
        variant="unstyled"
        color={isActive ? activeColor : color}
      >
        {title}
      </Button>
    </Box>

  );
};

export default observer(MenuItem);
