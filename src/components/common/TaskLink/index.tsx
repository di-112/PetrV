import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from '@chakra-ui/react';
import { useStore } from '../../../store/provider';
import { ITasks } from '../../../taskManagers/types';

interface ITaskLink {
  task: ITasks,
}

const TaskLink :FC<ITaskLink> = ({ task }) => {
  const { host } = useStore()

  return (
    <>
      {' -'}
      <Link
        paddingX={2}
        color="link.400"
        target="_blank"
        href={`${host}/issues/${task.id}`}
        display="inline-block"
        textAlign="center"
      >
        {task.id}
        .
        {task.tracker_name}
      </Link>
      {'- '}
    </>
  )
}

export default observer(TaskLink);
