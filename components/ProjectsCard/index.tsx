'use client';

import { Text, Card, CardBody, Flex, Box, Stack, Icon, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { ProjectProps, useProjects } from '../../store/projects';
import _ from 'lodash';
import ProjectDialog from './ProjectDialog';
import { ArrowForwardIcon, ArrowRightIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { DocumentIcon, FolderIcon } from '@heroicons/react/20/solid';

const ProjectItem: FC<{ project: ProjectProps }> = ({ project }) => {
  const projectLink = `/projects/${project.id}`;
  return (
    <Box
      display="flex"
      alignItems="center"
      boxShadow="xs"
      rounded="lg"
      p={2}
      border="1px solid"
      borderColor="inherit"
    >
      <Icon as={DocumentIcon} boxSize={4} mr={2} />
      <Text flex={1} fontSize="xs" fontWeight="semibold" as={Link} href={projectLink}>{project.name}</Text>
      <Button as={Link} href={projectLink} variant="solid" rightIcon={<ArrowForwardIcon />} bg="black" color="white" _hover={{ bg: 'gray.900' }}>
        Access
      </Button>
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
    <Flex direction="column" mt={4}>
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

const HeaderIcon: FC = () => {
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mr={2}
    >
      <Icon
        as={FolderIcon}
        backdropBlur={50}
        zIndex={1}
        boxSize={10}
        border="1px solid"
        borderColor="gray.200"
        rounded="lg"
        p={1}
      />
    </Box>
  )
}

const ProjectsCard: FC = () => {
  return (
    <Card
      width="3xl"
      rounded="xl"
      mx="auto"
      variant="outline"
    >
      <CardBody>
        <Flex>
          <HeaderIcon />
          <Box flex={1}>
            <Text fontSize="lg" fontWeight="bold">Your projects</Text>
            <Text fontSize="xs" color="">
              Select a project to view its tasks or create a new one.
            </Text>
          </Box>
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