import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  InputBase,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import {
  Cancel,
  Settings,
  Notifications,
  Search,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { useState, useContext } from "react";

import AccountMenu from "./AccountMenu.js";
import { ColorModeContext } from "../App.js";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [settinsOpen, setSettinsOpen] = useState(false);

  const classes = useStyles({ searchOpen });

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  //position=static
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Music</Typography>
          <div className={classes.search}>
            <Search className={classes.searchIcon} />
            <InputBase placeholder="Search..." className={classes.input} />
            {searchOpen && (
              <IconButton color="inherit" onClick={() => setSearchOpen(false)}>
                <Cancel />
              </IconButton>
            )}
          </div>
          <div className={classes.icons}>
            <IconButton
              color="inherit"
              onClick={() => setSearchOpen(true)}
              className={classes.searchButton}
            >
              <Search className={classes.searchButton} />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => setSettinsOpen(true)}>
              <Settings />
            </IconButton>
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <Avatar />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AccountMenu
        anchorEl={anchorEl}
        handleClose={() => {
          setAnchorEl(null);
        }}
      />
      <Modal open={settinsOpen} onClose={() => setSettinsOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            width: 300,
            height: "100vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: theme.spacing(2),
            color: "text.primary",
          }}
        >
          <Typography variant="h4" component="h2">
            Settings
          </Typography>
          <Box
            sx={{
              width: "100%",
              color: "text.primary",
            }}
          >
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.searchOpen ? "flex" : "none"),
    },
  },
  input: {
    color: "white",
    width: "100%",
  },
  searchButton: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.searchOpen ? "none" : "flex"),
  },
}));

export default Navbar;
