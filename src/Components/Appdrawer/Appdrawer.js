import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./useStyles";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Logo from "../Logo/Logo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Auctionlogo from '../Drawerlogo/Auctionlogo';
import Playerlogo from '../Drawerlogo/Playerlogo';
import Matcheslogo from '../Drawerlogo/Matcheslogo';
import { useLocation } from "react-router-dom";
import Auctiontable from '../AuctionTable/AuctionTable';
import Playerstable from '../PlayersTable/PlayersTable';
import Matchestable from '../IPL-MatchesTable/IPL-MatchesTable';

export default function Appdrawer(){
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();  
    const location = useLocation();

    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openM = Boolean(anchorEl);


    const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };    
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleLogout = () => {
        localStorage.clear();
        history.push("/");
      };


      const handleMenuClick = (name) => {
        if (name === "IPL-Auction") {
          history.push("/auction-table");
        }
        if (name === "Players") {
          history.push("/players-table");
        }
        if (name === "IPL-Matches") {
            history.push("/ipl-matches");
          }
        };
    

    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
            >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                    })}
                >
                <MenuIcon style={{ color: "#3497FD" }} />
                </IconButton>
                {auth && (
                    <div className={classes.adminLogo}>
                        <IconButton 
                        aria-label="account of current user" 
                        aria-controls="menu-appbar"
                        className={classes.adminheader}
                        color="inherit"
                        aria-haspopup="true"
                        >
                            Admin
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                        <Avatar alt="Admin" src="" /> 
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                            }}
                            open={openM}
                            onClose={handleClose}
                            >
                        <MenuItem>
                          Admin
                          </MenuItem>
                         <MenuItem>
                          <small>view personal profile details</small>
                          </MenuItem>
                          <MenuItem>
                          <button className={classes.logoutbutton} onClick={handleLogout}>Sign out</button>
                          </MenuItem>                        
                        </Menu>
                    </div>
                )}
            </Toolbar>
            </AppBar> 
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
                <Logo height="60px" />
                <Typography variant="h6" className={classes.iplName}>
                 IPL 2021
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                   {theme.direction === "rtl" ? ( <ChevronRightIcon /> ) : (  <ChevronLeftIcon /> )}
                </IconButton>
            </div>           
            <Divider />
            <List>
          <>
            {[
              { name: "IPL-Auction", logo: <Auctionlogo /> },
              { name: "Players", logo: <Playerlogo /> },
              { name: "IPL-Matches", logo: <Matcheslogo /> },             
            ].map((menu, index) => (
              <ListItem
                button
                key={menu.name}
                onClick={() => handleMenuClick(menu.name)}
                className={classes.listHoverStyle}
              >
                <ListItemIcon className={classes.iconHoverStyle}>
                  {menu.logo}
                </ListItemIcon>
                <ListItemText primary={menu.name}/>
              </ListItem>
            ))}
          </>   
          </List>         
          </Drawer>
          
        <main className={classes.content}>
            {location.pathname === "/auction-table" && <Auctiontable />}
            {location.pathname === "/players-table" && <Playerstable />}
            {location.pathname === "/ipl-matches" && <Matchestable />}
    
        </main> 
        </div>       
    );
}
