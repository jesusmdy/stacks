import { FC, Fragment, useMemo, useRef, useState } from 'react';
import { TaskInterface, useUpdateTask } from '../../../../store/task';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardHeader, Fade, Input, InputGroup, InputRightAddon, Progress, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { hoursToDays, valueParser } from '../../../../utils/constants';
import { db } from '../../../../db';

const TrackTimeDialog: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const updateTask = useUpdateTask();

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  };

  const updateTaskTime = (val: string) => {
    const value = valueParser(val);
    if (value === 0) {
      clearInput();
      return;
    }
    db.tasks.update(task.id, {
      timeSpent: value
    }).then(() => {
      updateTask({
        ...task,
        timeSpent: value
      });
      clearInput();
      onClose();
    })
  }

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      updateTaskTime(e.target.value);
    }
  };

  const onClick = () => {
    if (inputRef.current) {
      updateTaskTime(inputRef.current.value);
    }
  }

  return (
    <Fragment>
      <Button
        variant="outline"
        size="xs"
        onClick={onOpen}
        disabled={String(task.estimatedTime) === String(0)}
      >
        Track time
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        size="sm"
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="xl">
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Track time
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                ref={inputRef}
                placeholder="Time spent"
                size="sm"
                variant="filled"
                rounded="md"
                onKeyDown={handleEnter}
                colorScheme="purple"
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} size="xs">Cancel</Button>
              <Button colorScheme="purple" variant="solid" onClick={onClick} ml={3} size="xs">Track</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  )
};

const SetEstimatedTimeDialog: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateTask = useUpdateTask();

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  }

  const handleFocus = () => {
    onClose();
    clearInput();
  }

  const label = useMemo(
    () => {
      const days =  hoursToDays(Number(task.estimatedTime));
      if (!isOpen) {
        return `Estimated time: ${days}`
      }
      return days;
    },
    [task, isOpen]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      const value = valueParser(e.target.value);
      if (value === 0) {
        clearInput();
        return;
      }
      db.tasks.update(task.id, {
        estimatedTime: value
      })
        .then(() => {
          updateTask({
            ...task,
            estimatedTime: value
          });
          clearInput();
          onClose();
        })
    }
  }

  return (
    <Box my={4}>
      <Input
        size="xs"
        ref={inputRef}
        placeholder={label}
        onClick={onOpen}
        onBlur={handleFocus}
        onKeyDown={handleEnter}
        variant={
          isOpen ?
            'outline' :
            'unstyled'
        }
      />
    </Box>
  )
};

const ProgressCard: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  
  const estimatedTime = useMemo(
    () => {
      if (task.timeSpent === 0) {
        return 100;
      }
      return task.estimatedTime;
    },
    [task]
  );

  const timeSpent = useMemo(
    () => {
      return task.timeSpent || 0;
    },
    [task]
  );

  return (
    <Box mb={4}>
      <Text fontSize="xs" fontWeight="bold">Progress</Text>
      <Stack direction="column" my={4} gap={0}>
        <SetEstimatedTimeDialog task={task} />
        <Progress
          value={timeSpent}
          max={estimatedTime}
          colorScheme="purple"
          size="xs"
          rounded="xl"
        />
      </Stack>
      <TrackTimeDialog task={task} />
    </Box>
  )
};

export default ProgressCard;