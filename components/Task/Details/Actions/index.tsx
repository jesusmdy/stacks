import { FC, Fragment, useRef } from 'react';
import { TaskInterface, useAddTask, useRemoveTask, useUpdateTask } from '../../../../store/task';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Divider, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/20/solid';
import { db } from '../../../../db';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

const DeleteTaskButton: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const removeTask = useRemoveTask();
  const updateTask = useUpdateTask();
  const cancelRef = useRef(null);
  const router = useRouter();

  const updateParentTask = async (_task: TaskInterface) => {
    const parentTask = await db.tasks.get(_task.parentId);
    const subTask = parentTask.subTask.filter((subtask: string) => subtask !== _task.id);
    await db.tasks.update(parentTask.id, { subTask });
    updateTask({ ...parentTask, subTask});
  }

  const handleDelete = async (_task: TaskInterface) => {
    const subTasks = _task.subTask;
    if (!_.isEmpty(subTasks)) {
      for (const subTask of subTasks as string[]) {
        await handleDelete(await db.tasks.get(subTask));
        removeTask(subTask);
      }
    }
    await db.tasks.delete(_task.id);
    removeTask(_task.id);
    onClose();
    router.push(`/projects/${_task.projectId}/task/${_task.parentId}`);
  };
  
  const onDelete = () => {
    if (task.parentId) updateParentTask(task);
    handleDelete(task);
  };

  return (
    <Fragment>
      <MenuItem
        icon={<Icon as={TrashIcon} color="red.500" width={15} height={15} />}
        fontSize="xs"
        color="red.500"
        fontWeight="bold"
        onClick={onOpen}
      >
        Delete
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="sm" fontWeight="bold">
              Delete {`"${task.title}"`}
            </AlertDialogHeader>

            <AlertDialogBody fontSize="xs">
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  )
};

const CloneTaskButton: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addTask = useAddTask();
  const cancelRef = useRef(null);
  const router = useRouter();

  const onClone = () => {
    const _task = {
      ...task,
      id: uuid(),
      title: `${task.title} (copy)`,
      subtasks: [],
      comments: []
    };
    db.tasks.put(_task)
      .then(() => {
        addTask(_task);
        onClose();
        router.push(`/projects/${task.projectId}/task/${_task.id}`);
      })
  };

  return (
    <Fragment>
      <MenuItem icon={<Icon as={DocumentDuplicateIcon} width={15} height={15} />} onClick={onOpen} fontSize="xs">Clone</MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="sm" fontWeight="bold">
              Clone Task
            </AlertDialogHeader>

            <AlertDialogBody fontSize="xs">
              Do you want to clone this task?
              It will be cloned without any of its subtasks and comments.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='purple' onClick={onClone} ml={3}>
                Clone
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  )
};

const TaskActionsMenu: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  return (
    <Fragment>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon color="purple.500" />} variant="ghost">
          <Text color="purple.500">Actions</Text>
        </MenuButton>
        <MenuList>
          <CloneTaskButton task={task} />
          <Divider />
          <DeleteTaskButton task={task} />
        </MenuList>
      </Menu>
    </Fragment>
  )
};

export default TaskActionsMenu;