import React,{useState,useEffect} from "react";
import { withStyles , makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Button, colors } from "@material-ui/core";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({

  checkcircle:{
    fontSize:"50px",
    border : "1px solid #3497FD",
    borderRadius:"25px",
    color:"#3497FD",
    position:"relative",
    marginLeft:"75px",
    marginBottom:"10px",
},
okbutton:{
    position:"relative",
    marginLeft:"65px",
    width:"90px",
    margin:"25px",

},

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
  
  


export default function Succesdialog(props) {
  const classes = useStyles();
  
  const {children,open,setSuccesspopup,successpopup, setIsServiceRefresh }=props;

  const handlebutton=()=>{
    setSuccesspopup(false);
  }

  return (
    <div className={classes.root} >
      
      <Dialog    
        open={successpopup}        
        maxWidth={"xs"}
        PaperProps={{
          style: {
            borderRadius:"20px",
            borderTop:"5px solid #3497FD",            
          },
        }}                
      >
        
        <DialogContent >
        <DoneIcon className={classes.checkcircle}           
        
        >          
        </DoneIcon>
        <p>Your details updated successfully !</p>
        <Button  className={classes.okbutton} variant="outlined" onClick={handlebutton} >OK</Button>    
                
                  
        </DialogContent>
         </Dialog>
    </div>
  );
}

