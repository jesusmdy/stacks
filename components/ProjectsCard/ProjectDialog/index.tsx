import { FC, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddProject } from '../../../store/projects';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { PRIORITY, SEVERITY, StatusItem, useAddStatus } from '../../../store/status';
import { db } from '../../../db';
import { statusCategory, statusColor } from '../../../utils/constants';

interface ProjectForm {
  name: string;
  description: string;
};

const placeholderStatuses = [
  {
    id: uuidv4(),
    name: 'Open',
    description: 'Tasks that are open',
    createdAt: new Date(),
    severity: SEVERITY.warning,
    priority: PRIORITY.high,
    color: statusColor[0],
    category: statusCategory.active,
    inmutable: true,
  },
  {
    id: uuidv4(),
    name: 'In progress',
    description: 'Tasks that are in progress',
    createdAt: new Date(),
    severity: SEVERITY.info,
    priority: PRIORITY.medium,
    color: statusColor[6],
    category: statusCategory.active
  },
  {
    id: uuidv4(),
    name: 'Done',
    description: 'Tasks that are done',
    createdAt: new Date(),
    severity: SEVERITY.success,
    priority: PRIORITY.low,
    color: statusColor[1],
    category: statusCategory.completed
  },
  {
    id: uuidv4(),
    name: 'Closed',
    description: 'Tasks that are closed',
    createdAt: new Date(),
    severity: SEVERITY.info,
    priority: PRIORITY.low,
    color: statusColor[7],
    category: statusCategory.closed,
    inmutable: true,
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
      <Button colorScheme="purple"  onClick={handleOpen}>New project</Button>
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