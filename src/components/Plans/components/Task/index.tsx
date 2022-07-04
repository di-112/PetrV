import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box, Checkbox, Divider, Flex, Input, Link, Text,
} from '@chakra-ui/react';
import { ITasks } from '../../../../taskManagers/types';

interface ITaskComponent {
  task: ITasks,
  tasks: object[],
  index: number,
  total: number,
  setTasks: (arr: object[]) => void,
}

const Task :FC<ITaskComponent> = ({
  task,
  index,
  total,
  tasks,
  setTasks,
}) => (
  <Box
    key={task.id}
    marginBottom={5}
  >
    <Box marginY={5}>
      <Text isTruncated fontWeight={700}>{task.subject}</Text>
    </Box>
    <Flex width="100%" alignItems="center" marginBottom={5}>
      <Checkbox
        marginRight={5}
        isChecked={task.isChecked}
        onChange={() => {
          setTasks(tasks.map(item => ({
            ...item,
            isChecked: item.id === task.id ? !task.isChecked : item.isChecked,
          })))
        }}
      />
      -
      <Link paddingX={2} color="link.400" href="#" display="inline-block" textAlign="center">
        {task.id}
        .
        {task.tracker_name}
      </Link>
      -
      <Input
        onChange={event => {
          task.value = event.target.value
        }}
        flex="1 1 auto"
        w="auto"
        bg="white"
        color="black"
        size="sm"
        placeholder="(Продолжить выполнение)"
        marginLeft="24px"
      />
    </Flex>
    {index !== (total - 1) && <Divider />}
  </Box>
);

export default observer(Task);
