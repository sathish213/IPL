import React,{useState,useEffect} from 'react';
import { Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({

    // paperBackground:{
    //     width: "35%",
    //     height: "50%",
    //     borderRadius: 20,
    //     margin: "0 auto",
    //     borderTop: "5px solid #3497FD",
    //     marginTop: "5%",
    // },


    form :{
        width: "95%",
        marginTop: theme.spacing(3),
    },
    text :{
        marginTop: 4,
        marginLeft:18,
    },
    formControl: {
        minWidth: "100%",
    },  
    submit :{
      backgroundColor: "#3497FD",      
      margin: theme.spacing(3, 20), 
      color: "#fff",
    "&:hover": {
      backgroundColor: "#3497FD",
      color: "#fff",
    } 
  },
  // headername:{
  //   marginTop : "8px",
  //   borderBottom :"1px solid #0000004D",
  //   paddingBottom:"8px",
  //   marginLeft:18,
  // }

}));

export default function Editplayerstable(props){ 
    const [allPlayers, setAllPlayers] = useState({});
    const [allfranchises, setAllFranchises] = useState([]);
    const [allPlayerTypes, setAllPlayerTypes] = useState([]);
    const [allCategories, getAllCategories] = useState([]);
    const [allBasePrices, getAllBasePrices] = useState([]);
    const classes=useStyles(); 
    const history = useHistory();
    const {rowId}=props;
    const {open,setOpen,setSuccesspopup, isServiceRefresh, setIsServiceRefresh }=props;


    const GetData = async () => {
      const result=await axios.get("https://iplapi.sparity.com/ipl_services/api/v1/players/getAllPlayers",
      {
          headers: {
            "x-access-code": sessionStorage.getItem("token"),
          },
        }
      );
      const data=await result.data.data;
      console.log("getall player data in result var", props)
      setAllPlayers(data[rowId-1]);

      };  


    useEffect(()=>{       
        GetData();
    },[]);


    useEffect(() => {
        const Franchises = async () => {
          const result = await axios.get(
            "https://iplapi.sparity.com/ipl_services/api/v1/players/getFranchises",
            {
                headers: {
                  "x-access-code": sessionStorage.getItem("token"),
                },
              }
          );
          setAllFranchises(result.data.data);
        };
        Franchises();
      }, []);
    
      useEffect(() => {
        const PlayerTypes = async () => {
          const result = await axios.get(
            "https://iplapi.sparity.com/ipl_services/api/v1/players/getPlayerTypes",
            {
                headers: {
                  "x-access-code": sessionStorage.getItem("token"),
                },
              }
          );
          setAllPlayerTypes(result.data.data);
        };
        PlayerTypes();
      }, []);
    
      useEffect(() => {
        const Categories = async () => {
          const result = await axios.get(
            "https://iplapi.sparity.com/ipl_services/api/v1/players/getCategories",
            {
                headers: {
                  "x-access-code": sessionStorage.getItem("token"),
                },
              }
          );
          getAllCategories(result.data.data);
        };
        Categories();
      }, []);
    
      useEffect(() => {
        const BasePrices = async () => {
          const result = await axios.get(
            "https://iplapi.sparity.com/ipl_services/api/v1/players/getBasePrices",
            {
                headers: {
                  "x-access-code": sessionStorage.getItem("token"),
                },
              }
          );
          getAllBasePrices(result.data.data);
        };
        BasePrices();
      }, []);


    const handleChangePlayerName = (val) => {
        setAllPlayers({ ...allPlayers, full_name: val });
      };
    
      const handleChangeStatus = (val) => {
        setAllPlayers({ ...allPlayers, unsold_status: val });
      };
    
      const handleChangeFranchises = (val) => {
        setAllPlayers({ ...allPlayers, franchises: { code: val } });
      };
    
      const handleChangeBasePrice = (val) => {
        setAllPlayers({ ...allPlayers, baseprice: { price: val } });
      };
    
      const handleChangeCategory = (val) => {
        setAllPlayers({ ...allPlayers, categories: { name: val } });
      };
    
      const handleChangePlayerType = (val) => {
        setAllPlayers({ ...allPlayers, playertype: { type: val } });
      };  

      const handleSubmit =async(e)=>{
        e.preventDefault();
        const putdata=await axios.put(`https://iplapi.sparity.com/ipl_services/api/v1/players/updatePlayer/${rowId}`,
        allPlayers,
        {
          headers: {
            "x-access-code": sessionStorage.getItem("token"),
          },
        }      
        )
        console.log("putdata" ,putdata);        
        if(putdata.data.message){
          setOpen(false);
          setSuccesspopup(true);
          setIsServiceRefresh(!isServiceRefresh)
        }
      }


      const {
        id,
        full_name,
        unsold_status,
        franchises,
        baseprice,
        categories,
        playertype,
      } = allPlayers;
    console.log("total player data",allPlayers);

    
return(
  <div className={classes.root}>
   {/* <Paper elevation={3} className={classes.paperBackground}> */}
      {/* <Container className={classes.paperBackground}> */}
         <CssBaseline />
          <div>
              {/* <Typography className={classes.headername} component="h1" variant="h5">
                  Edit Player Data
              </Typography> */}
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                          <Typography
                          component="h1"
                          variant="h6"
                          className={classes.text}
                          >
                          ID
                          </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField 
                          variant="outlined"
                          fullWidth
                          id="id"
                          name="id"
                          value={id}
                          disabled
                          size="small"
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <Typography
                          component="h1"
                          variant="h6"
                          className={classes.text}
                          >
                          Full Name
                          </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                          variant="outlined"
                          fullWidth
                          id="full-name"
                          name="full-name"
                          value={full_name}
                          size="small" 
                          onChange={(e) => handleChangePlayerName(e.target.value)}                           
                          />                            
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <Typography
                          component="h1"
                          variant="h6"
                          className={classes.text}
                          >
                           Unsold Status
                          </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField
                          variant="outlined"
                          value={unsold_status}
                          onChange={(e) => handleChangeStatus(e.target.checked)}
                          name="unsold-status"
                          size="small"
                          inputProps={{ "aria-label": "unsold-status checkbox" }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <Typography
                          component="h1"
                          variant="h6"
                          className={classes.text}
                          >
                          Franchises
                          </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <FormControl
                          size="small"
                          variant="outlined"
                          className={classes.formControl}
                      >
                      <InputLabel id="franchises">Team Name</InputLabel>
                      <Select
                          labelId="franchises"
                          id="franchises"
                          label="franchises"
                          value={`${franchises && franchises.code}`}
                          onChange={(e) => handleChangeFranchises(e.target.value)}
                      >
                          {allfranchises.map((value) => {
                          return (
                              <MenuItem id={value.id} value={value.code}>
                              {value.code}
                              </MenuItem>
                              );
                              })}
                          </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Typography
                      component="h1"
                      variant="h6"
                      className={classes.text}
                      >
                          Base Price
                      </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl
                  size="small"
                  variant="outlined"
                  className={classes.formControl}
                  >
                  <InputLabel id="base-price">Base Price</InputLabel>
                  <Select
                  labelId="base-price"
                  id="base-price"
                  label="base-price"
                  value={`${baseprice && baseprice.price}`}
                  onChange={(e) => handleChangeBasePrice(e.target.value)}
                  >
                  {allBasePrices.map((value) => {
                    return (
                      <MenuItem id={value.id} value={value.price}>
                        {value.price}
                      </MenuItem>
                    );
                  })}
                  </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
              <Typography
                component="h1"
                variant="h6"
                className={classes.text}
              >
                Category
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
                  >
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  label="category"
                  value={`${categories && categories.name}`}
                  onChange={(e) => handleChangeCategory(e.target.value)}
                  >
                  {allCategories.map((value) => {
                    return (
                      <MenuItem id={value.id} value={value.name}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography
                component="h1"
                variant="h6"
                className={classes.text}
              >
                Player Type
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="playertype">Player Type</InputLabel>
                <Select
                  labelId="playertype"
                  id="playertype"
                  label="playertype"
                  value={`${playertype && playertype.type}`}
                  onChange={(e) => handleChangePlayerType(e.target.value)}
                >
                  {allPlayerTypes.map((value) => {
                    return (
                      <MenuItem id={value.id} value={value.type}>
                        {value.type}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              </Grid>
                  <Button
                      type="submit"
                      variant="contained"
                      className={classes.submit}
                  >
                  Submit
                  </Button>
                  </Grid>
              </form>
          </div>
      {/* </Container> */}
   {/* </Paper> */}

 
  </div>
);
}








// return(
//     <>
//     <Dialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//           Modal title
//         </DialogTitle>
//         <DialogContent dividers>
//                 <form className={classes.form} noValidate onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <Typography
//                             component="h1"
//                             variant="h6"
//                             className={classes.text}
//                             >
//                             ID
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField 
//                             variant="outlined"
//                             fullWidth
//                             id="id"
//                             name="id"
//                             value={id}
//                             disabled
//                             size="small"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Typography
//                             component="h1"
//                             variant="h6"
//                             className={classes.text}
//                             >
//                             Full Name
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                             variant="outlined"
//                             fullWidth
//                             id="full-name"
//                             name="full-name"
//                             value={full_name}
//                             size="small" 
//                             onChange={(e) => handleChangePlayerName(e.target.value)}                           
//                             />                            
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Typography
//                             component="h1"
//                             variant="h6"
//                             className={classes.text}
//                             >
//                              Unsold Status
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                         <Switch
//                             checked={unsold_status}
//                             onChange={(e) => handleChangeStatus(e.target.checked)}
//                             name="unsold-status"
//                             color="primary"
//                             size="small"
//                             inputProps={{ "aria-label": "unsold-status checkbox" }}
//                         />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Typography
//                             component="h1"
//                             variant="h6"
//                             className={classes.text}
//                             >
//                             Franchises
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                         <FormControl
//                             size="small"
//                             variant="outlined"
//                             className={classes.formControl}
//                         >
//                         <InputLabel id="franchises">Team Name</InputLabel>
//                         <Select
//                             labelId="franchises"
//                             id="franchises"
//                             label="franchises"
//                             value={`${franchises && franchises.code}`}
//                             onChange={(e) => handleChangeFranchises(e.target.value)}
//                         >
//                             {allfranchises.map((value) => {
//                             return (
//                                 <MenuItem id={value.id} value={value.code}>
//                                 {value.code}
//                                 </MenuItem>
//                                 );
//                                 })}
//                             </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                         <Typography
//                         component="h1"
//                         variant="h6"
//                         className={classes.text}
//                         >
//                             Base Price
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                     <FormControl
//                     size="small"
//                     variant="outlined"
//                     className={classes.formControl}
//                     >
//                     <InputLabel id="base-price">Base Price</InputLabel>
//                     <Select
//                     labelId="base-price"
//                     id="base-price"
//                     label="base-price"
//                     value={`${baseprice && baseprice.price}`}
//                     onChange={(e) => handleChangeBasePrice(e.target.value)}
//                     >
//                     {allBasePrices.map((value) => {
//                       return (
//                         <MenuItem id={value.id} value={value.price}>
//                           {value.price}
//                         </MenuItem>
//                       );
//                     })}
//                     </Select>
//                     </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                 <Typography
//                   component="h1"
//                   variant="h6"
//                   className={classes.text}
//                 >
//                   Category
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                   <FormControl
//                   size="small"
//                   variant="outlined"
//                   className={classes.formControl}
//                     >
//                   <InputLabel id="category">Category</InputLabel>
//                   <Select
//                     labelId="category"
//                     id="category"
//                     label="category"
//                     value={`${categories && categories.name}`}
//                     onChange={(e) => handleChangeCategory(e.target.value)}
//                     >
//                     {allCategories.map((value) => {
//                       return (
//                         <MenuItem id={value.id} value={value.name}>
//                           {value.name}
//                         </MenuItem>
//                       );
//                     })}
//                   </Select>
//                 </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                 <Typography
//                   component="h1"
//                   variant="h6"
//                   className={classes.text}
//                 >
//                   Player Type
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl
//                   size="small"
//                   variant="outlined"
//                   className={classes.formControl}
//                 >
//                   <InputLabel id="playertype">Player Type</InputLabel>
//                   <Select
//                     labelId="playertype"
//                     id="playertype"
//                     label="playertype"
//                     value={`${playertype && playertype.type}`}
//                     onChange={(e) => handleChangePlayerType(e.target.value)}
//                   >
//                     {allPlayerTypes.map((value) => {
//                       return (
//                         <MenuItem id={value.id} value={value.type}>
//                           {value.type}
//                         </MenuItem>
//                       );
//                     })}
//                   </Select>
//                 </FormControl>
//                 </Grid>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         className={classes.submit}
//                     >
//                     Submit
//                     </Button>
//                     </Grid>
//                 </form>
//             </DialogContent>
//           </Dialog>
//     </>
// );
// }













// return(
//   <>
//   <Paper elevation={3} className={classes.paperBackground}>
//       <Container component="main" maxWidth="sm">
//          <CssBaseline />
//           <div>
//               <Typography className={classes.headername} component="h1" variant="h5" >
//                   Edit Player Data
//               </Typography>
//               <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
//                           value={id}
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
//                           value={full_name}
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
//                           checked={unsold_status}
//                           onChange={(e) => handleChangeStatus(e.target.checked)}
//                           name="unsold-status"
//                           color="primary"
//                           size="small"
//                           inputProps={{ "aria-label": "unsold-status checkbox" }}
//                       />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                           <Typography
//                           component="h1"
//                           variant="h6"
//                           className={classes.text}
//                           >
//                           Franchises
//                           </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                       <FormControl
//                           size="small"
//                           variant="outlined"
//                           className={classes.formControl}
//                       >
//                       <InputLabel id="franchises">Team Name</InputLabel>
//                       <Select
//                           labelId="franchises"
//                           id="franchises"
//                           label="franchises"
//                           value={`${franchises && franchises.code}`}
//                           onChange={(e) => handleChangeFranchises(e.target.value)}
//                       >
//                           {allfranchises.map((value) => {
//                           return (
//                               <MenuItem id={value.id} value={value.code}>
//                               {value.code}
//                               </MenuItem>
//                               );
//                               })}
//                           </Select>
//                           </FormControl>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                       <Typography
//                       component="h1"
//                       variant="h6"
//                       className={classes.text}
//                       >
//                           Base Price
//                       </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                   <FormControl
//                   size="small"
//                   variant="outlined"
//                   className={classes.formControl}
//                   >
//                   <InputLabel id="base-price">Base Price</InputLabel>
//                   <Select
//                   labelId="base-price"
//                   id="base-price"
//                   label="base-price"
//                   value={`${baseprice && baseprice.price}`}
//                   onChange={(e) => handleChangeBasePrice(e.target.value)}
//                   >
//                   {allBasePrices.map((value) => {
//                     return (
//                       <MenuItem id={value.id} value={value.price}>
//                         {value.price}
//                       </MenuItem>
//                     );
//                   })}
//                   </Select>
//                   </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//               <Typography
//                 component="h1"
//                 variant="h6"
//                 className={classes.text}
//               >
//                 Category
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <FormControl
//                 size="small"
//                 variant="outlined"
//                 className={classes.formControl}
//                   >
//                 <InputLabel id="category">Category</InputLabel>
//                 <Select
//                   labelId="category"
//                   id="category"
//                   label="category"
//                   value={`${categories && categories.name}`}
//                   onChange={(e) => handleChangeCategory(e.target.value)}
//                   >
//                   {allCategories.map((value) => {
//                     return (
//                       <MenuItem id={value.id} value={value.name}>
//                         {value.name}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//               <Typography
//                 component="h1"
//                 variant="h6"
//                 className={classes.text}
//               >
//                 Player Type
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl
//                 size="small"
//                 variant="outlined"
//                 className={classes.formControl}
//               >
//                 <InputLabel id="playertype">Player Type</InputLabel>
//                 <Select
//                   labelId="playertype"
//                   id="playertype"
//                   label="playertype"
//                   value={`${playertype && playertype.type}`}
//                   onChange={(e) => handleChangePlayerType(e.target.value)}
//                 >
//                   {allPlayerTypes.map((value) => {
//                     return (
//                       <MenuItem id={value.id} value={value.type}>
//                         {value.type}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//               </Grid>
//                   <Button
//                       type="submit"
//                       variant="contained"
//                       className={classes.submit}
//                   >
//                   Submit
//                   </Button>
//                   </Grid>
//               </form>
//           </div>
//       </Container>
//   </Paper>
//   </>
// );
// }