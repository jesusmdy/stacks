import { FC, useContext, useMemo } from 'react';
import { TaskInterface, useGetTasksByParentId } from '../../../../store/task';
import { Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';
import NewTaskDialog from '../../../NewTaskDialog';
import { StatusItem, useGetStatusByID, useGetStatusByProjectId } from '../../../../store/status';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import _ from 'lodash';
import TaskItem from '../../../TaskItem';

const NewSubstackDialog: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  const status = useGetStatusByID(task.statusId);
  
  if (!status) return null;
  return (
    <NewTaskDialog
      status={status}
      parentTask={task}
    />
  )
}

const TaskChildren: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  
  const tasks = useGetTasksByParentId(task.id);
  
  return (
    <Card
      rounded="xl"
      variant="outline"
    >
      <CardHeader
        borderBottom={
          _.isEmpty(tasks)
            ? 'none'
            : '1px solid'
        }
        borderColor="inherit"
        as={Flex}
        alignItems="center"
      >
        <Text fontSize="xs" fontWeight="bold" flex={1}>Subtasks</Text>
        <NewSubstackDialog task={task} />
      </CardHeader>
      {
        !_.isEmpty(tasks) && (
          <CardBody p={0}>
            {
              _.map(
                tasks,
                (task, index) => (
                  <TaskItem
                    task={task} key={`subtask-${task.id}-${index}`}
                    shrink
                  />
                )
              )
            }
          </CardBody>
        )
      }
    </Card>
  )
};

export default TaskChildren