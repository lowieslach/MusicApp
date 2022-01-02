import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Cancel, Settings, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const classes = useStyles({ searchOpen });
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Music</Typography>
        <div className={classes.search}>
          <Search className={classes.searchIcon} />
          <InputBase placeholder="Search..." className={classes.input} />
          {searchOpen && (
            <IconButton
              color="inherit"
              onClick={() => setSearchOpen(false)}
              className={classes.cancel}
            >
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
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton>
            <Avatar alt="USER NAME" src="" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
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
  cancel: {
    margin: "0px",
    paddin: "0px",
  },
  searchButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.searchOpen ? "none" : "flex"),
  },
}));

export default Navbar;
