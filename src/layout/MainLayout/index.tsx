import { useDispatch } from "react-redux";
import { styled, Theme, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { drawerWidth } from "store/constant";
import { SET_MENU } from "store/actions";
import { useAppSelector } from "hooks";
import { RootState } from "store";

declare module "@mui/material/styles" {
  interface Theme {
    typography: {
      mainContent: {
        width: string;
        minHeight: string;
        flexGrow: string;
        padding: string;
        marginTop: string;
        marginRight: string;
      };
    };
  }
}

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 72),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children }: { children: JSX.Element }) => {
  const theme = useTheme();
  // Handle left drawer
  const leftDrawerOpened = useAppSelector(
    (state: RootState) => state.customizationReducer?.opened
  );
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* <CssBaseline /> */}

      {/* drawer */}
      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened}>
        {children}
      </Main>
    </Box>
  );
};

export default MainLayout;
