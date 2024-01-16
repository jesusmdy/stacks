import { ArrowForwardIcon, ChevronRightIcon, DragHandleIcon, SettingsIcon } from '@chakra-ui/icons';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Flex, Icon, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { FC, Fragment, PropsWithChildren, useContext, useRef, useState } from 'react';
import { PRIORITY, SEVERITY, StatusItem, useAddStatus, useGetStatusByCategory, useRemoveStatus, useUpdateStatus } from '../../../store/status';
import { StatusCategoryType, statusCategoryList, statusColor } from '../../../utils/constants';
import { db } from '../../../db';
import { v4 as uuidv4 } from 'uuid';
import { EllipsisHorizontalIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { useGetTasksByStatusId, useUpdateTask } from '../../../store/task';
import StatusPicker from '../Picker';
import { ProjectContext } from '@/app/projects/[projectId]/context';

const StatusColorPicker: FC<{ status: StatusItem }> = ({ status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateStatus = useUpdateStatus();
  const colors = Object.values(statusColor);

  const updateStatusColor = (color: string) => {
    updateStatus({ ...status, color });
    onClose();
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Box bg={`${status.color}.500`} boxSize={3} rounded="sm" cursor="pointer" onClick={onOpen} />
      </PopoverTrigger>
      <PopoverContent rounded="xl" zIndex={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontSize="xs" borderBottom="none">Color</PopoverHeader>
        <PopoverBody>
          <Stack direction="row" flexWrap="wrap">
            {
              _.map(
                colors,
                (color, index) => (
                  <Box
                    key={`color-${index}`}
                    bg={`${color}.500`}
                    boxSize={6}
                    rounded="lg"
                    cursor="pointer"
                    mr={2}
                    onClick={() => updateStatusColor(color)}
                  />
                )
              )
            }
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const Dragger: FC<PropsWithChildren<{ status: StatusItem }>> = ({ status, children }) => {

  const elementRef = useRef<HTMLDivElement>(null);

  const onDragStart = (e: any) => {
    elementRef.current?.style.setProperty('z-index', '1');
    e.dataTransfer.setData('status', JSON.stringify(status));
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <Flex
      ref={elementRef}
      draggable={!status.inmutable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      border="1px solid" borderColor="inherit" p={1} rounded="sm" alignItems="center" gap={2}
      bg="white"
      cursor={status.inmutable ? 'default' : 'grab'}
    >
      <Box
        boxSize={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {
          !status.inmutable && (
            <Icon as={DragHandleIcon} width={3} height={3} />
          )
        }
      </Box>
      {children}
    </Flex>
  )
};

const DeleteMenuItem: FC<{ status: StatusItem }> = ({ status }) => {
  const [currentStatus,] = useState<string | undefined>(status.id);
  const [nextStatus, setNextStatus] = useState<string | undefined>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteStatus = useRemoveStatus();
  const updateTask = useUpdateTask();
  const taskList = useGetTasksByStatusId(status.id);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const doDelete = async () => {
    await db.status.delete(status.id);
    deleteStatus(status.id);
  }

  const handleDelete = async () => {
    if (taskList.length > 0) {
      onOpen();
      return;
    } else {
      await doDelete();
      onClose();
    }
  };

  const handleReassign = async () => {
    if (!nextStatus) return;
    if (nextStatus === currentStatus) return;
    taskList.forEach(async (task) => {
      await db.tasks.update(task.id, { statusId: nextStatus })
      .then(() => {
          updateTask({ ...task, statusId: nextStatus });
          doDelete();
          onClose();
        })
        .catch(console.log)
    })
  };

  return (
    <Fragment>
      <MenuItem color="red.500" onClick={handleDelete} fontWeight="bold">
        Delete
      </MenuItem>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent rounded="xl">
            <AlertDialogHeader display="flex" alignItems="center" gap={1}>
              <Icon as={ExclamationTriangleIcon} width={5} height={5} color="orange.500" />
              <Text fontSize="sm" fontWeight="bold">Dependency Warning</Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontSize="xs">This status has <Text as="b">{taskList.length}</Text> task(s). Reassign these tasks before deleting this status.</Text>
              <Flex align="center" justifyContent="center" my={4}>
                <StatusPicker defaultValue={currentStatus} withLabel readOnly />
                <Icon as={ArrowForwardIcon} width={5} height={5} mx={4} />
                <StatusPicker defaultValue={nextStatus} onChange={setNextStatus} withLabel />
              </Flex>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleReassign} ml={3} disabled={!nextStatus}>Reassign & Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  )
};

const StatusMenu: FC<{ status: StatusItem }> = ({ status }) => {
  return (
    <Fragment>
      <Menu>
        <MenuButton as={IconButton} variant="ghost" icon={<Icon as={EllipsisHorizontalIcon} width="4" height={4} color="gray.500" />} />
        <MenuList fontSize="xs" rounded="xl">
          <MenuItem>Clone</MenuItem>
          <Divider />
          {
            !status.inmutable && (
              <DeleteMenuItem status={status} />
            )
          }
        </MenuList>
      </Menu>
    </Fragment>
  )
};

const StatusTitle: FC<{ status: StatusItem }> = ({ status }) => {
  const [value, setValue] = useState(status.name);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateStatus = useUpdateStatus();
  
  const handleUpdate = async () => {
    await db.status.update(status.id, { name: value })
    updateStatus({ ...status, name: value });
  };

  const handleBlur = () => {
    handleUpdate()
      .then(() => onClose());
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  }

  if (isOpen) return (
    <Input
      autoFocus
      size="xs"
      variant="unstyled"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      width="90%"
    />
  )
  return (
    <Text onClick={onOpen} fontSize="xs" cursor="pointer">{status.name}</Text>
  )
};

const StatusItem: FC<{ status: StatusItem }> = ({ status }) => {
  return (
    <Dragger status={status}>
      <StatusColorPicker status={status} />
      <Flex alignItems="center" flex={1}>
        <StatusTitle status={status} />
        <Box flex={1} />
        <StatusMenu status={status} />
      </Flex>
    </Dragger>
  )
};

const CategorySectionItems: FC<{ category: StatusCategoryType }> = ({ category }) => {
  const statusList = useGetStatusByCategory(category.value as any);
  return (
    <Flex flexDir="column" gap={1}>
      {
        _.map(
          statusList,
          (status, index) => (
            <StatusItem key={`status-item-${index}`} status={status} />
          )
        )
      }
    </Flex>
  )
};

const AddStatusButton: FC<{ category: StatusCategoryType }> = ({ category }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { project } = useContext(ProjectContext);
  const [value, setValue] = useState('');
  const addStatus = useAddStatus();

  const saveStatus = async () => {
    if (!value) return;
    const status = {
      projectId: project.id,
      id: uuidv4(),
      name: value,
      description: '',
      createdAt: new Date(),
      severity: SEVERITY.warning,
      priority: PRIORITY.high,
      color: statusColor[0],
      category: category.value as any,
    };
    await db.status.add(status);
    addStatus(status as StatusItem);
  };

  const handleSave = () => {
    saveStatus()
      .then(() => {
        setValue('');
        onClose();
      });
  }

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }

  if (isOpen) return (
    <Box display="flex" alignItems="center" mt={1}>
      <Input
        autoFocus
        size="xs"
        variant="unstyled"
        placeholder="Status name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onClose}
      />
    </Box>
  )

  return (
    <Button
      size="xs" variant="ghost" colorScheme="purple"
      mt={1}
      onClick={onOpen}
      rightIcon={<Icon as={ChevronRightIcon} width={3} height={3} />}
    >
      Add Status
    </Button>
  )
};

const CategorySection: FC<{ category: StatusCategoryType }> = ({ category }) => {
  const updateStatus = useUpdateStatus();

  const onDrop = (e: any) => {
    const droppedStatus = JSON.parse(e.dataTransfer.getData('status'));
    updateStatus({ ...droppedStatus, category: category.value });
  };

  return (
    <Box
      mb={2}
      onDrop={onDrop}
    >
      <Flex alignItems="center" mb={1}>
        <Text fontSize="xs" fontWeight="bold">{category.label}</Text>
        <Tooltip label={category.description} fontSize="xs">
          <Icon as={InformationCircleIcon} width={3} height={3} ml={1} color="gray.500" />
        </Tooltip>
      </Flex>
      <CategorySectionItems category={category} />
      <AddStatusButton category={category} />
    </Box>
  )
};

const StatusModal: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  
  return (
    <Fragment>
      <Button
        leftIcon={<SettingsIcon mx={0.5} />}
        width="100%"
        variant="ghost"
        onClick={onOpen}
      >
        <Text textAlign="left" flex={1}>Manage status</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent rounded="xl">
          <ModalHeader fontSize="sm" fontWeight="bold">Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap={2}>
            {
              _.map(
                statusCategoryList,
                (category, index) => (
                  <CategorySection key={`status-category-${index}`} category={category} />
                )
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose} size="xs">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
};

export default StatusModal;