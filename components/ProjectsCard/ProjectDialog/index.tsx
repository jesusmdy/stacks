import { FC, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddProject } from '../../../store/projects';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { PRIORITY, SEVERITY, StatusItem, useAddStatus } from '../../../store/status';
import { db } from '../../../db';

interface ProjectForm {
  name: string;
  description: string;
};

const placeholderStatuses = [
  {
    id: uuidv4(),
    name: 'To do',
    description: 'Tasks that are not started yet',
    createdAt: new Date(),
    severity: SEVERITY.warning,
    priority: PRIORITY.high,
  },
  {
    id: uuidv4(),
    name: 'In progress',
    description: 'Tasks that are in progress',
    createdAt: new Date(),
    severity: SEVERITY.info,
    priority: PRIORITY.medium,
  },
  {
    id: uuidv4(),
    name: 'Done',
    description: 'Tasks that are done',
    createdAt: new Date(),
    severity: SEVERITY.success,
    priority: PRIORITY.low,
  }
];

const ProjectDialog: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm<ProjectForm>();
  const addProject = useAddProject();
  const addStatus = useAddStatus();
  const toast = useToast();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    methods.reset();
    setIsOpen(false);
  };

  const onSubmit = (data: ProjectForm) => {
    const project = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
    };
    db.projects.put(project)
      .then(() => {
        addProject(project);
        const statusList = _.map(placeholderStatuses, (status) => ({
          ...status,
          projectId: project.id,
        }));
        db.status.bulkPut(statusList).then(
          () => {
            addStatus(statusList as never);
            handleClose();
          }
        );
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Fragment>
      <Button colorScheme="purple" size="xs" onClick={handleOpen}>New project</Button>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          rounded="xl"
        >
          <ModalHeader fontSize="sm">New project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              { ...methods.register('name', { required: true }) }
              placeholder="Project name"
              size="xs"
              rounded="md"
            />
            <Textarea
              { ...methods.register('description') }
              placeholder="Project description"
              mt={2}
              size="xs"
              rounded="md"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose} size="xs">Cancel</Button>
            <Button colorScheme="purple" type="submit" disabled={!methods.formState.isValid} size="xs">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
};

export default ProjectDialog;