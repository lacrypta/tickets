import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
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
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
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
    MuiButtonGroup: {
      defaultProps: { size: "small" },
    },
    MuiCheckbox: {
      defaultProps: { size: "small" },
    },
    MuiFab: {
      defaultProps: { size: "small" },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
    MuiFormHelperText: {
      defaultProps: { margin: "dense" },
    },
    MuiIconButton: {
      defaultProps: { size: "small" },
    },
    MuiInputBase: {
      defaultProps: { margin: "dense" },
    },
    MuiInputLabel: {
      defaultProps: { margin: "dense" },
    },
    MuiRadio: {
      defaultProps: { size: "small" },
    },
    MuiSwitch: {
      defaultProps: { size: "small" },
    },
    MuiTextField: {
      defaultProps: { margin: "dense", size: "small" },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
});
