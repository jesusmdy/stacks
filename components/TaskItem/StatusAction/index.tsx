import { FC, Fragment } from 'react';
import { TaskInterface, useUpdateTask } from '../../../store/task';
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Text } from '@chakra-ui/react';
import { RadioButtonCheckedIcon } from '../../../icons';
import { useGetStatusByID, useStatusList } from '../../../store/status';
import _ from 'lodash';
import { db } from '../../../db';
import { CheckIcon } from '@chakra-ui/icons';
import StatusPicker from '../../Status/Picker';

const StatusActionButton: FC<{
  task: TaskInterface;
  withLabel?: boolean;
}> = ({ task, withLabel }) => {
  const updateTask = useUpdateTask();

  const handleChangeStatus = (statusId: string) => {
    db.tasks.update(task.id, {
      statusId
    })
      .then(() => {
        updateTask({ ...task, statusId });
      })
  };

  return (
    <Fragment>
      <StatusPicker defaultValue={task.statusId} onChange={handleChangeStatus} withLabel={withLabel} />
    </Fragment>
  )
};

export default StatusActionButton;