import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import Drawer from "./Drawer";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  fonts: {
    heading: `'Segoe UI', sans-serif`,
    body: `'Segoe UI', sans-serif`,
    subHeading: `'Segoe UI', sans-serif`,
  },
  config,
  components: {
    Drawer,
  },
});

export default theme;
