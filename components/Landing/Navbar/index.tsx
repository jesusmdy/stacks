import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import AppIdentityLogo from '../../Identity/Logo';
import Link from 'next/link';

export const CTAButton: FC<{ colorid?: boolean, content?: string }> = ({ colorid, content = "Get started" }) => {
  return (
    <Button
      as={Link}
      href="/projects"
      colorScheme={colorid ? 'purple' : 'white'}
      variant={colorid ? 'solid' : 'outline'}
      size="md"
      rounded="full"
    >
      {content}
    </Button>
  )
};

const LandingNavbar: FC = () => {
  return (
    <Box>
      <Box h="5vh" display="flex" alignItems="center" width="80%" mx="auto">
        <AppIdentityLogo />
        <Box flex={1} />
        <CTAButton />
      </Box>
    </Box>
  )
};

export default LandingNavbar;