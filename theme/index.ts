import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import Button from "./Button";
import Drawer from "./Drawer";
import Heading from "./Heading";
import Input from "./Input";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  fonts: {
    heading: `'Segoe UI', sans-serif`,
    body: `'Segoe UI', sans-serif`,
    subHeading: `'Segoe UI', sans-serif`,
  },
  config,
  components: {
    Drawer,
    Heading,
    Input,
    Button
  },
});

export default theme;
