'use client';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { Card, CardBody, CardHeader, Text, useColorMode } from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useContext } from 'react';
import { SEVERITY, StatusItem } from '../../../../store/status';
import { BellIcon } from '@chakra-ui/icons';

export const SEVERITY_COLOR = {
  [SEVERITY.error]: 'red.500',
  [SEVERITY.warning]: 'yellow.500',
  [SEVERITY.info]: 'blue.500',
  [SEVERITY.success]: 'green.500',
}

const StatusItemComponent: FC<{ status: StatusItem }> = ({ status }) => {
  return (
    <Card
      size="sm"
      gap={4}
    >
      <CardBody display="flex" alignItems="center">
        <BellIcon color={SEVERITY_COLOR[status.severity]} />
        <Text flex="1">{status.name}</Text>
      </CardBody>
    </Card>
  );
}

export const ProjectTaskStatus: FC = () => {
  const { status } = useContext(ProjectContext);
  const colorMode = useColorMode();

  return (
    <Card>
      <CardHeader fontSize="large" fontWeight="bold">Status</CardHeader>
      <CardBody
        bg={colorMode.colorMode === 'light' ? 'gray.100' : 'gray.900'}
        roundedBottom="md"
        gap={2}
        display="flex"
        flexDir="column"
      >
        {
          _.isEmpty(status) && <Text>You don&apos;t have statuses yet</Text>
        }
        {
          _.map(
            status,
            (status) => (
              <StatusItemComponent key={status.id} status={status} />
            )
          )
        }
      </CardBody>
    </Card>
  );
}

export default ProjectTaskStatus;