import { FC, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddProject } from '../../../store/projects';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { PRIORITY, SEVERITY, StatusItem, useAddStatus } from '../../../store/status';

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
    addStatus(
      _.map(placeholderStatuses, (status) => ({
        ...status,
        projectId: project.id,
      })) as never
    );
    addProject(project);
    handleClose();
  };

  return (
    <Fragment>
      <Button colorScheme="twitter" size="sm" onClick={handleOpen}>New project</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ModalHeader>New project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              { ...methods.register('name', { required: true }) }
              placeholder="Project name"
            />
            <Textarea
              { ...methods.register('description') }
              placeholder="Project description"
              mt={2}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>Cancel</Button>
            <Button colorScheme="twitter" type="submit" disabled={!methods.formState.isValid}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
};

export default ProjectDialog;