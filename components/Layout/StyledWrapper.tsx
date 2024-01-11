'use client';

import { Flex, useColorMode } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { bgByColorMode } from '../../theme';

const StyledWrapper: FC<PropsWithChildren<any>> = ({ children }) => {
  const colorMode = useColorMode().colorMode;

  return (
    <Flex direction="column" height="100dvh" bg={bgByColorMode(colorMode)} overflow="auto">{children}</Flex>
  )
};

export default StyledWrapper;