import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

// 2. Add your color mode config
const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Steps,
  },
  colors: {
    brand: {
      100: "#A700FF",
      // ...
      900: "#1a202c",
    },
  },
})

export default theme
