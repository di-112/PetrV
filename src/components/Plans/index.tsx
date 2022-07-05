import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Button, Text, useColorMode, VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import { ITasks } from '../../taskManagers/types';
import Task from './components/Task';
import TaskLink from '../common/TaskLink';
import ContentWrapper from '../common/ContentWrapper';

const selectText = (node: HTMLBaseElement) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  setTimeout(() => { selection.removeAllRanges(); }, 1000)
}

const Plans:FC = () => {
  const { token } = useStore()

  const [tasks, setTasks] = useState<ITasks[]>([])

  const [isEdit, setIsEdit] = useState(true)

  const [isCoped, setIsCoped] = useState(false)

  const { colorMode } = useColorMode()

  useEffect(() => {
    const fetchPlans = async () => {
      const client = new RedmineClient(token)
      const data = await client.getIssuesForPlan()
      if (data) {
        setTasks(data.map(item => ({
          ...item,
          isChecked: false,
          value: 'Продолжить выполнение',
        })))
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
    setTimeout(() => { setIsCoped(false) }, 1000)
  }

  return (
    <Box>
      <h1>План</h1>
      {isEdit && (
      <ContentWrapper>
        <VStack
          spacing={5}
          align="stretch"
        >
          {tasks.map((task, index) => (
            <Task
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              total={tasks.length}
              index={index}
              key={task.id}
            />
          ))}
        </VStack>
        <Button
          color="black"
          position="absolute"
          background={colorMode === 'dark' ? 'main.400' : 'main.800'}
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
                textShadow={colorMode === 'dark' ? 'none' : '-1px 1px 0 #000, '
                  + '1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000'}
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
            color="black"
            bg="main.400"
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
