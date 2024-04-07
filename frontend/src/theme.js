import { createTheme } from "@mui/material/styles";

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#f7931E", // Example primary color
    },
    secondary: {
      main: "#1e1e1e", // Example secondary color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Example font family
  },
  // You can customize other theme properties here
});

export default theme;
export const Colors = {
  primary: "#ff5003",
  secondary: "242325",

  //pramary shades
  org1: "#FF8841",
  org2: "#FF985C",
  org3: "#ffa570",
  org4: "#FFE9CC",
  org5: "#ffe4d6",
  org6: "#FFF2EB",
  orgchat: "#fec741",
  orgchatsub: "#9e845c",
  chatdark: "#241e31",
  //grey
  Inborder: "#D0D5DD",
  InPholder: "#667085",
  dimgrey: "#696969",
  dovegrey: "#d5d5d5",
  grey: "#BEBEBE",
  platinum: "#E5E4E2",

  bg: "#fffafa",
};
