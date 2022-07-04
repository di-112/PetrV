import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Link } from '@chakra-ui/react';
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import { ITasks } from '../../taskManagers/types';
import Task from './components/Task';
import styles from '../Tasks/style.less';

interface ITask extends ITasks {
  isChecked: boolean,
  value: string
}

const Plans = () => {
  const { token } = useStore()

  const [tasks, setTasks] = useState<ITask[]>([])

  const [isEdit, setIsEdit] = useState(true)

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

  const ids = tasks.map(item => item?.id)

  console.log('tasks: ', tasks)

  const confirm = () => {
    setIsEdit(false)
  }

  return (
    <Box>
      <h1>План</h1>
      {isEdit && (
        <Box
          w="80%"
          margin="0 auto"
          maxH="70vh"
          overflowY="auto"
        >
            {tasks.map((task, index) => (
              <Task
                ids={ids}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                total={tasks.length}
                index={index}
                key={task.id}
              />
            ))}
          <Button
            color="black"
            bg="title.400"
            position="absolute"
            right="5%"
            bottom="5%"
            onClick={confirm}
          >
            Сформировать
          </Button>
        </Box>
      )}
      {
        !isEdit && (
        <Box>
          {tasks.filter(task => task.isChecked).map(task => (
            <div key={task.id} className={styles.task}>
              -
              {' '}
              <Link color="link.400" className={styles.name}>
                {task.id}
                .
                {task.tracker_name}
              </Link>
              {' '}
              -
              {' '}
              {task.value}
            </div>
          ))}
        </Box>
        )
      }
    </Box>
  );
};

export default observer(Plans);
