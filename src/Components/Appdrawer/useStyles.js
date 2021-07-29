import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        margin: "25px 15px",
        padding: 15,
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 0px 20px #0000001A",
        opacity: "1",
  },
  appBarShift: {
    marginLeft: "drawerWidth",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "#519E31",
  },
  hide: {
    display: "none",
  },
  iplName: {
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 10,
    color: "#3497FD",
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
  adminLogo: {
    position: "absolute",
    color: "#519E31",
    left: "94%",
   
  },
  title :{
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  adminheader : {
    position: "absolute",
    right: "90%",
    color : "gray",
    top : 8,
    fontSize :18,

  },
  listHoverStyle: {
    "&:hover": {
      borderRight: "5px solid #3497FD",
    },
  }, 
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position: "relative",
    top: "60%",
    
  },
  logoutmenu :{   
   width : "150px",
   height : "200px",
   margin : "10px"
    
  },
  logoutbutton : {
    backgroundColor : "#2962FF",
    border : "#2962FF",
    padding : "10px",    
  },
  
}));

export default useStyles;

