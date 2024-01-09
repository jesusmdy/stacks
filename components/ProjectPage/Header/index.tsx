'use client';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Input, useColorMode, Tabs, Tab, TabList } from '@chakra-ui/react';
import _ from 'lodash';
import Link from 'next/link';
import { FC, PropsWithChildren, useContext } from 'react';

const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  const colorMode = useColorMode();
  return (
    <Flex
      flexDir="column"
      p={4}
      gap={4}
      bg={colorMode.colorMode === 'light' ? 'gray.50' : 'gray.700'}
      borderBottom="1px"
      borderBottomColor={colorMode.colorMode === 'light' ? 'gray.200' : 'gray.600'}
    >{children}</Flex>
  )
};

const Location: FC = () => {
  const { project } = useContext(ProjectContext);
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/projects">Projects</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{`${_.startCase(_.head(_.split(project.name, ' ')))}...`}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
};

const Navigation: FC = () => {
  const { project } = useContext(ProjectContext);
  const colorMode = useColorMode();
  return (
    <Tabs
      variant="soft-rounded"
      size="sm"
    >
      <TabList>
        <Tab as={Link} href={`/projects/${project.id}`}>Overview</Tab>
        <Tab as={Link} href={`/projects/${project.id}/progress`}>Progress</Tab>
        <Tab as={Link} href={`/projects/${project.id}/settings`}>Settings</Tab>
      </TabList>
    </Tabs>
  );
};

const ProjectHeader: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <Wrapper>
      <Input placeholder="Search by name, description, or tags" variant="filled" />
      <Location />
      <Text fontSize="2xl">{project.name}</Text>
      <Navigation />
    </Wrapper>
  )
};

export default ProjectHeader;