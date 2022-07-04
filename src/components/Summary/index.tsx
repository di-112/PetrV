import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Center } from '@chakra-ui/react';
import styles from './style.less'
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
    <div>
      <h1>Итоги</h1>
      <div className={styles.tasks}>
        {!tasks.length && <Center height="50px">Кажется, ты сегодня не списывал время</Center>}
        {tasks.map(task => (
          <div key={task.id} className={styles.task}>
            -
            {' '}
            <span className={styles.name}>
              {task.id}
              .
              {task.tracker_name}
            </span>
            {' '}
            -
            {' '}
            {task.subject}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Summary);
