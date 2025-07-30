import {
  createTheme,
  darken,
  lighten,
  responsiveFontSizes,
} from "@mui/material/styles";
import { red, grey, common } from "@mui/material/colors";

// Augment the Palette and PaletteOptions to include a 'glow' color and 'gradients'
declare module "@mui/material/styles" {
  interface Palette {
    glow: Palette["primary"];
    gradients: {
      darkPrimary: string;
      redButton: string;
    };
  }
  interface PaletteOptions {
    glow?: PaletteOptions["primary"];
    gradients?: {
      darkPrimary?: string;
      redButton?: string;
    };
  }
}

// Augment the Alert component styles for custom shadows
declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    info: true;
    success: true;
    warning: true;
    error: true;
  }
}

// Custom shadow for cards
const createCardShadow = (color: string) =>
  `0px 8px 18px rgba(0, 0, 0, 0.7), 0px 0px 15px ${color}40`;

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: red[700], // Netflix red
      light: red[500],
      dark: red[900],
      contrastText: common.white,
    },
    secondary: {
      main: grey[500],
      light: grey[400],
      dark: grey[700],
      contrastText: common.white,
    },
    background: {
      default: "#141414",
      paper: "#1F1F1F",
    },
    text: {
      primary: common.white,
      secondary: grey[400],
      disabled: grey[600],
    },
    error: {
      main: red[600],
      contrastText: common.white,
    },
    warning: {
      main: "#FFC107",
      contrastText: common.black,
    },
    info: {
      main: "#2196F3",
      contrastText: common.white,
    },
    success: {
      main: "#4CAF50",
      contrastText: common.white,
    },
    divider: grey[800],
    glow: {
      main: red[500],
      light: red[300],
      dark: red[700],
      contrastText: common.white,
    },
    gradients: {
      // CHANGED: Removed gradient, set to solid background color
      darkPrimary: `#141414`, // or theme.palette.background.default if you prefer
      redButton: `linear-gradient(90deg, ${red[800]} 0%, ${red[600]} 100%)`,
    },
  },
  typography: {
    fontFamily: ["Inter", "Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.8rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.2rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.8rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.2rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: grey[400],
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {},
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px !important",
          paddingRight: "16px !important",
          "@media (min-width: 600px)": {
            paddingLeft: "24px !important",
            paddingRight: "24px !important",
          },
          "@media (min-width: 960px)": {
            paddingLeft: "32px !important",
            paddingRight: "32px !important",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 4,
          fontWeight: 600,
          padding: "12px 24px",
          transition:
            "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out",
          "&:active": {
            transform: "scale(0.98)",
          },
        }),
        containedPrimary: ({ theme }) => ({
          background: theme.palette.gradients.redButton,
          color: theme.palette.primary.contrastText,
          boxShadow: `0 6px 15px ${theme.palette.primary.main}40`,
          "&:hover": {
            background: theme.palette.gradients.redButton,
            filter: "brightness(1.1)",
            boxShadow: `0 8px 20px ${theme.palette.primary.main}60`,
          },
          "&.Mui-disabled": {
            background: grey[700],
            color: grey[500],
            boxShadow: "none",
          },
        }),
        outlinedPrimary: ({ theme }) => ({
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          "&:hover": {
            borderColor: theme.palette.primary.light,
            color: theme.palette.primary.light,
            backgroundColor: "rgba(229, 9, 20, 0.08)",
          },
        }),
        textPrimary: ({ theme }) => ({
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "rgba(229, 9, 20, 0.04)",
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiInputBase-input": {
            color: theme.palette.text.primary,
            padding: "12px 14px",
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px ${darken(
                theme.palette.background.paper,
                0.2
              )} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
              caretColor: theme.palette.text.primary,
            },
          },
          "& .MuiInputLabel-root": {
            color: grey[500],
            "&.Mui-focused": {
              color: theme.palette.primary.light,
            },
            "&.Mui-error": {
              color: theme.palette.error.light,
            },
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            backgroundColor: darken(theme.palette.background.paper, 0.05),
            "& fieldset": {
              borderColor: grey[700],
              transition:
                "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            },
            "&:hover fieldset": {
              borderColor: grey[500],
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
              borderWidth: "1px",
            },
            "&.Mui-error fieldset": {
              borderColor: theme.palette.error.main,
            },
          },
          "& .MuiFormHelperText-root": {
            color: theme.palette.error.light,
          },
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.4)`,
          fontWeight: 500,
          fontSize: "0.9rem",
          padding: "12px 16px",
        }),
        standardError: ({ theme }) => ({
          backgroundColor: red[900],
          color: common.white,
          "& .MuiAlert-icon": {
            color: common.white,
          },
        }),
        standardInfo: ({ theme }) => ({
          backgroundColor: lighten(theme.palette.info.dark, 0.2),
          color: common.white,
          "& .MuiAlert-icon": {
            color: common.white,
          },
        }),
        standardSuccess: ({ theme }) => ({
          backgroundColor: lighten(theme.palette.success.dark, 0.2),
          color: common.white,
          "& .MuiAlert-icon": {
            color: common.white,
          },
        }),
        standardWarning: ({ theme }) => ({
          backgroundColor: lighten(theme.palette.warning.dark, 0.2),
          color: common.white,
          "& .MuiAlert-icon": {
            color: common.white,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          background: theme.palette.background.paper,
          boxShadow: createCardShadow(theme.palette.primary.main),
          transition: "box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: createCardShadow(theme.palette.primary.light),
          },
        }),
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.light,
          textDecoration: "none",
          fontWeight: 600,
          transition: "color 0.2s ease-in-out",
          "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "rgba(229, 9, 20, 0.1)",
          color: theme.palette.primary.light,
          borderColor: theme.palette.primary.dark,
          border: `1px solid ${theme.palette.primary.dark}`,
          fontWeight: 500,
          borderRadius: 4,
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(229, 9, 20, 0.25)",
          },
        }),
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        }),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;