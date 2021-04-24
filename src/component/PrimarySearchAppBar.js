import React, {useContext, useEffect, useState} from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";
import {StoreContext} from "../store/storeProvider";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import purple from "@material-ui/core/colors/purple";
import cyan from "@material-ui/core/colors/cyan";
import indigo from "@material-ui/core/colors/indigo";
import LoginComponent from "./LoginComponent";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchService from "../service/SearchService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    padding: "30px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.0),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "300px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoutButton: {
    marginLeft: theme.spacing(3)
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user, setUser } = useContext(StoreContext);

  useEffect(() => setMobileMoreAnchorEl(null), [user])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(indigo[800]),
      backgroundColor: indigo[900],
      '&:hover': {
        backgroundColor: cyan[800],
        color: theme.palette.getContrastText(cyan[600]),

      },
    },
  }))(Button);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => setUser(null)}>
        <IconButton color="inherit">

            <ExitToAppIcon />
          </IconButton>
          <p>Sign out</p>

        {/*<ColorButton onClick={() => setUser(null)} component={Link} to="/" variant="contained" color="primary" className={classes.logoutButton}>*/}
        {/*  LOGOUT*/}
        {/*</ColorButton>*/}
      </MenuItem>
    </Menu>
  );

  const renderMiniDrawer = (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const [plants, setPlants] = useState([]);

  function handleSearchInput(event) {
    let name = event.target.value
    SearchService.searchPlant(name).then( response => {
      console.log(response.data)
      setPlants(response.data)
    })

  }


  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {user ? <IconButton
              edge="start"
              onClick={handleDrawerOpen}
              color="inherit"
              aria-label="open drawer"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
          >
            <MenuIcon/>
          </IconButton> : null}
          <Typography className={classes.title} variant="h6" noWrap>
            Plant Manager
          </Typography>
          {user ? <div
              // className={classes.search}
          >
            {/*<div className={classes.searchIcon}>*/}
            {/*  <SearchIcon/>*/}
            {/*</div>*/}
            {/*<InputBase placeholder="Search…"*/}
            {/*           classes={{*/}
            {/*             root: classes.inputRoot,*/}
            {/*             input: classes.inputInput,*/}
            {/*           }}*/}
            {/*           inputProps={{"aria-label": "search"}}*/}
            {/*           onChange={handleSearchInput}*/}
            {/*>*/}



            {/*  /!*<Autocomplete*!/*/}
            {/*  /!*    id="free-solo-demo"*!/*/}
            {/*  /!*    freeSolo*!/*/}
            {/*  /!*    options={plants.map((option) => option.name)}*!/*/}
            {/*  /!*    renderInput={(params) => (*!/*/}
            {/*  /!*        <TextField {...params}  label="freeSolo" margin="normal" variant="outlined" />*!/*/}
            {/*  /!*    )}*!/*/}
            {/*  /!*//*/}
            {/*</InputBase>*/}
            <Autocomplete
                // id="free-solo-demo"
                // freeSolo

                options={plants.map((option) => option.name)}
                style={{color: "white"}}

                renderInput={(params) => (
                    <TextField {...params}
                               classes={{
                                 root: classes.inputRoot,
                                 input: classes.inputInput,
                               }}
                               style={{color: "white"}}
                               onChange={handleSearchInput}
                               label="freeSolo" margin="normal" variant="outlined" />
                )}
            />

          </div> : null}
          <div className={classes.grow} />
          {user ? <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon/>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon/>
              </Badge>
            </IconButton>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
              <AccountCircle/>
            </IconButton>
            {<ColorButton onClick={() => {
              setUser(null);
            } } component={Link} to="/" variant="contained" color="primary" className={classes.logoutButton}>
              LOGOUT
            </ColorButton>}
          </div> : null}

          {user ? <><div className={classes.sectionMobile}>
            <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
              <MoreIcon/>
            </IconButton>

          </div>

          </>:
          <>
            {/*<ColorButton component={Link} to="/login" variant="contained" color="primary" className={classes.margin}>*/}
            {/*  LOGIN*/}
            {/*</ColorButton>*/}
            <LoginComponent />
              </>
          }


        </Toolbar>
      </AppBar>
      {user ? renderMobileMenu : null}
      {user ? renderMenu : null}
      {user ? renderMiniDrawer : null}
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
