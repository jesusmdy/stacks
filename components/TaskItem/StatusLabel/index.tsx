import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Tag } from '@chakra-ui/react';
import { FC } from 'react';
import { TaskInterface, useUpdateTask } from '../../../store/task';
import { useGetStatusByID, useGetStatusByProjectId, useStatusList } from '../../../store/status';
import _ from 'lodash';

export const StatusFieldAction: FC<{
  task: TaskInterface,
  noButton?: boolean
}> = ({ task, noButton }) => {
  const status = useGetStatusByID(task.statusId);

  const statusList = useGetStatusByProjectId(task.projectId);
  const updateTask = useUpdateTask();

  const handleChangeStatus = (statusId: string) => {
    updateTask({
      ...task,
      statusId
    });
  }

  if (!status || !statusList) return null;

  return (
    <Menu>
      <MenuButton as={Button} variant={noButton ? 'unstyled' : 'ghost'} size="xs" rounded="full">
        <Tag size="sm" rounded="full">{status.name}</Tag>
      </MenuButton>
      <MenuList>
        {
          _.map(
            _.flatten(statusList),
            (status) => {
              return (
                <MenuItem
                  key={status.id}
                  fontSize="sm"
                  onClick={() => handleChangeStatus(status.id)}
                >
                  <Tag>{status.name}</Tag>
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
  task: TaskInterface
}> = ({ task }) => {
  return (
    <Flex alignItems="center" width="10%" borderLeft="1px solid" borderColor="inherit" paddingX={2}>
      <StatusFieldAction task={task} />
    </Flex>
  )
};

export default StatusField;