'use client'
import { Text, Box, List, ListItem, Flex, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { useProjects } from '../../../store/projects';
import { DocumentIcon, FolderIcon } from '@heroicons/react/20/solid';

const SidebarHeader: FC = () => {
  return (
    <Box h={12} p={4}>
      <Text fontWeight="bold" fontSize="sm">Spaces</Text>
    </Box>
  );
};

const ProjectList: FC = () => {
  const projectList = useProjects();

  if (!projectList) return null
  return (
    <Box m={4} h="100%">
      <Flex alignItems="center" gap={1} w="100%">
        <Icon as={FolderIcon} w={3} h={3} />
        <Text fontSize="xs" as={Link} href="/projects">Projects</Text>
      </Flex>
      <List
        my={2}
        ml={2}
      >
        {
          projectList.map((project) => {
            return (
              <ListItem key={project.id} fontSize="sm" as={Link} href={`/projects/${project.id}`} display="flex" alignItems="center" gap={1}>
                <Icon as={DocumentIcon} w={3} h={3} />
                <Text fontSize="xs" fontWeight="bold">{project.name}</Text>
              </ListItem>
            );
          })
        }
      </List>
    </Box>
  );
};

const LayoutSidebar: FC = () => {
  return (
    <Box w="15%" bg="white" borderRight="1px solid" borderColor="pink.50">
      <SidebarHeader />
      <ProjectList />
    </Box>
  );
};

export default LayoutSidebar;