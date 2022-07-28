import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, useColorMode } from '@chakra-ui/react';
import { useStore } from '../../../store/provider';
import Loader from '../Loader';

interface IContentWrapper {
  children: ReactNode,
  notBack?: boolean
}

const ContentWrapper:FC<IContentWrapper> = ({
  notBack = false,
  children,
}) => {
  const { colorMode } = useColorMode()

  const { isLoading } = useStore()

  const background = colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)'

  if (isLoading) return <Loader />

  return (
    <Box
      p={5}
      w="80%"
      height="calc(100vh - 250px)"
      margin="0 auto"
      overflowY="auto"
      borderRadius="5px"
      backgroundColor={notBack ? 'none' : background}
    >
      {children}
    </Box>
  )
};

export default observer(ContentWrapper);
