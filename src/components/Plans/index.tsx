import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Button, Text, useColorMode, VStack,
} from '@chakra-ui/react';
import moment from 'moment';

import { useStore } from '../../store/provider';
import { ITasks } from '../../taskManagers/types';
import Task from './components/Task';
import TaskLink from '../common/TaskLink';
import ContentWrapper from '../common/ContentWrapper';
import NoData from '../common/NoData';
import { useErrorToast } from '../../hooks/useErrorToast';
import { getPlans } from '../../utils/getPlans';
import { useSuccessToast } from '../../hooks/useSuccessToast';

const selectText = (node: HTMLBaseElement) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();
}

const Plans:FC = () => {
  const { me, setIsLoading } = useStore()

  const [tasks, setTasks] = useState<ITasks[]>([])

  const [isEdit, setIsEdit] = useState(true)

  const { colorMode } = useColorMode()

  const showSuccess = useSuccessToast()

  const showError = useErrorToast()

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true)
      const data = await getPlans(me.taskTracker, me.apiKey)
      if (data) {
        setTasks(data.map(item => ({
          ...item,
          isChecked: false,
          value: 'Продолжить выполнение',
        })))
      }
    }
    fetchPlans()
      .catch(() => showError({ description: 'Не удалось получить задачи' }))
      .finally(() => setIsLoading(false))
  }, [])

  const confirm = () => {
    setIsEdit(false)
  }

  const planRef = useRef()

  const copy = () => {
    selectText(planRef.current)
    showSuccess({ title: 'Скопировано' })
  }

  return (
    <Box>
      <h1>План</h1>
      {isEdit && (
      <ContentWrapper>
        <VStack
          spacing={5}
          align="stretch"
          height="100%"
        >
          {tasks.length
            ? tasks.map((task, index) => (
              <Task
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                total={tasks.length}
                index={index}
                key={task.id}
              />
            ))
            : <NoData />}
        </VStack>
        <Button
          position="absolute"
          right="5%"
          bottom="5%"
          onClick={confirm}
        >
          Сформировать
        </Button>
      </ContentWrapper>
      )}
      {
        !isEdit && (
        <ContentWrapper>
          <Box ref={planRef}>
            <Box fontWeight={700} marginBottom={5}>
              <Text
                as="span"
                color={colorMode === 'dark' ? 'main.400' : 'main.800'}
              >
                #план
              </Text>
              <Text as="span">{` на ${moment().format('DD.MM.YYYY')}`}</Text>
            </Box>
            <VStack
              spacing={5}
              align="stretch"
            >
              {tasks.filter(task => task.isChecked).map(task => (
                <Box key={task.id}>
                  <TaskLink task={task} />
                  {task.value}
                </Box>
              ))}
            </VStack>
          </Box>
          <Button
            position="absolute"
            left="5%"
            bottom="5%"
            onClick={() => { setIsEdit(true) }}
          >
            Назад
          </Button>
          <Button
            position="absolute"
            right="5%"
            bottom="5%"
            onClick={copy}
          >
            Копировать
          </Button>
        </ContentWrapper>
        )
      }
    </Box>
  );
};

export default observer(Plans);
