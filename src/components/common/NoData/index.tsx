import React, { FC } from 'react';
import { Center, Text } from '@chakra-ui/react';

const NoData :FC = () => (
  <Center height="100%">
    <Text fontWeight={700}>Нет данных</Text>
  </Center>
)

export default NoData;
