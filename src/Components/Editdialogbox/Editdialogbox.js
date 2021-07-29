import React,{useState,useEffect} from "react";
import { withStyles , makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({

  headername:{
    marginTop : "8px",
    borderBottom :"1px solid #0000004D",
    paddingBottom:"8px",
    marginLeft:18,
  },
  closedicon:{    
    marginLeft:"180px",
  }
  

}));
 
    
  //   form :{
  //       width: "100%",
  //       marginTop: theme.spacing(3),
  //   },
  //   text :{
  //       marginTop: 12,
  //   },
  //   formControl: {
  //       minWidth: "100%",
  //   },  
  //   submit :{
  //     backgroundColor: "#3497FD",      
  //     margin: theme.spacing(4, 0, 2, 23), 
  //     color: "#fff",
  //   "&:hover": {
  //     backgroundColor: "#3497FD",
  //     color: "#fff",
  //   } 
  // },
  



export default function Customizededit(props) {
  const classes = useStyles();
  
  const {children,open,setOpen}=props;

  

  const handleClose = () => {
    console.log("handlecloseicon");
    setOpen(false);
    
  };
  
  


  return (
    <div >
      
      <Dialog className={classes.root}      
        open={open}
        onClose={handleClose}
        maxWidth={"xs"}
        PaperProps={{
          style: {
            borderRadius:"18px",
            borderTop:"5px solid #3497FD",
            
          },
        }}                
      >        
      <DialogTitle
      onClose={handleClose}
      className={classes.headername}
      >
        Edit Player Data
        <IconButton className={classes.closedicon}  aria-label="close" ><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent >
        {children}      
        </DialogContent>
         </Dialog>
    </div>
  );
}


//   return (
//     <div>
//       <Dialog
//        // onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle id="customized-dialog-title" >
//         Edit Player Data
//         </DialogTitle>
//         <DialogContent dividers>
//         <form className={classes.form} noValidate >
//                   <Grid container spacing={2}>
//                       <Grid item xs={12} sm={6}>
//                           <Typography
//                           component="h1"
//                           variant="h6"
//                           className={classes.text}
//                           >
//                           ID
//                           </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                           <TextField 
//                           variant="outlined"
//                           fullWidth
//                           id="id"
//                           name="id"
//                           value={""}
//                           disabled
//                           size="small"
//                           />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                           <Typography
//                           component="h1"
//                           variant="h6"
//                           className={classes.text}
//                           >
//                           Full Name
//                           </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                           <TextField
//                           variant="outlined"
//                           fullWidth
//                           id="full-name"
//                           name="full-name"
//                           value={""}
//                           size="small" 
//                           onChange={(e) => handleChangePlayerName(e.target.value)}                           
//                           />                            
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                           <Typography
//                           component="h1"
//                           variant="h6"
//                           className={classes.text}
//                           >
//                            Unsold Status
//                           </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                       <Switch
//                           checked={""}
//                           onChange={(e) => handleChangeStatus(e.target.checked)}
//                           name="unsold-status"
//                           color="primary"
//                           size="small"
//                           inputProps={{ "aria-label": "unsold-status checkbox" }}
//                       />
//                       </Grid>                 
//                    <Button
//                       type="submit"
//                       variant="contained"
//                       className={classes.submit}
//                   >
//                   Submit
//                   </Button>
//                   </Grid>
//               </form>
//         </DialogContent>
//         </Dialog>
//     </div>
//   );
// }
