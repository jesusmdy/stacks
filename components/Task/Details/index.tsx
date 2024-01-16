/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Box, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TaskInterface, useGetTaskByID } from '../../../store/task';
import _ from 'lodash';
import { useGetStatusByID } from '../../../store/status';
import { StatusFieldAction } from '../../TaskItem/StatusLabel';
import { PriorityLabelAction } from '../../TaskItem/PriorityLabel';
import TaskDescriptionFields from './Description';
import ProgressCard from './Progress';
import TaskChildren from './Children';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import TaskNotes from '../../Notes';
import StatusActionButton from '../../TaskItem/StatusAction';

const TaskDetails: FC<{
  task: TaskInterface;
  asColumn?: boolean;
}> = ({ task, asColumn }) => {
  const status = useGetStatusByID(task.statusId);

  const dateFormatter = (date: Date) => {
    return new Date(date).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const details = useMemo(
    () => (
      [
        {
          title: 'Status',
          value: <StatusActionButton task={task} withLabel />
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
  );

  const parentTask = useGetTaskByID(task.parentId as string);

  return (
    <Flex
      direction={asColumn ? 'column' : 'row'}
    >
      <Box width={asColumn ? '100%' : { sm: '100%', md: '70%' }}>
        {
          parentTask && (
            <Button
              as={Link}
              href={`/projects/${parentTask.projectId}/task/${parentTask.id}`}
              mb={4}
            >
              <Icon as={ArrowBackIcon} width={15} height={15} mr={2} />
              <Text fontSize="xs" fontWeight="bold">{parentTask.title}</Text>
            </Button>
          )
        }
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
        <TaskChildren task={task} />
      </Box>
      <Box
        width={asColumn ? '100%' : { sm: '100%', md: '30%' }}
        mt={asColumn ? 4 : 0}
      >
        <TaskNotes parent={task.id} />
      </Box>
    </Flex>
  )
};

export default TaskDetails;