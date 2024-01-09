'use client'
import { Box, Flex, Text } from '@chakra-ui/react';
import { ProjectContext } from '../context';
import { useContext } from 'react';
import _ from 'lodash';
import StatusLayout from '../../../../../components/Status';

const EmptyPlaceholder = () => (
  <Box
    display="flex"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    height="40vh"
  >
    <Text fontSize="large" fontWeight="bold">You don&apos;t have any status set</Text>
    <Text fontSize="sm">Set status to your project to track your progress</Text>
  </Box>
)

const ProjectProgressPage = () => {
  const { status } = useContext(ProjectContext);
  
  if (_.isEmpty(status)) return <EmptyPlaceholder />

  return (
    <Flex
      gap={4}
      bg="gray.900"
      height="100%"
      padding={4}
    >
      {
        _.map(status, (status, index) => (
          <StatusLayout key={index} status={status} />
        ))
      }
    </Flex>
  )
};

export default ProjectProgressPage;