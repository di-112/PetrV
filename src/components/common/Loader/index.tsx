import React from 'react';
import { Center, Spinner, Box } from '@chakra-ui/react';
import Header from '../../Header';

const Loader = () => (
  <Box flex="1 1 auto">
    <Header />
    <Center w="100%" h="100%" flex="1 1 auto">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  </Box>
);

export default Loader;
