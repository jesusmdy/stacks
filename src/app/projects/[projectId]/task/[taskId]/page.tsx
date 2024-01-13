import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import TaskWrapper from './wrapper';

const TaskDetailsPage: FC<{ params: { taskId: string } }> = ({ params }) => {
  return <TaskWrapper taskId={params.taskId} />;
};

export default TaskDetailsPage;