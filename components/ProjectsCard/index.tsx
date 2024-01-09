'use client';

import { Text, Card, CardBody, Flex, Box } from '@chakra-ui/react';
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
      fontSize="sm"
      fontFamily="monospace"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
    >
      <Text flex={1}>{project.name}</Text>
      <ChevronRightIcon />
    </Box>
  );
};

const Projects: FC = () => {
  const projects = useProjects();

  if (_.isEmpty(projects)) return (
    <Box
      border="1px"
      borderColor="gray.200"
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
    <Flex
      mt={4}
      flexDir="column"
      gap={2}
      p={2}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
    >
      {
        _.map(
          projects,
          (project) => (
            <ProjectItem key={project.id} project={project} />
          )
        )
      }
    </Flex>
  )
};

const ProjectsCard: FC = () => {
  return (
    <Card
      width="md"
      variant="outline"
    >
      <CardBody>
        <Flex flexDir="column" gap={2}>
          <Text fontSize="xl" fontWeight="bold">Projects</Text>
          <Text fontSize="sm" fontFamily="monospace">A simple project management tool.</Text>
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