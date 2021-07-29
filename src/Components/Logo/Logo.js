import React from "react";
import Headerlogo from "../../Assets/Images/Headerlogo.png";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    logo:{
        backgroundcolor: "#ffffff",
        padding: 8,
        height: 100,
        boxsizing: "border-box",
    },
    image :{
        height : "100%",
    }
    
}));

export default function Logo(props){
    const classes=useStyles();
        return(
            <div className={classes.logo} style={{ height: props.height }}>
                <img className={classes.image} src={Headerlogo} alt="ipl-logo" />
            </div>
        );
}