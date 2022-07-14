import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Button, Center, Input, Text, VStack, Flex, useColorMode, useToast,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../common/ContentWrapper';
import { auth } from '../../firebase';
import { useStore } from '../../store/provider';

const Login = () => {
  const [login, setLogin] = useState(null)
  const [pass, setPass] = useState(null)

  const toast = useToast()

  const [isCreate, setIsCreate] = useState(false)

  const { colorMode } = useColorMode()

  const navigate = useNavigate()

  const { setAuth } = useStore()

  const onSubmit = async () => {
    if (isCreate) {
      try {
        const reg = await createUserWithEmailAndPassword(auth, login, pass)
      } catch (e) {
        console.log('e: ', e)
        toast({
          title: 'Ошибка',
          description: 'Не удалось получить задачи',
          status: 'error',
          duration: 9000,
          position: 'top-right',
          isClosable: true,
        })
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

      setAuth(true)

      navigate('/')
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 9000,
        position: 'top-right',
        isClosable: true,
      })
    }
  };

  return (
    <Box>
      <h1>{isCreate ? 'Создать' : 'Войти'}</h1>
      <ContentWrapper notBack>
        <Center width="100%" height="100%">
          <VStack
            width="50%"
            maxWidth={500}
            spacing={7}
            align="stretch"
          >
            <Input
              placeholder="Email"
              value={login}
              autoComplete="on"
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

export default observer(Login);
