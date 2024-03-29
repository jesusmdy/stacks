/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Box, Button, Flex, FormLabel, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverContent, PopoverTrigger, Select, Stack, Text, Textarea, useToast } from '@chakra-ui/react';
import { FC, Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { TaskInterface, useAddTask } from '../../../store/task';
import { PRIORITIES, getPriorityProperties } from '../../../utils/constants';
import { StatusItem } from '../../../store/status';
import { CalendarIcon } from '@chakra-ui/icons';
import { DayPicker } from 'react-day-picker';
import { daysToWeeks } from 'date-fns';
import { ArrowUpLeftIcon, FlagIcon } from '@heroicons/react/20/solid';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { db } from '../../../db';
import Link from 'next/link';
import StatusPicker from '../../Status/Picker';

interface NewTaskFields {
  name: string;
  description: string;
  estimatedTime: number;
  dueDate: string;
  priority: 1 | 2 | 3;
};

const DueDateField: FC = () => {
  const [selected, setSelected] = useState<Date>();
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (selected) {
      setValue(
        'dueDate',
        selected.setDate(selected.getDate())
      );
    }
  }, [selected]);

  const dueDateLabel = useMemo(() => {
    if (!selected) return 'Due date';
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (selected.toLocaleDateString() === today.toLocaleDateString()) {
      return 'Today';
    } else if (selected.toLocaleDateString() === tomorrow.toLocaleDateString()) {
      return 'Tomorrow';
    } else {
      return selected.toLocaleDateString();
    }
  }, [selected]);

  return (
    <Fragment>
      <input type="hidden" { ...register('dueDate') } />
      <Popover>
        <PopoverTrigger>
          <Button size="xs" variant="outline" rounded="lg">
            <CalendarIcon mr={2} />
            <Text>{dueDateLabel}</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            style={{ borderRadius: 'var(--chakra-radii-md)' }}
          />
        </PopoverContent>
      </Popover>
    </Fragment>
  )
};

const PriorityField: FC = () => {
  const { register, setValue, watch } = useFormContext();
  const priority = watch('priority');

  const handleSelect = (value: number) => {
    setValue('priority', value);
  };

  const priorityProperties = useMemo(() => {
    return getPriorityProperties(priority);
  }, [priority]);

  return (
    <Fragment>
      <input type="hidden" { ...register('priority') } />
      <Menu size="sm">
        <MenuButton as={Button} variant="outline" size="xs" leftIcon={<Icon as={FlagIcon} style={{ color: `var(--chakra-colors-${priorityProperties.color}-500)` }} />}>
          <Text fontSize="xs">{priorityProperties.label}</Text>
        </MenuButton>
        <MenuList>
          {
            _.map(
              PRIORITIES,
              (priority, index) => {
                const properties = getPriorityProperties(priority.value);

                return (
                  <MenuItem
                    key={index}
                    value={index}
                    onClick={() => handleSelect(priority.value)}
                  >
                    <Icon
                      as={FlagIcon}
                      mr={2}
                      style={{
                        color: `var(--chakra-colors-${properties.color}-500)`
                      }}
                    />
                    <Text fontSize="xs">{priority.label}</Text>
                  </MenuItem>
                )
              }
            )
          }
        </MenuList>
      </Menu>
    </Fragment>
  );
};

const StatusField: FC<{
  status: StatusItem;
  disabled?: boolean;
}> = ({ status, disabled }) => {
  const { register, setValue, watch } = useFormContext();
  const { status: statusList } = useContext(ProjectContext);
  const statusId = watch('status');

  const currentStatus = useMemo(() => {
    return _.find(statusList, { id: statusId });
  }, [statusId]);

  useEffect(() => {
    setValue('status', status.id);
  }, [status]);


  if (disabled) return (
    <Button variant="outline" size="xs" disabled>
      <Text fontSize="xs">{currentStatus?.name || 'Status'}</Text>
    </Button>
  )

  return (
    <Fragment>
      <input type="hidden" { ...register('status') } />
      <StatusPicker
        defaultValue={statusId}
        onChange={(statusId) => setValue('status', statusId)}
        withLabel
        buttonProps={{
          variant: 'outline',
        }}
      />
    </Fragment>
  )
};

const ParentTaskIndicator: FC<{
  parentTask?: TaskInterface;
}> = ({ parentTask }) => {
  if (!parentTask) return null;
  return (
    <Box>
      <Button>
        <Icon as={ArrowUpLeftIcon} mr={2} />
        <Text>{parentTask.title}</Text>
      </Button>
    </Box>
  )
};

const NewTask: FC<{
  status: StatusItem,
  parentTask?: TaskInterface;
  onSuccess?: (taskId: string) => void;
  onClose?: () => void;
}> = ({ status, onSuccess, onClose, parentTask }) => {
  const toast = useToast();

  const methods = useForm<NewTaskFields>({
    defaultValues: {
      dueDate: new Date().toISOString().split('T')[0],
    }
  });
  const addTask = useAddTask();

  const closeDialog = () => {
    methods.reset();
    onClose && onClose();
  };

  const onSubmit = (data: any) => {
    if (!data.status) {
      toast({
        title: 'Status is required',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    const task: TaskInterface = {
      id: uuid(),
      projectId: status.projectId,
      statusId: data.status,
      title: data.name,
      description: data.description,
      dateCreated: new Date(),
      dueDate: data.dueDate,
      tags: [],
      estimatedTime: data.estimatedTime,
      timeSpent: 0,
      priority: data.priority,
      subTask: [],
      comments: [],
      parentId: parentTask?.id,
    }
    db.tasks.put(task)
      .then(() => {
        addTask(task);
        closeDialog();
        if (parentTask) {
          const subtasks = parentTask.subTask || [];
          subtasks.push(task.id);
          db.tasks.update(parentTask.id, {
            subTask: subtasks,
          });
        }
        onSuccess && onSuccess(task.id);
      });
  };
  return (
    <FormProvider { ...methods }>
      <Box
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Box>
          <Box display="flex" flexDirection="column" gap={4} mt={4}>
            <ParentTaskIndicator parentTask={parentTask} />
            <Input placeholder="Task name" { ...methods.register('name', { required: true }) } size="sm" rounded="lg" />
            <Textarea placeholder="Task description" { ...methods.register('description') } size="sm" rounded="lg" />
            <Input type="number" placeholder="Estimated time (in hours)" { ...methods.register('estimatedTime') } size="sm" rounded="lg" />
            <Stack direction="row" my={4}>
              <StatusField
                status={status}
                disabled={!!parentTask}
              />
              <DueDateField />
              <PriorityField />
            </Stack>
          </Box>
        </Box>
        <Stack direction="row" justifyContent="end" my={4}>
          <Button mr={3} variant="outline" onClick={closeDialog} size="xs" rounded="lg">Cancel</Button>
          <Button colorScheme="purple" variant="solid" type="submit" size="xs" rounded="lg">
            {
              parentTask ? 'Add subtask' : 'Create task'
            }
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  )
};

export default NewTask;