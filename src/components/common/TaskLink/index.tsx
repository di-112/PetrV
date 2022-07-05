import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useColorMode } from '@chakra-ui/react';
import { useStore } from '../../../store/provider';
import { ITasks } from '../../../taskManagers/types';

interface ITaskLink {
  task: ITasks,
}

const TaskLink :FC<ITaskLink> = ({ task }) => {
  const { host } = useStore()
  const { colorMode } = useColorMode()

  return (
    <>
      {' -'}
      <Link
        paddingX={2}
        color={colorMode === 'dark' ? 'main.400' : 'main.800'}
        textShadow={colorMode === 'dark' ? 'none' : '-1px 1px 0 #000, '
          + '1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000'}
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
