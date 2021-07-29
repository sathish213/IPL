import React from "react";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation , useHistory } from "react-router-dom";

const useStyles=makeStyles({
    button :{
        border:"1px solid #06297E",
        color : "#06297E"
    }
})

export default function Editaction(props){
    const {open,setOpen,rowId,setrowId}=props;
     const classes=useStyles();
     const location = useLocation();
     const history=useHistory();  


    // const redirectPlayers=()=>{
    //     let path=`/edit-players/${props.rowId}`;
    //       history.push(path);  
    //       <Editplayerstable />              
    // }

    
    // const handleClickOpen=()=>{
       
    //     if(location.pathname==="/players-table")
    //     {
    //         redirectPlayers();
    //     }
    // }
      
    const handleClickOpen = () => {
        setOpen(true);
        setrowId(rowId);
      }

      

    return(
        <>
        <Button 
        variant="outlined"
        className={classes.button}
        startIcon={< EditIcon />} 
        onClick={handleClickOpen}   
        >Edit</Button>       
        </>
    )
}