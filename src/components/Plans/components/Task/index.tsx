import React, { Dispatch, FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Checkbox, Divider, Flex, Text, Textarea,
} from '@chakra-ui/react';
import { ITasks } from '../../../../taskManagers/types';
import TaskLink from '../../../common/TaskLink';

interface ITaskComponent {
  task: ITasks,
  tasks: object[],
  index: number,
  total: number,
  setTasks: Dispatch<ITasks[]>,
}

const Task :FC<ITaskComponent> = ({
  task,
  index,
  total,
  tasks,
  setTasks,
}) => (
  <Box>
    <Flex marginBottom={5}>
      <Checkbox
        marginRight={5}
        isChecked={task.isChecked}
        onChange={() => {
          setTasks(tasks.map((item: ITasks) => ({
            ...item,
            isChecked: item.id === task.id
              ? !task.isChecked
              : !!item.isChecked,
          })))
        }}
      />
      <Text isTruncated>
        <TaskLink task={task} />
        {task.subject}
      </Text>
    </Flex>
    <Flex width="100%" alignItems="center" marginBottom={5}>
      <Textarea
        onChange={event => { task.value = event.target.value }}
        flex="1 1 auto"
        w="auto"
        py="5px"
        px="10px"
        minHeight="32px"
        maxHeight="200px"
        bg="white"
        color="black"
        size="sm"
        placeholder="(Продолжить выполнение)"
      />
    </Flex>
    {index !== (total - 1) && <Divider />}
  </Box>
);

export default observer(Task);
