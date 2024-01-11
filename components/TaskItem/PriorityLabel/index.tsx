import { FC, useMemo } from 'react';
import { TaskInterface, useUpdateTask } from '../../../store/task';
import { PRIORITIES, getPriorityProperties } from '../../../utils/constants';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Tag } from '@chakra-ui/react';
import _ from 'lodash';

const PriorityLabel: FC<{
  task: TaskInterface
}> = ({ task }) => {
  const priority = Number(task.priority);
  const updateTask = useUpdateTask();

  const tag = useMemo(() => {
    return getPriorityProperties(priority);
  }, [priority]);

  const handleUpdatePriority = (priority: number) => {
    updateTask({
      ...task,
      priority: priority
    });
  }


  return (
    <Flex alignItems="center" width="10%" borderLeft="1px solid" borderColor="inherit" paddingX={2}>
      <Menu>
        <MenuButton as={Button} variant="ghost" size="sm" rounded="full">
          <Tag size="sm" colorScheme={tag.color} borderRadius="full">{tag.label}</Tag>
        </MenuButton>
        <MenuList>
          {
            _.map(
              PRIORITIES,
              (priority, index) => {
                const priorityProps = getPriorityProperties(index);
                return (
                  <MenuItem
                    key={index}
                    onClick={() => handleUpdatePriority(index)}
                  >
                    <Tag size="sm" colorScheme={priorityProps.color} borderRadius="full">{priorityProps.label}</Tag>
                  </MenuItem>
                )
              }
            )
          }
        </MenuList>
      </Menu>
    </Flex>
  )
};

export default PriorityLabel;