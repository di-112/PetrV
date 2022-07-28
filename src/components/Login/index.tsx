import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Button, Center, Flex, Input, Text, useColorMode, VStack,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../common/ContentWrapper';
import { auth } from '../../firebase';
import { useStore } from '../../store/provider';
import { api } from '../../api/api';
import { useErrorToast } from '../../hooks/useErrorToast';
import Loader from '../common/Loader';

const Login = () => {
  const [login, setLogin] = useState(null)
  const [pass, setPass] = useState(null)

  const showError = useErrorToast()

  const [isCreate, setIsCreate] = useState(false)

  const { colorMode } = useColorMode()

  const navigate = useNavigate()

  const { setMe, setIsLoading, isLoading } = useStore()

  const onSubmit = async data => {
    setIsLoading(true)

    try {
      if (isCreate) {
        const reg = await createUserWithEmailAndPassword(auth, data.login, data.pass)
        await api.addUser({
          token: reg.user?.uid,
        })

        return
      }

      const sign = await signInWithEmailAndPassword(auth, data.login, data.pass)

      const token = sign.user?.uid

      if (token) {
        let user = await api.getUser(token)

        if (!user.token) {
          const res = await api.addUser({ token })

          if (res.success) {
            user = await api.getUser(token)
          }
        }

        if (user.token) {
          const me = {
            ...user,
            email: sign.user.email,
          }

          setMe(me)

          localStorage.setItem('user', JSON.stringify({ login: data.login, pass: data.pass }))

          navigate('/')
        }

        return
      }

      throw new Error('User not found')
    } catch (e) {
      showError({ description: e.message })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const signIn = async () => {
      const saved = localStorage.getItem('user')

      if (saved) {
        const savedData = JSON.parse(saved)
        await onSubmit({ login: savedData.login, pass: savedData.pass })
      }
    }

    signIn()
  }, [])

  if (isLoading) {
    return <Loader />
  }

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
                onClick={() => onSubmit({ login, pass })}
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
