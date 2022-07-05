import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Center, Text } from '@chakra-ui/react';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import { ITasks } from '../../taskManagers/types';

const Summary = () => {
  const { token, me } = useStore()

  const [tasks, setTasks] = useState<ITasks[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      const client = new RedmineClient(token)
      if (me.id) {
        const data = await client.getTodayTimeEntries(me.id)
        console.log('data: ', data)
        if (data) {
          setTasks(data)
        }
      }
    }
    fetchPlans()
  }, [])

  return (
    <Box>
      <h1>Итоги</h1>
      <Box>
        {!tasks.length && (
          <Center
            fontWeight={700}
            fontSize={14}
            height="50px"
          >
            Кажется, ты сегодня не списывал время
          </Center>
        )}
        {tasks.map(task => (
          <Box key={task.id}>
            -
            {' '}
            <Text>
              {task.id}
              .
              {task.tracker_name}
            </Text>
            {' '}
            -
            {' '}
            {task.subject}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default observer(Summary);
