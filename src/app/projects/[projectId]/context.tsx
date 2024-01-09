'use client';

import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { FC, PropsWithChildren, createContext, useMemo, useState } from 'react';
import { ProjectProps, useGetProject } from '../../../../store/projects';
import Link from 'next/link';
import { StatusItem, useGetStatusByProjectId } from '../../../../store/status';

interface ProjectContextProps {
  project: ProjectProps;
  status: StatusItem[];
};

export const ProjectContext = createContext<ProjectContextProps>({} as ProjectContextProps);

const ProjectContextProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const params = useParams<{ projectId: string }>();
  const project = useGetProject(params.projectId);
  const status = useGetStatusByProjectId(params.projectId);

  const valueToProvide = useMemo(
    () => ({
      project,
      status,
    }),
    [project, status],
  )

  if (!project) {
    return (
      <Box>
        <Text>Project not found</Text>
        <Link href="/projects">Go back to projects</Link>
      </Box>
    )
  }
  return (
    <ProjectContext.Provider value={valueToProvide as ProjectContextProps}>
      {children}
    </ProjectContext.Provider>
  )
};

export default ProjectContextProvider;