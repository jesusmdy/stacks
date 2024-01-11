import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const TaskDetailsPage: FC<{ params: { taskId: string } }> = ({ params }) => {
  return (
    <Box>{params.taskId}</Box>
  )
};

export default TaskDetailsPage;