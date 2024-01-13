'use client';

import { FC, useMemo } from 'react';
import { TaskInterface, useUpdateTask } from '../../store/task';
import { Box, Button, Card, CardBody, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Tag, Text } from '@chakra-ui/react';
import _ from 'lodash';
import PriorityLabel from './PriorityLabel';
import StatusField from './StatusLabel';
import DueDateLabel from './DueDateLabel';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';


const TaskItem: FC<{
  task: TaskInterface
}> = ({ task }) => {
  return (
    <Box paddingX={4} borderBottom="1px solid" borderColor="inherit">
      <Flex height={10}>
        <Flex alignItems="center" width="60%">
          <Box
            as={Link}
            href={`/projects/${task.projectId}/task/${task.id}`}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Text fontSize="xs">{task.title}</Text>
            <ArrowUpRightIcon width={15} height={15} color="purple" />
          </Box>
        </Flex>
        <PriorityLabel task={task} />
        <StatusField task={task} />
        <DueDateLabel task={task} />
      </Flex>
    </Box>
  )
};

export default TaskItem;