'use client'

import { Box, Text, Card, CardBody, CardHeader, Flex, CardProps, CardFooter } from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useContext } from 'react';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { useGetParentTaskByProjectId, useGetTasksByProjectId } from '../../../store/task';
import TaskItem from '../../TaskItem';
import { TaskButton } from '../../ProjectPage/Header';
import CardViewOptions from './Options';

const EmptyPlaceholder = () => (
  <Box
    display="flex"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    height="40vh"
  >
    <Text fontSize="large" fontWeight="bold">You don&apos;t have any status set</Text>
    <Text fontSize="sm">Set status to your project to track your progress</Text>
  </Box>
);

const TasksCard: FC<CardProps> = (props) => {
  const { status, project } = useContext(ProjectContext);
  const taskList = useGetParentTaskByProjectId(project.id);

  if (_.isEmpty(status)) return <EmptyPlaceholder />

  return (
    <Card
      size="sm"
      borderRadius="xl"
      {...props}
    >
      <CardHeader borderBottom="1px solid" borderColor="gray.100" paddingY={2} display="flex" alignItems="center" gap={2}>
        <Text fontSize="sm" fontWeight="bold" flex={1}>Tasks</Text>
        <CardViewOptions />
      </CardHeader>
      <CardBody p={0}>
        <Flex flexDir="column">
          {
            _.map(
              taskList,
              task => (
                <TaskItem key={task.id} task={task} />
              )
            )
          }
        </Flex>
      </CardBody>
      <CardFooter py={2}>
        <TaskButton />
      </CardFooter>
    </Card>
  )
};

export default TasksCard;