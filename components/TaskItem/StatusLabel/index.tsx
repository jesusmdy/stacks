import { Button, Flex, FlexProps, Menu, MenuButton, MenuItem, MenuList, Tag } from '@chakra-ui/react';
import { FC } from 'react';
import { TaskInterface, useUpdateTask } from '../../../store/task';
import { useGetStatusByID, useGetStatusByProjectId, useStatusList } from '../../../store/status';
import _ from 'lodash';
import { db } from '../../../db';
import StatusActionButton from '../StatusAction';

export const StatusFieldAction: FC<{
  task: TaskInterface,
  noButton?: boolean
}> = ({ task, noButton }) => {
  const status = useGetStatusByID(task.statusId);

  const statusList = useGetStatusByProjectId(task.projectId);
  const updateTask = useUpdateTask();

  const handleChangeStatus = (statusId: string) => {
    db.tasks.update(task.id, {
      statusId
    })
      .then(() => {
        updateTask({ ...task, statusId });
      })
  }

  if (!status || !statusList) return null;

  return (
    <Menu>
      <MenuButton as={Button} variant="unstyled" size="xs" rounded="full">
        <Tag size="sm" rounded="full" colorScheme={status.color}>{status.name}</Tag>
      </MenuButton>
      <MenuList>
        {
          _.map(
            _.flatten(statusList),
            (status) => {
              return (
                <MenuItem
                  key={status.id}
                  onClick={() => handleChangeStatus(status.id)}
                >
                  <Tag colorScheme={status.color} rounded="full" fontSize="xs">{status.name}</Tag>
                </MenuItem>
              )
            }
          )
        }
      </MenuList>
    </Menu>
  )
};

const StatusField: FC<{
  task: TaskInterface,
  flexProps?: FlexProps
}> = ({ task, flexProps }) => {
  return (
    <Flex alignItems="center" width="10%" borderLeft="1px solid" borderColor="inherit" paddingX={2} { ...flexProps }>
      <StatusActionButton task={task} withLabel />
    </Flex>
  )
};

export default StatusField;