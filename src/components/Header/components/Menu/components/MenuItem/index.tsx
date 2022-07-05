import React, { FC } from 'react';
import { Box, Button } from '@chakra-ui/react'
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

  const isActive = location.pathname === path

  return (
    <Box>
      <Button
        fontSize={14}
        onClick={onClick}
        variant="unstyled"
        color={isActive ? 'main.400' : 'white'}
      >
        {title}
      </Button>
    </Box>

  );
};

export default observer(MenuItem);
