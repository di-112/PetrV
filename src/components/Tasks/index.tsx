import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import { ITasks } from '../../taskManagers/types';
import TaskLink from '../common/TaskLink';
import ContentWrapper from '../common/ContentWrapper';

const Tasks = () => {
  const { token } = useStore()

  const [tasks, setTasks] = useState<ITasks[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      const client = new RedmineClient(token)
      const data = await client.getIssuesForPlan()
      if (data) {
        setTasks(data)
      }
    }
    fetchPlans()
  }, [])

  return (
    <Box>
      <h1>Задачи</h1>
      <ContentWrapper>
        <VStack
          spacing={5}
          align="stretch"
        >
          {tasks.map(task => (
            <Box key={task.id} lineHeight="22px" fontWeight={700}>
              <TaskLink task={task} />
              {task.subject}
            </Box>
          ))}
        </VStack>
      </ContentWrapper>
    </Box>
  );
};

export default observer(Tasks);
