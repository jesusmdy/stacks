import { FC, Fragment, PropsWithChildren } from 'react';
import ProjectContextProvider from './context';
import ProjectHeader from '../../../../components/ProjectPage/Header';
import { Box, Flex } from '@chakra-ui/react';

const ProjectLayout: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <ProjectContextProvider>
      <Flex direction="column" height="100dvh">
        <ProjectHeader />
        <Box flex={1}>{children}</Box>
      </Flex>
    </ProjectContextProvider>
  );
};

export default ProjectLayout;