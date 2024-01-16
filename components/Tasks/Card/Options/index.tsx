import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, FormControl, FormLabel, Icon, Menu, MenuButton, MenuItem, MenuList, Switch, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useShowClosedTasks, useShowCompletedTasks, useTasksOptions } from '../../../../store/task';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const ViewOptions: FC = () => {
  const options = useTasksOptions();
  const setShowClosedTasks = useShowClosedTasks();
  const setShowCompletedTasks = useShowCompletedTasks();

  const isEnabled = useMemo(
    () => (
      options.showClosedTasks === true
      || options.showCompletedTasks === true
    ),
    [options]
  );

  const isAllEnabled = useMemo(
    () => (
      options.showClosedTasks === true
      && options.showCompletedTasks === true
    ),
    [options]
  );

  return (
    <Menu
      closeOnSelect={false}
    >
      <MenuButton
        as={Button}
        leftIcon={<Icon as={CheckCircleIcon} width={15} height={15} />}
        variant={
          isAllEnabled
            ? 'solid'
            : 'outline'
        }
        colorScheme={isEnabled ? 'purple' : 'gray'}
      >
        Show closed
      </MenuButton>
      <MenuList>
        <MenuItem>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="toggleClosed" mb="0" fontSize="xs" flex={1}>Show closed tasks</FormLabel>
            <Switch
              isChecked={options.showClosedTasks}
              id="toggleClosed"
              onChange={
                (e) => setShowClosedTasks(e.target.checked)
              }
              size="sm"
              colorScheme="purple"
            />
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="toggleCompleted" mb="0" fontSize="xs" flex={1}>Show completed tasks</FormLabel>
            <Switch
              isChecked={options.showCompletedTasks}
              id="toggleCompleted"
              onChange={
                (e) => setShowCompletedTasks(e.target.checked)
              }
              size="sm"
              colorScheme="purple"
            />
          </FormControl>
        </MenuItem>
      </MenuList>
    </Menu>
  )
};

const CardViewOptions: FC = () => {
  return (
    <Flex>
      <ViewOptions />
    </Flex>
  )
};

export default CardViewOptions;