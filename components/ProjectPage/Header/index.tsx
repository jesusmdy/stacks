'use client';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { Link } from '@chakra-ui/next-js';
import { Text, Tabs, Tab, TabList, Card, CardBody, Icon, Flex } from '@chakra-ui/react';
import { ListBulletIcon, ViewColumnsIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import { FC, Fragment, PropsWithChildren, useContext, useMemo } from 'react';
import NewTaskDialog from '../../NewTaskDialog';
import { StatusItem, useGetStatusByProjectId } from '../../../store/status';

const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <Card borderRadius="xl" m={4} size="sm">
      <CardBody p={0}>
        {children}
      </CardBody>
    </Card>
  )
};

export const TaskButton: FC = () => {
  const { project } = useContext(ProjectContext);
  const statusList = useGetStatusByProjectId(project.id);

  const defaultStatus = useMemo(() => {
    return _.first(_.flatten(statusList)) as StatusItem;
  }, [statusList]);

  if (!defaultStatus) return null;
  return (
    <NewTaskDialog status={defaultStatus} />
  )
};

export const Navigation: FC = () => {
  const { project } = useContext(ProjectContext);
  
  return (
    <Flex
      borderTop="1px solid"
      borderColor="inherit"
      px={4}
      py={2}
    >
      <Tabs variant="soft-rounded" size="sm" colorScheme="purple">
        <TabList>
          <Tab as={Link} href={`/projects/${project.id}/list`}>
            <Icon as={ListBulletIcon} mr={2} />
            <Text>List</Text>
          </Tab>
          <Tab as={Link} href={`/projects/${project.id}/board`} disabled>
            <Icon as={ViewColumnsIcon} mr={2} />
            <Text>Board</Text>
          </Tab>
        </TabList>
      </Tabs>
      <Flex flex={1} borderLeft="1px solid" borderColor="inherit" px={4} alignItems="center">
      </Flex>
      <TaskButton />
    </Flex>
  );
};

const ProjectHeader: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <Fragment>
      <Wrapper>
        <Text fontSize="xl" m={4}>{project.name}</Text>
        <Navigation />
      </Wrapper>
    </Fragment>
  )
};

export default ProjectHeader;