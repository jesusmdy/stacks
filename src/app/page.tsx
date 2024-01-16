'use client'
import { Box, Flex, useColorMode, Text } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import LandingNavbar, { CTAButton } from '../../components/Landing/Navbar';

const Wrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  const scheme = useColorMode();
  return (
    <Box
      width="100dvw"
      height="100dvh"
      display="flex"
      flexDir="column"
      bg="gray.900"
      color="white"
      bgImage={`radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)`}
      bgSize="40px 40px"
      bgPos="0 0, 19px 19px"
    >
      {children}
    </Box>
  );
};

const LandingPage: FC = () => {
  return (
    <Wrapper>
      <LandingNavbar />
      <Flex direction="column" alignItems="center" h="50vh" justifyContent="center">
        <Box mb={12}>
          <Text fontSize="6xl" fontWeight="bold">Track. Organize. Success</Text>
          <Text fontSize="lg">
            A simple and easy way to use task manager for your personal and professional life.
          </Text>
        </Box>
        <CTAButton colorid content="Create a project" />
      </Flex>
    </Wrapper>
  );
};

export default LandingPage;