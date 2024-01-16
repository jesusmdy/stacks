import { ArrowBackIcon, ArrowLeftIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Text, Button, useColorMode, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import AppIdentityLogo from '../../Identity/Logo';

const ProjectPageToolbar: FC = () => {
  const colorMode = useColorMode().colorMode;

  return (
    <Box
      borderBottom="1px"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      p={4}
      shadow="sm"
      display="flex"
      alignItems="center"
      height="5vh"
    >
      <AppIdentityLogo size="sm" />
      <Divider orientation="vertical" mx={4} />
      <Button
        variant="link"
        colorScheme="purple"
        size="xs"
        as={Link}
        href="/projects"
        leftIcon={<ArrowBackIcon />}
      >
        <Text>Projects</Text>
      </Button>
    </Box>
  );
};

export default ProjectPageToolbar;