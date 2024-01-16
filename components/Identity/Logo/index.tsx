import { Box, Text, Icon } from '@chakra-ui/react';
import { Square3Stack3DIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { FC } from 'react';

type LogoSizeType = 'sm' | 'md' | 'lg';

const AppIdentityLogo: FC<{
  size?: string;
}> = ({ size = 'md' }) => {

  const logoSize = {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  }[size as LogoSizeType];

  const logoTextSize = {
    sm: '1xl',
    md: '2xl',
    lg: '4xl',
  }[size as LogoSizeType];

  return (
    <Box display="flex" alignItems="center" gap={2} as={Link} href="/">
      <Icon as={Square3Stack3DIcon} boxSize={logoSize} />
      <Text fontSize={logoTextSize} fontWeight="bold">Stacks</Text>
    </Box>
  )
};

export default AppIdentityLogo;