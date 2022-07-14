import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Button, Text, useColorMode, VStack,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';

import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import { ITasks } from '../../taskManagers/types';
import Task from './components/Task';
import TaskLink from '../common/TaskLink';
import ContentWrapper from '../common/ContentWrapper';
import NoData from '../common/NoData';

const selectText = (node: HTMLBaseElement) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  setTimeout(() => { selection.removeAllRanges(); }, 500)
}

const Plans:FC = () => {
  const { token } = useStore()

  const [tasks, setTasks] = useState<ITasks[]>([])

  const [isEdit, setIsEdit] = useState(true)

  const [isCoped, setIsCoped] = useState(false)

  const { colorMode } = useColorMode()

  const toast = useToast()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const client = new RedmineClient(token)
        const data = await client.getIssuesForPlan()
        if (data) {
          setTasks(data.map(item => ({
            ...item,
            isChecked: false,
            value: 'Продолжить выполнение',
          })))
        }
      } catch (e) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось получить задачи',
          status: 'error',
          duration: 9000,
          position: 'top-right',
          isClosable: true,
        })
      }
    }
    fetchPlans()
  }, [])

  const confirm = () => {
    setIsEdit(false)
  }

  const planRef = useRef()

  const copy = () => {
    setIsCoped(true)
    selectText(planRef.current)
    document.execCommand('copy');
    setTimeout(() => { setIsCoped(false) }, 500)
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
          {tasks.length ? tasks.map((task, index) => (
            <Task
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              total={tasks.length}
              index={index}
              key={task.id}
            />
          )) : <NoData />}
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
            {isCoped ? 'Скопировано' : 'Копировать'}
          </Button>
        </ContentWrapper>
        )
      }
    </Box>
  );
};

export default observer(Plans);
