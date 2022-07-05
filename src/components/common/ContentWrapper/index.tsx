import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@chakra-ui/react';

interface IContentWrapper {
  children: ReactNode,
  notBack?: boolean
}

const ContentWrapper:FC<IContentWrapper> = ({
  notBack = false,
  children,
}) => (
  <Box
    p={5}
    w="80%"
    maxH="70vh"
    margin="0 auto"
    overflowY="auto"
    borderRadius="5px"
    backgroundColor={notBack ? 'none' : 'rgba(255,255,255,0.2)'}
  >
    {children}
  </Box>
);

export default observer(ContentWrapper);
