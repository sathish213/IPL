import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import ipl_backImg from '../../Assets/Images/ipl_backImg.png';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    maincontainer:{
        height: "100vh",
        backgroundImage: `url(${ipl_backImg})`,  
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat no-repeat",            
        backgroundSize: "cover",
    },
    paper:{
        width: "28%",
        height: 285,
        margin: "0 auto",
        marginTop :160,     
        border : "10px solid #0000004D",    
       },    

    loginform:{
        display: "flex",
        flexDirection: "column",        
    },
    form:{
        width: "100%",
    },
    submit:{
        margin: theme.spacing(2, 0, 2),
        padding: "6px 0",
        fontSize : 12,
        backgroundColor: "#2962FF",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#2962FF",
            color: "#fff",
          },
    }

}));

export default function LoginPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const [userData, setUserData] = React.useState({
        mobile: "",
        password: "",
      });

      const handleInput = (props) => (e) => { 
            setUserData({ ...userData, [props]: e.target.value });
      };

       const handleLogin = async(e) => { 
        e.preventDefault();           
       console.log(userData);
       let result= await axios.post("https://iplapi.sparity.com/ipl_services/api/v1/users/login",userData)       
        console.log(result);
            let tokendata=result.data.data.token;
           console.log(tokendata);
           
           if(tokendata){
               sessionStorage.setItem("token", tokendata);
               history.push("/auction-table");
           }
      };

return(
    <React.Fragment>
        <CssBaseline />
        <Container className={classes.maincontainer}>
        <div className={classes.loginform}>
         <Paper elevation={3} className={classes.paper}>
           <Container maxWidth="sm" >
             <Typography style={{ textAlign:"left",marginTop:20 }}><b>Login</b></Typography>
             <form className={classes.form} noValidate>
             <TextField
                    variant="outlined"
                    margin="normal"                    
                    fullWidth
                    name="mobile"
                    label="mobile"
                    type="mobile"
                    id="mobile"
                    size="small"  
                    onChange={handleInput("mobile")}            
                    />
                <TextField
                    variant="outlined"
                    margin="normal"                    
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    size="small"  
                    onChange={handleInput("password")}            
                    />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"                    
                    className={classes.submit} 
                    onClick={handleLogin}                                     
                > 
                login
                </Button>
             </form>           
             </Container> 
             
        </Paper>
        </div>       

       </Container>
    </React.Fragment>

);
}





