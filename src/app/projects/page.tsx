'use client'
import { Box, Card, CardBody, Icon, Text, useColorMode } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import ProjectsCard from '../../../components/ProjectsCard';
import { bgByColorMode } from '../../../theme';
import { Square3Stack3DIcon } from '@heroicons/react/20/solid';
import AppIdentityLogo from '../../../components/Identity/Logo';

const Toolbar: FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      height="8vh"
      gap={2}
    >
      <AppIdentityLogo />
    </Box>
  );
};

const Header: FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="15vh"
      gap={2}
    >
      <Text fontSize="2xl">
        Welcome to Stacks
      </Text>
      <Text>
        Track, manage and collaborate on your projects progress with ease.
      </Text>
    </Box>
  );
}

const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  const scheme = useColorMode();
  return (
    <Box
      height="100dvh"
      bg={bgByColorMode(scheme.colorMode)}
      bgImage={`radial-gradient(rgba(25, 25, 25, 0.1) 1px, transparent 0)`}
      bgSize="40px 40px"
      bgPos="0 0, 19px 19px"
    >
      {children}
    </Box>
  );
};

const ProjectsPage: FC = () => {
  return (
    <Wrapper>
      <Box width={{ base: '100%', md: '80%' }} mx="auto">
        <Toolbar />
        <Header />
        <ProjectsCard />
      </Box>
    </Wrapper>
  );
};

export default ProjectsPage;