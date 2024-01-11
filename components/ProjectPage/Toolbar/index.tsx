import { ArrowBackIcon, ArrowLeftIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Text, Button, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

const ProjectPageToolbar: FC = () => {
  const colorMode = useColorMode().colorMode;

  return (
    <Box
      borderBottom="1px"
      borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      p={4}
      shadow="sm"
    >
      <Button
        variant="outline"
        size="sm"
        as={Link}
        href="/projects"
      >
        <ArrowBackIcon />
        <Text>Projects</Text>
      </Button>
    </Box>
  );
};

export default ProjectPageToolbar;