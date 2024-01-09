'use client'
import { Box, Card, CardBody, Text, useColorMode } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import ProjectsCard from '../../../components/ProjectsCard';

const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  const scheme = useColorMode();
  return (
    <Box
      width="100dvw"
      height="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={scheme.colorMode === 'dark' ? 'gray.900' : 'gray.100'}
    >
      {children}
    </Box>
  );
};

const ProjectsPage: FC = () => {
  return (
    <Wrapper>
      <ProjectsCard />
    </Wrapper>
  );
};

export default ProjectsPage;