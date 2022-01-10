import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  InputBase,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import {
  Cancel as CancelIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useState } from "react";

import AccountMenu from "./AccountMenu.js";
import SettingsMenu from "./SettingsMenu.js";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [settinsOpen, setSettinsOpen] = useState(false);

  const classes = useStyles({ searchOpen });
  //position=static
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">MUSIC</Typography>
          <div className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase placeholder="Search..." className={classes.input} />
            {searchOpen && (
              <IconButton color="inherit" onClick={() => setSearchOpen(false)}>
                <CancelIcon />
              </IconButton>
            )}
          </div>
          <div className={classes.icons}>
            <IconButton
              color="inherit"
              onClick={() => setSearchOpen(true)}
              className={classes.searchButton}
            >
              <SearchIcon className={classes.searchButton} />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => setSettinsOpen(true)}>
              <SettingsIcon />
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
      <SettingsMenu open={settinsOpen} setOpen={setSettinsOpen} />
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
