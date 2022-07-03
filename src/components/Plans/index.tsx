import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Textarea } from '@chakra-ui/react';
import styles from './style.less'
import { useStore } from '../../store/provider';
import RedmineClient from '../../taskManagers/RedmineClient';
import { ITasks } from '../../taskManagers/types';

const Plans = () => {
  const { token } = useStore()

  const [value, setValue] = useState('')

  useEffect(() => {
    const fetchPlans = async () => {
      const client = new RedmineClient(token)
      const data = await client.getIssuesForPlan()
      if (data) {
        setValue(data.map(task => `-${task.id}.${task.tracker_name} - (Продолжить выполнение)`).join('\r\n\n'))
      }
    }
    fetchPlans()
  }, [])

  return (
    <div>
      <h1>План</h1>
      <Textarea
        className={styles.textarea}
        height={250}
        value={value}
        onChange={event => {
          setValue(event.value)
        }}
      />
    </div>
  );
};

export default observer(Plans);
