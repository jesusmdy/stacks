'use client';

import { Text, Card, CardBody, Flex, Box, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { ProjectProps, useProjects } from '../../store/projects';
import _ from 'lodash';
import ProjectDialog from './ProjectDialog';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const ProjectItem: FC<{ project: ProjectProps }> = ({ project }) => {
  return (
    <Box
      as={Link}
      href={`/projects/${project.id}`}
      display="flex"
      alignItems="center"
      p={2}
      borderBottom="1px"
      borderColor="gray.200"
      _last={{ borderBottom: 'none' }}
      _hover={{ color: 'purple.500' }}
    >
      <Text flex={1} fontSize="xs" fontWeight="semibold">{project.name}</Text>
      <ChevronRightIcon />
    </Box>
  );
};

const Projects: FC = () => {
  const projects = useProjects();

  if (_.isEmpty(projects)) return (
    <Box
      border="1px"
      borderColor="gray.100"
      borderRadius="md"
      p={2}
      mt={4}
      fontSize="xs"
      textAlign="center"
    >
      There are no projects. Start by creating a new one
    </Box>
  )

  return (
    <Card size="xs" mt={4}>
      <CardBody p={0}>
        <Flex direction="column">
          {
            _.map(
              projects,
              (project) => (
                <ProjectItem key={project.id} project={project} />
              )
            )
          }
        </Flex>
      </CardBody>
    </Card>
  )
};

const ProjectsCard: FC = () => {
  return (
    <Card
      width="md"
      rounded="xl"
    >
      <CardBody>
        <Flex flexDir="column">
          <Text fontSize="xl" fontWeight="bold">Projects</Text>
          <Text fontSize="xs" >A simple project management tool.</Text>
        </Flex>
        <Projects />
        <Flex mt={4}>
          <Box flex={1} />
          <ProjectDialog />
        </Flex>
      </CardBody>
    </Card>
  )
};

export default ProjectsCard;