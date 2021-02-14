import { createMuiTheme } from "@material-ui/core/styles";

export const light_theme = createMuiTheme({
  palette: {
    type: "light",
  },
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});

export const dark_theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "yellow",
        }
      }
    },
  }
});