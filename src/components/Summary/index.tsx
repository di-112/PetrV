import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Center, VStack } from '@chakra-ui/react';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import { ITasks, ITimeEntry } from '../../taskManagers/types';
import TaskLink from '../common/TaskLink';

interface ISummary extends ITasks, ITimeEntry {}

const Summary = () => {
  const { token, me } = useStore()

  const [tasks, setTasks] = useState<ISummary[]>([])

  useEffect(() => {
    const fetchSummary = async () => {
      const client = new RedmineClient(token)
      if (me.id) {
        const data = await client.getTodayTimeEntries(me.id)

        const res = await client.getIssuesByMultipleId(data.map(item => item.issue_id).join(','))

        console.log('test: ', res.map(item => ({
          ...item,
          ...data.find(row => row.issue_id === item.id),
        })))

        setTasks(res.map(item => ({
          ...item,
          ...data.find(row => row.issue_id === item.id),
        })))
      }
    }
    fetchSummary()
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
        <VStack
          spacing={5}
          align="stretch"
        >
          {tasks.map(task => (
            <Box key={task.id}>
              <TaskLink task={task} />
              {`${task.comment}(${task.hours}ч.)`}
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default observer(Summary);
