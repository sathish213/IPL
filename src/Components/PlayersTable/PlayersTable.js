import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from "@material-ui/core/TablePagination";
import Editaction from "../EditTableAction/Edittableaction";
import axios from "axios";
import Editplayerstable from "../Editplayerstable/Editplayerstable";
import Customizededit from "../Editdialogbox/Editdialogbox";
import Successdialog from "../SuccessDialog/SuccessDialog"; 

const header = [
    { 
     id: "no",
     label: "ID", 
     minWidth: 40 
    },
    {
      id: "playerName",
      label: "Player Name",
      minWidth: 120,
      align: "center",
    },
    {
      id: "category",
      label: "Category",
      minWidth: 40,
      align: "center",
    },
    {
      id: "type",
      label: "Type",
      minWidth: 60,
      align: "center",
    },
    {
      id: "franchises",
      label: "Franchises",
      minWidth: 60,
      align: "center",
    },
    {
      id: "basePrice",
      label: "Base Price(Rs)",
      minWidth: 60,
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 70,
      align: "center",
    },
  ];

  

const useStyles=makeStyles({
    root:{
        width : "100%",
        margin : 20,

    },
    tableTitle:{
        display:"flex",
        padding : "20px",
        paddingLeft:"35px",
        color:"#3497FD",
        fontSize:18, 
        borderBottom : "1px solid #0000004D", 
    },
    searchBar:{
        width:"85%",
        display:"flex",
        paddingLeft:"20px",
        margin: "20px",  
        color:"gray",      
        
    },
    tableHead :{
        backgroundColor: "#E2F0F3",
        opacity: "1",
        color:"semibold",
       

    },
    tablerow:{
        height:"20px",
    },
    container:{
        paddingLeft: "40px",
        paddingRight: "40px",        

    },
    addpalyer :{
        border : "1px solid #2962FF",
        backgroundColor : "#2962FF",
        padding : "10px",
        color : "white",
        fontSize : "15px",
        marginLeft : "45%",
        marginTop : "30px"              
      }
});

export default function Playerstable(props){
    const [playerData, setPlayerData] = useState([]);
    const [searched, setSearched] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [open, setOpen] = useState(false);
    const [successpopup, setSuccesspopup] = useState(false);
    const [rowId,setrowId]=useState(1);
    const [isServiceRefresh, setIsServiceRefresh] = useState(false);

    const classes = useStyles();

    const getdata = async () => {
      // console.log(" session token data ",sessionStorage.getItem("token"))
        const result=await axios.get(
          "https://iplapi.sparity.com/ipl_services/api/v1/players/getAllPlayers",
      {
        headers: {
          "x-access-code": sessionStorage.getItem("token"),
        },
      }
        );
        const data = result.data.data;
        setPlayerData(data);
  };

  useEffect(() => {
     getdata();
  }, [isServiceRefresh]);    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

          

    return(
        <>
        <Paper className={classes.root}>
           <Typography className={classes.tableTitle}><b>IPL-Players List</b></Typography>
           <Grid container spacing={4}>
           <Grid item xs={7}>
           <TextField
            fullWidth            
           variant="outlined"
           placeholder="Search players name.."
           id="id"
           name="id"
           className={classes.searchBar}
           onChange={(e) => setSearched(e.target.value)}
            /> 
            </Grid> 
            <Grid item xs={5}>
           <button className={classes.addpalyer}>Add Players</button>  
            </Grid>
            </Grid>      
           <TableContainer className={classes.container}>
               <Table aria-label="table">
                   <TableHead>
                       <TableRow>
                           {header.map((colomn)=>(
                               <TableCell
                                key={colomn.id}
                                align={colomn.align}
                                style={{ minWidth: colomn.minWidth, fontSize: 17 }}
                                className={classes.tableHead}
                               >
                                {colomn.label}</TableCell>
                           ))}
                       </TableRow>
                   </TableHead>                  
                       <TableBody>
                         {console.log(playerData)}
                       {playerData
                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                       .filter((val, i) => {
                        if (searched === ""){
                          return val;
                        } else if (
                          val.full_name.toLowerCase().includes(searched.toLowerCase())
                        ) {
                          return val.full_name;
                        }
                      })
                       .map((row)=>{
                           return(
                               <TableRow className={classes.tablerow}>
                                   <TableCell align="start">{row.id}</TableCell>
                                    <TableCell align="center">{row.full_name}</TableCell>
                                    <TableCell align="center">{row.categories.name}</TableCell>
                                    <TableCell align="center">{row.playertype.type}</TableCell>
                                    <TableCell align="center">{row.franchises.code}</TableCell>
                                    <TableCell align="center">{row.baseprice.price}</TableCell>
                                    
                                    <TableCell align="center">
                                        <Editaction                                                                          
                                        rowId={row.id}
                                        setrowId={setrowId}                                    
                                        open={open}
                                        setOpen={setOpen}  
                                         />
                                    </TableCell>                                
                               </TableRow>                               
                           );
                            })
                        }                 
                  
                   </TableBody>
               </Table>
           </TableContainer>            
           <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={playerData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />      
        </Paper>
        <Customizededit  open={open}
                        setOpen={setOpen}>
                            <Editplayerstable setSuccesspopup={setSuccesspopup}
                                              setOpen={setOpen}
                                              rowId={rowId} 
                                              setrowId={setrowId} 
                                              isServiceRefresh={isServiceRefresh}
                                              setIsServiceRefresh={setIsServiceRefresh}/>
                        </Customizededit>

        <Successdialog 
        successpopup={successpopup}
        setSuccesspopup={setSuccesspopup}
          >
          </Successdialog>     
                        
                     
          
        </>
    );

}