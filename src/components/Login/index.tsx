import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Button, Center, Input, Text, VStack, Flex, useColorMode,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import ContentWrapper from '../common/ContentWrapper';
import { auth } from '../../firebase';

const Tasks = () => {
  const [login, setLogin] = useState(null)
  const [pass, setPass] = useState(null)

  const [isCreate, setIsCreate] = useState(false)

  const { colorMode } = useColorMode()

  const onSubmit = async () => {
    if (isCreate) {
      try {
        const reg = await createUserWithEmailAndPassword(auth, login, pass)
      } catch (e) {
        console.error(e)
      }

      return
    }
    try {
      const sign = await signInWithEmailAndPassword(auth, login, pass)

      const data = await axios.get('http://localhost:5500/users', {
        params: {
          token: sign.user.accessToken,
        },
      })

      console.log('data: ', data)
      console.log('sign: ', sign)
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <Box>
      <h1>{isCreate ? 'Создать' : 'Войти'}</h1>
      <ContentWrapper>
        <Center width="100%" height="100%">
          <VStack
            width="50%"
            spacing={5}
            align="stretch"
          >
            <Input
              placeholder="Email"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
            <Input
              placeholder="Password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              type="password"
            />
            <Flex alignItems="center">
              <Button
                width={150}
                onClick={onSubmit}
              >
                {isCreate ? 'Создать' : 'Войти'}
              </Button>
              <Text marginX={2}>
                или
              </Text>
              <Button
                variant="unstyled"
                textDecoration="underline"
                _hover={{
                  color: colorMode === 'dark' ? 'main.400' : 'green.400',
                }}
                onClick={() => { setIsCreate(old => !old) }}
              >
                {isCreate ? 'войти' : 'создать'}
              </Button>
            </Flex>
          </VStack>
        </Center>
      </ContentWrapper>
    </Box>
  );
};

export default observer(Tasks);
