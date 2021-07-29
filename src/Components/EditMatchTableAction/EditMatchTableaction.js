import React from "react";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles=makeStyles({
    button :{
        border:"1px solid #06297E",
        color : "#06297E"
    }
})

export default function Editmatchaction(props){
     const classes=useStyles();          



    return(
        <>
        <Button 
        variant="outlined"
        className={classes.button}
        startIcon={< EditIcon />} 
        >Edit</Button>       
        </>
    )
}