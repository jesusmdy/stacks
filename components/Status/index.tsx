import { FC } from 'react';
import { StatusItem } from '../../store/status';
import { Box, Card, CardBody, CardFooter, CardHeader, Stack, Text } from '@chakra-ui/react';
import { useGetParentTasksByStatusId } from '../../store/task';
import NewTaskDialog from '../NewTaskDialog';
import _ from 'lodash';
import TaskItem from '../TaskItem';

const StatusLayout: FC<{
  status: StatusItem;
}> = ({ status }) => {
  const taskList = useGetParentTasksByStatusId(status.id);
  
  return (
    <Card
      flex={1}
      size="sm"
      variant="outline"
      rounded="xl"
      boxShadow="none"
    >
      <CardHeader
        borderBottom="1px solid"
        borderColor="inherit"
        paddingY={2}
      >
        <Text fontSize="sm" fontWeight="bold">{status.name}</Text>
      </CardHeader>
      <CardBody padding={0}>
        <Stack direction="column" gap={0}>
          {
            _.map(
              taskList,
              task => (
                <TaskItem key={task.id} task={task} />
              )
            )
          }
        </Stack>
      </CardBody>
      <CardFooter paddingY={2}>
        <NewTaskDialog status={status} />
      </CardFooter>
    </Card>
  )
};

export default StatusLayout;