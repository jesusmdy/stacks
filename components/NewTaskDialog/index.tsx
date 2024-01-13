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
import NewTask from '../Task/New';

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

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => {
    setIsOpen(false);
  };


  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={closeDialog} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader fontSize="sm" borderBottom="1px solid" borderColor="inherit">Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewTask
              status={status}
              onSuccess={closeDialog}
              onClose={closeDialog}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button size="xs" colorScheme="purple" variant="ghost" onClick={openDialog}>Add new task</Button>
    </Fragment>
  )
};

export default NewTaskDialog;