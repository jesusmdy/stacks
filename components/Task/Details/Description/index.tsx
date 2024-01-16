'use client';
import { FC, useState } from 'react';
import { TaskInterface, useUpdateTask } from '../../../../store/task';
import { Box, Button, Flex, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import { db } from '../../../../db';
import TaskActionsMenu from '../Actions';

export const DescriptionField: FC<{
  task: TaskInterface
}> = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(task.description);
  const updateTask = useUpdateTask();

  const handleSave = () => {
    db.tasks.update(task.id, {
      description
    })
      .then(() => {
        updateTask({ ...task, description });
        setEditMode(false);
      })
  }

  const handleCancel = () => {
    setEditMode(false);
  }

  if (!editMode) return (
    <Box
      mt={2}
      onClick={() => setEditMode(true)}
      cursor="pointer"
      _hover={{
        color: 'purple.500'
      }}
    >
      <Text fontSize="xs">
        {
          task.description
            ? task.description
            : 'Add description'
        }
      </Text>
    </Box>
  )

  return (
    <Box mt={2}>
      <Textarea
        defaultValue={task.description}
        size="sm"
        onChange={(e) => setDescription(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            e.preventDefault();
            handleCancel();
          }
          if (e.key === 'Enter' && e.ctrlKey) {
            e.stopPropagation();
            e.preventDefault();
            handleSave();
          }
        }}
      />
      <Stack justifyContent="end" direction="row" mt={2}>
        <Button size="xs" variant="ghost" onClick={handleCancel}>Cancel</Button>
        <Button size="xs" variant="outline" borderColor="inherit" colorScheme="purple" onClick={handleSave}>Save</Button>
      </Stack>
    </Box>
  )
};

export const TitleField: FC<{
  task: TaskInterface
}> = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const updateTask = useUpdateTask();

  const handleSave = () => {
    db.tasks.update(task.id, {
      title
    })
      .then(() => {
        updateTask({ ...task, title });
        setEditMode(false);
      })
  }

  const handleCancel = () => {
    setEditMode(false);
  }

  if (!editMode) return (
    <Flex alignItems="center">
      <Box onClick={() => setEditMode(true)} cursor="pointer" _hover={{ color: 'purple.500' }} flex={1}>
        <Text fontSize="lg" fontWeight="bold">
          {
            task.title
              ? task.title
              : 'Add title'
          }
        </Text>
      </Box>
      <TaskActionsMenu task={task} />
    </Flex>
  )

  return (
    <Box>
      <Input
        defaultValue={task.title}
        size="sm"
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            e.preventDefault();
            handleCancel();
          }
          if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            handleSave();
          }
        }}
      />
      <Stack justifyContent="end" direction="row" mt={2}>
        <Button size="xs" variant="ghost" onClick={handleCancel}>Cancel</Button>
        <Button size="xs" variant="outline" borderColor="inherit" colorScheme="purple" onClick={handleSave}>Save</Button>
      </Stack>
    </Box>
  )
};

const TaskDescriptionFields: FC<{
  task: TaskInterface
}> = ({ task }) => {
  return (
    <Box>
      <TitleField task={task} />
      <DescriptionField task={task} />
    </Box>
  )
};

export default TaskDescriptionFields;