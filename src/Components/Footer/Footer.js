import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({

    footer:{
        backgroundColor:"#2962FF",        
        color: "#ffffff",
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        height: "45px",
        textAlign: "center",
        opacity: "1",
    },
    footerText: {
        padding: "14px 0",
        margin: "0 auto",
        fontSize: 14,
      },

}));
export default function Footer(){
    const classes=useStyles();
    return(
       <div  className={classes.footer} >
            <Typography className={classes.footerText}>
                &copy;IPL 2021. All Rights Reserved.
            </Typography>
       </div>
    );

}