'use client'
import React, { FC, PropsWithChildren } from 'react';
import ProjectContextProvider from './context';
import ProjectHeader from '../../../../components/ProjectPage/Header';
import { Box } from '@chakra-ui/react';
import ProjectPageToolbar from '../../../../components/ProjectPage/Toolbar';
import StyledWrapper from '../../../../components/Layout/StyledWrapper';

const ProjectLayout: FC<PropsWithChildren<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>> = (props) => {
  return (
    <ProjectContextProvider>
      <StyledWrapper>
        <ProjectPageToolbar />
        <Box width={{ base: '100%', md: '80%' }} mx="auto">
          <ProjectHeader />
          <Box flex={1}>{props.children}</Box>
          {props.modal}
          <div id="task-modal-root" />
        </Box>
      </StyledWrapper>
    </ProjectContextProvider>
  );
};

export default ProjectLayout;