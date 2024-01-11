'use client'
import { Box, Card, CardBody, CardHeader, Flex, Text, useColorMode } from '@chakra-ui/react';
import { ProjectContext } from '../context';
import { useContext } from 'react';
import _ from 'lodash';
import StatusLayout from '../../../../../components/Status';
import { bgByColorMode } from '../../../../../theme';

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
  const colorMode = useColorMode().colorMode;
  
  if (_.isEmpty(status)) return <EmptyPlaceholder />

  return (
    <Box
      bg={bgByColorMode(colorMode)}
      height="100%"
      p={4}
    >
      <Card
        size="sm"
        borderRadius="xl"
      >
        <CardHeader
          borderBottom="1px solid"
          borderColor="gray.100"
          paddingY={2}
        >
          <Text fontSize="sm" fontWeight="bold">Tasks</Text>
        </CardHeader>
        <CardBody>
          <Flex flexDir="column" gap={2}>
            {
              _.map(status, (status, index) => (
                <StatusLayout key={index} status={status} />
              ))
            }
          </Flex>
        </CardBody>
      </Card>
    </Box>
  )
};

export default ProjectProgressPage;