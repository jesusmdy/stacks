'use client';

import { Box, Stack, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TaskInterface } from '../../../store/task';
import _ from 'lodash';
import { useGetStatusByID } from '../../../store/status';
import { StatusFieldAction } from '../../TaskItem/StatusLabel';

const TaskDetails: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  const status = useGetStatusByID(task.statusId);

  const dateFormatter = (date: Date) => {
    return new Date(date).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const details = useMemo(
    () => (
      [
        {
          title: 'Status',
          value: <StatusFieldAction task={task} noButton />
        },
        {
          title: 'Due date',
          value: dateFormatter(task.dueDate)
        },
        {
          title: 'Date created',
          value: dateFormatter(task.dateCreated)
        }
      ]
    ),
    [task, status]
  )
  return (
    <Box>
      <Stack gap={2}>
        <Text fontSize="lg" fontWeight="bold">{task.title}</Text>
        <Text fontSize="sm">
          {
            task.description
              ? task.description
              : 'No description'
          }
        </Text>
      </Stack>
      <Stack direction="column" mt={4} gap={2}>
        {
          _.map(
            details,
            ({ title, value }) => (
              <Stack direction="row" key={title} fontSize="xs">
                <Text width="20%">{title}</Text>
                <Text as="div">{value}</Text>
              </Stack>
            )
          )
        }
      </Stack>
    </Box>
  )
};

export default TaskDetails;