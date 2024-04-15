import palette from "./palette";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { extendTheme } from "@mui/joy";

declare module "@mui/joy/Input" {
  interface InputPropsColorOverrides {
    support: true;
  }
}
declare module "@mui/joy/IconButton" {
  interface IconButtonPropsColorOverrides {
    support: true;
  }
}

import type { PaletteRange } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    neutral: true;
  }

  interface Palette {
    neutral: PaletteRange;
  }
}

const theme = extendTheme({
  cssVarPrefix: "bs",
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },
  fontFamily: {
    body: "'Roboto', var(--joy-fontFamily-fallback)",
  },
  components: {
    JoyIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "support" && {
            color: "#FFFFFF",
          }),
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "support" && {
            backgroundColor: "#161B4B",
            color: "#FFFFFF",
          }),
        }),
      },
    },
  },
});

export default theme;
