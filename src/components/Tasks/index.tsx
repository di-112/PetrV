import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, VStack } from '@chakra-ui/react';
import { useStore } from '../../store/provider';
import { ITasks } from '../../taskManagers/types';
import TaskLink from '../common/TaskLink';
import ContentWrapper from '../common/ContentWrapper';
import { getTasks } from '../../utils/getTasks';
import { useErrorToast } from '../../hooks/useErrorToast';

const Tasks = () => {
  const { me, setIsLoading } = useStore()

  const [tasks, setTasks] = useState<ITasks[]>([])

  const showError = useErrorToast()

  useEffect(() => {
    setIsLoading(true)

    const fetchPlans = async () => {
      const data = await getTasks(me?.taskTracker, me?.apiKey)
      if (data) {
        setTasks(data)
      }
    }

    fetchPlans()
      .catch(() => showError({ description: 'Не удалось получить задачи' }))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
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
    </>
  );
};

export default observer(Tasks);
