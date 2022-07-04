import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormControl, FormLabel, Input, Select, SimpleGrid,
} from '@chakra-ui/react';
import { useStore } from '../../store/provider';

const Settings = () => {
  const { token } = useStore()

  return (
    <div>
      <h1>Настройки</h1>
      <SimpleGrid columns={1} spacing={5} width="500px" p={5}>
        <FormControl display="flex" alignItems="center">
          <FormLabel width={150} htmlFor="tracker">Task-трекер: </FormLabel>
          <Select fontSize={12} id="tracker" placeholder="Redmine" />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel width={150} htmlFor="token">Токен: </FormLabel>
          <Input fontSize={12} defaultValue={token} />
        </FormControl>
      </SimpleGrid>
    </div>
  )
}

export default observer(Settings);
