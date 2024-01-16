/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { FC, Fragment, useMemo } from 'react';
import { TaskInterface, useGetTaskByID, useTasksOptions, useUpdateTask } from '../../store/task';
import { Box, Button, Card, CardBody, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Tag, Text } from '@chakra-ui/react';
import _ from 'lodash';
import PriorityLabel from './PriorityLabel';
import StatusField from './StatusLabel';
import DueDateLabel from './DueDateLabel';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import { ArrowDownRightIcon } from '@heroicons/react/20/solid';
import { RadioButtonCheckedIcon, RadioIcon } from '../../icons';
import StatusActionButton from './StatusAction';
import { useGetStatusByID } from '../../store/status';


const TaskItem: FC<{
  task: TaskInterface,
  shrink?: boolean;
}> = ({ task, shrink }) => {

  const status = useGetStatusByID(task.statusId);
  const viewOptions = useTasksOptions();

  const itemOptions = useMemo(
    () => ({
        width: shrink ? 'auto' : '10%',
        borderLeft: shrink ? 'none' : '1px solid'
    }),
    [task, shrink]
  );

  if (
    status && (
      (status.category === "closed" && !viewOptions.showClosedTasks)
      || (status.category === "completed" && !viewOptions.showCompletedTasks)
    )
  ) {
    return null;
  }

  return (
    <Box
      paddingX={4}
      borderBottom="1px solid"
      borderColor="inherit"
      _last={{
        borderBottom: shrink ? 'none' : '1px solid',
        borderColor: 'inherit'
      }}
    >
      <Flex height={10}>
        <Flex
          alignItems="center"
          flex={
            shrink
              ? 1
              : 'auto'
          }
          width={
            shrink
              ? 'auto'
              : '60%'
          }
        >
          <StatusActionButton task={task} />
          <Box as={Link} href={`/projects/${task.projectId}/task/${task.id}`} display="flex" alignItems="center" gap={1} ml={1}>
            <Text fontSize="xs" isTruncated>{task.title}</Text>
            <ArrowUpRightIcon width={15} height={15} color="purple" />
            {
              !_.isEmpty(task.subTask) && (
                <Tag
                  rounded="full"
                  size="sm"
                  title={`${task.subTask?.length} subtasks`}
                >
                  <Text fontSize="xs" fontWeight="bold">{task.subTask?.length}</Text>
                  <Icon as={ArrowDownRightIcon} width={15} height={15} />
                </Tag>
              )
            }
          </Box>
        </Flex>
        <PriorityLabel task={task} flexProps={itemOptions} />
        <StatusField task={task} flexProps={itemOptions} />
        <DueDateLabel task={task} flexProps={itemOptions} />
      </Flex>
    </Box>
  )
};

export default TaskItem;