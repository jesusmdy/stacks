import { ComponentStyleConfig, extendTheme, type ThemeConfig } from '@chakra-ui/react'

export const bgByColorMode = (colorMode: string) => ({
  light: '#fcfcfd',
  dark: 'gray.900',
}[colorMode]);

const CardStyle: ComponentStyleConfig = {
  defaultProps: {
    size: 'sm',
    rounded: 'xl',
  }
};

const ButtonStyle: ComponentStyleConfig = {
  defaultProps: {
    size: 'xs',
    variant: 'outline',
  }
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  components:  {
    Card: CardStyle,
    Button: ButtonStyle,
  },
})

export default theme