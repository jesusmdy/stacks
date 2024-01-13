'use client'
import { Box, Card, CardBody, Text, useColorMode } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import ProjectsCard from '../../../components/ProjectsCard';
import { bgByColorMode } from '../../../theme';

const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  const scheme = useColorMode();
  return (
    <Box
      width="100dvw"
      height="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bgByColorMode(scheme.colorMode)}
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