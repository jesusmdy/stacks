'use client';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import { Text, Card, CardBody, CardHeader, GridItem, useConst, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useContext } from 'react';

export const ProjectTags: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <Card>
      <CardHeader fontSize="large" fontWeight="bold">Tags</CardHeader>
      <CardBody>
        <Text>You don&apos;t have tags yet</Text>
      </CardBody>
    </Card>
  );
}

export const ProjectOverview: FC = () => {
  const { project } = useContext(ProjectContext);

  const info = [
    {
      name: 'Description',
      value: project.description || 'No description'
    },
    {
      name: 'Created at',
      value: new Date(project.createdAt).toLocaleString()
    }
  ];

  return (
    <Card>
      <CardHeader fontSize="large" fontWeight="bold">Overview</CardHeader>
      <CardBody display="flex" gap={4} flexDir="column">
        {
          _.map(info, (item, index) => (
            <Box key={index}>
              <Text fontWeight="bold">{item.name}</Text>
              <Text fontSize="small">{item.value}</Text>
            </Box>
          ))
        }
      </CardBody>
    </Card>
  );
};