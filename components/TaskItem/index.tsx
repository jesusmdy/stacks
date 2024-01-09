import { FC } from 'react';
import { TaskInterface } from '../../store/task';
import { Card, CardBody, Text } from '@chakra-ui/react';

const TaskItem: FC<{
  task: TaskInterface
}> = ({ task }) => {
  return (
    <Card variant="outline">
      <CardBody>
        <Text>{task.title}</Text>
      </CardBody>
    </Card>
  )
};

export default TaskItem;