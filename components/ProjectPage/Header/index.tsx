'use client';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Input, useColorMode, Tabs, Tab, TabList, Card, CardBody, Icon } from '@chakra-ui/react';
import { HomeIcon } from '@heroicons/react/16/solid';
import { AdjustmentsHorizontalIcon, CheckIcon, RectangleStackIcon } from '@heroicons/react/20/solid';
import { ChartPieIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import Link from 'next/link';
import { FC, Fragment, PropsWithChildren, useContext } from 'react';

const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <Card borderRadius="xl" m={4} size="sm">
      <CardBody>
        {children}
      </CardBody>
    </Card>
  )
};

export const Navigation: FC = () => {
  const { project } = useContext(ProjectContext);
  return (
    <Tabs variant="soft-rounded" size="sm" colorScheme="purple">
      <TabList>
        <Tab as={Link} href={`/projects/${project.id}`}>
          <Icon as={ChartPieIcon} mr={2} />
          <Text>Overview</Text>
        </Tab>
        <Tab as={Link} href={`/projects/${project.id}/progress`}>
          <Icon as={RectangleStackIcon} mr={2} />
          <Text>Progress</Text>
        </Tab>
        <Tab as={Link} href={`/projects/${project.id}/settings`}>
          <Icon as={AdjustmentsHorizontalIcon} mr={2} />
          <Text>Settings</Text>
        </Tab>
      </TabList>
    </Tabs>
  );
};

const ProjectHeader: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <Fragment>
      <Wrapper>
        <Text fontSize="2xl" mb={2}>{project.name}</Text>
        <Navigation />
      </Wrapper>
    </Fragment>
  )
};

export default ProjectHeader;