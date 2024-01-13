/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Box, Stack, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TaskInterface } from '../../../store/task';
import _ from 'lodash';
import { useGetStatusByID } from '../../../store/status';
import { StatusFieldAction } from '../../TaskItem/StatusLabel';
import { PriorityLabelAction } from '../../TaskItem/PriorityLabel';
import TaskDescriptionFields from './Description';
import TaskNotes from './Notes';
import ProgressCard from './Progress';

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
          title: 'Priority',
          value: <PriorityLabelAction task={task} noButton />
        },
        {
          title: 'Due date',
          value: task.dueDate ? dateFormatter(task.dueDate) : 'No due date'
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
      <TaskDescriptionFields task={task} />
      <Stack direction="column" my={4} gap={2}>
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
      <ProgressCard task={task} />
      <TaskNotes task={task} />
    </Box>
  )
};

export default TaskDetails;