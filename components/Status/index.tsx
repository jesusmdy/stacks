import { FC, useContext } from 'react';
import { StatusItem } from '../../store/status';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Text, useColorMode } from '@chakra-ui/react';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { useGetTasksByStatusId } from '../../store/task';
import NewTaskDialog from '../NewTaskDialog';
import _ from 'lodash';
import TaskItem from '../TaskItem';

const StatusLayout: FC<{
  status: StatusItem;
}> = ({ status }) => {
  const taskList = useGetTasksByStatusId(status.id);
  const colorMode = useColorMode().colorMode;
  return (
    <Box flex={1}>
      <Card>
        <CardHeader
          borderBottom="1px solid"
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
        >
          <Text fontSize="sm" fontWeight="bold">{status.name}</Text>
        </CardHeader>
        <CardBody>
          {
            _.map(
              taskList,
              task => (
                <TaskItem key={task.id} task={task} />
              )
            )
          }
        </CardBody>
        <CardFooter>
          <NewTaskDialog status={status} />
        </CardFooter>
      </Card>
    </Box>
  )
};

export default StatusLayout;