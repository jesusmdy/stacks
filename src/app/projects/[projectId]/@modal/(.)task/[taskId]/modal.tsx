'use client'

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import { createPortal } from 'react-dom'
import { useGetTaskByID } from '../../../../../../../store/task'
import TaskDetails from '../../../../../../../components/Task/Details'

const TaskModal: FC<{
  taskId: string;
}> = ({ taskId }) => {
  const task = useGetTaskByID(taskId);
  const router = useRouter()
  const isOpen = true
  const onClose = () => {
    router.back()
  }
  return createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader borderBottom="1px solid" borderColor="inherit" px={4} py={3}>
          <Stack direction="row" align="center">
            <IconButton aria-label="next-task-button" size="xs" colorScheme="purple" variant="outline">
              <ChevronDownIcon />
            </IconButton>
            <IconButton aria-label="next-task-button" size="xs" colorScheme="purple" variant="outline">
              <ChevronUpIcon />
            </IconButton>            
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4}>
          {
            task
              ? <TaskDetails task={task} />
              : (
                <Fragment>
                  <Text>Task not found</Text>
                </Fragment>
              )
          }
        </ModalBody>
      </ModalContent>
    </Modal>,
    document.getElementById('task-modal-root') as HTMLElement
  )
}

export default TaskModal