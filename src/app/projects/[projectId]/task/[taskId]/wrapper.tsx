'use client';

import { FC } from 'react';
import { useGetTaskByID } from '../../../../../../store/task';
import TaskDetails from '../../../../../../components/Task/Details';
import { Button, Card, CardBody, CardHeader, Text, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

const TaskWrapper: FC<{ taskId: string }> = ({ taskId }) => {
  const task = useGetTaskByID(taskId);
  const colorMode = useColorMode().colorMode;
  
  if (!task) {
    return null;
  }
  
  return (
    <Card
      size="sm"
      borderRadius="xl"
      m={4}
    >
      <CardHeader
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      >
        <Button
          as={Link}
          href={`/projects/${task.projectId}/list`}
          variant="outline"
          size="xs"
        >
          <Text>Go back</Text>
        </Button>
      </CardHeader>
      <CardBody>
        <TaskDetails task={task} />
      </CardBody>
    </Card>
  )
};

export default TaskWrapper;