import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle, Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import { api } from '../../api/api';
import { useStore } from '../../store/provider';
import { useSuccessToast } from '../../hooks/useSuccessToast';

const Settings = () => {
  const { me, setMe, isAllSettings } = useStore()

  const [taskTracker, setTaskTracker] = useState(me?.taskTracker || 'Redmine')
  const [apiKey, setApiKey] = useState(me?.apiKey)

  const showSuccess = useSuccessToast()

  const save = async () => {
    const user = await api.updateUser({
      ...me,
      apiKey,
      taskTracker,
    })

    if (user) {
      setMe({
        ...me,
        ...user,
      })
      showSuccess({ title: 'Сохранено' })
    }
  }

  return (
    <div>
      <h1>Настройки</h1>
      {!isAllSettings && (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Недостаточно данных</AlertTitle>
        <AlertDescription>Необходимо указать TaskTracker и ApiKey для этого трекера</AlertDescription>
      </Alert>
      )}
      <SimpleGrid columns={1} spacing={5} width="500px" p={5}>
        <FormControl display="flex" alignItems="center">
          <FormLabel
            margin={0}
            fontWeight={700}
            width={150}
            htmlFor="tracker"
          >
            Task-трекер:
            {' '}
          </FormLabel>
          <Select
            fontSize={12}
            id="tracker"
            onChange={event => {
              setTaskTracker(event.target.value)
            }}
            value={taskTracker}
          >
            <option value="Redmine">Redmine</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel
            margin={0}
            fontWeight={700}
            width={150}
            htmlFor="token"
          >
            Токен:
            {' '}
          </FormLabel>
          <Input
            fontSize={12}
            onChange={event => {
              setApiKey(event.target.value)
            }}
            value={apiKey}
          />
        </FormControl>
      </SimpleGrid>
      <Button
        position="absolute"
        right="5%"
        bottom="5%"
        onClick={save}
      >
        Сохранить
      </Button>
    </div>
  )
}

export default observer(Settings);
