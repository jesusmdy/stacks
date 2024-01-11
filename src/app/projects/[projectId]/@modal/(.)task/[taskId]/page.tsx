import { FC, Fragment } from 'react';
import TaskModal from './modal';

const TaskModalPage: FC<{
  params: {
    taskId: string;
  }
}> = ({ params }) => {
  return (
    <Fragment>
      <TaskModal taskId={params.taskId} />
    </Fragment>
  )
};

export default TaskModalPage;