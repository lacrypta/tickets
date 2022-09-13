import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
// import { createTheme } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#9c0000",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: "Share",
  },
  spacing: 12,
  direction: "rtl",
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiAppBar: {
      color: "secondary",
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
    MuiTooltip: {
      arrow: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        background: "linear-gradient(45deg, #DD6B8B 30%, #DD8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(200, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px",
      },
    },
  },
};
