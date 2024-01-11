'use client';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Textarea } from '@chakra-ui/react';
import { FC, Fragment, useContext, useState } from 'react';
import { StatusItem } from '../../store/status';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { useForm } from 'react-hook-form';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useAddTask } from '../../store/task';
import { v4 as uuid } from 'uuid';
import { PRIORITIES } from '../../utils/constants';
import _ from 'lodash';

const Navigation: FC<{
  status: StatusItem;
}> = ({ status }) => {
  const { project } = useContext(ProjectContext);
  return (
    <Breadcrumb
      separator={<ChevronRightIcon color="gray.500" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink>{project.name}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{status.name}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
};

interface NewTaskFields {
  name: string;
  description: string;
  estimatedTime: number;
  dueDate: string;
  priority: 1 | 2 | 3;
}

const NewTaskDialog: FC<{
  status: StatusItem;
}> = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm<NewTaskFields>();
  const addTask = useAddTask();

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    methods.reset();
  };

  const onSubmit = (data: any) => {
    const task = {
      projectId: status.projectId,
      statusId: status.id,
      id: uuid(),
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
    }
    addTask(task);
    closeDialog();
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={closeDialog} size="xl">
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Navigation status={status} />
            <Box display="flex" flexDirection="column" gap={4} mt={4}>
              <Input placeholder="Task name" { ...methods.register('name', { required: true }) } />
              <Textarea placeholder="Task description" { ...methods.register('description') } />
              <Input type="number" placeholder="Estimated time (in hours)" { ...methods.register('estimatedTime') } />
              <Box>
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Select { ...methods.register('priority') } id="priority">
                  {
                    _.map(
                      PRIORITIES,
                      (priority, index) => (
                        <option key={index} value={index}>{priority.label}</option>
                      )
                    )
                  }
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="dueDate">Due date</FormLabel>
                <Input type="date" id="dueDate" placeholder="Due date" { ...methods.register('dueDate') } />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button colorScheme="green" type="submit">Create task</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button size="xs" colorScheme="purple" variant="ghost" onClick={openDialog}>Add new task</Button>
    </Fragment>
  )
};

export default NewTaskDialog;