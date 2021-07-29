import React ,{ useEffect, useState }from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from "@material-ui/core/TablePagination";
import Editmatchaction from "../EditMatchTableAction/EditMatchTableaction";
import Pointsaction from "../Pointsaction/Pointsaction";
import axios from "axios";

const header = [
    { id: "id", label: "Match ID", minWidth: 30 },
    {
      id: "matchName",
      label: "Match Name",
      minWidth: 80,
      align: "center",
    },
    {
      id: "team1",
      label: "Team 1",
      minWidth: 50,
      align: "center",
    },
    {
      id: "team2",
      label: "Team 2",
      minWidth: 50,
      align: "center",
    },
    {
      id: "date",
      label: "Date",
      minWidth: 30,
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 160,
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
           
    },
    tableHead :{
        backgroundColor: "#E2F0F3",
        opacity: "1",
        color: "#333333",
    },
    container:{
        paddingLeft: "40px",
        paddingRight: "40px",        

    },  
    addmatcheslist :{
        border : "1px solid #2962FF",
        backgroundColor : "#2962FF",
        padding : "10px",
        color : "white",
        fontSize : "15px",
        marginLeft : "45%",
        marginTop : "30px"              
      }  
})

export default function Matchestable(props){
    const classes = useStyles();
    const [matchData, setMatchData] = useState([]);
    const [searched, setSearched] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);


    const GetData=async()=>{
      const result=await axios.get("https://iplapi.sparity.com/ipl_services/api/v1/matches/getSchedules",
      {
        headers: {
          "x-access-code": sessionStorage.getItem("token"),
        },
      }
      );
      const data = result.data.data;
      setMatchData(data);
      console.log("matches data",data);
    }

    useEffect(()=>{
      GetData();
    })

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
           <Typography className={classes.tableTitle}><b>IPL-Matches List</b></Typography>
           <Grid container spacing={4}>
           <Grid item xs={7}>
           <TextField
           fullWidth
           variant="outlined"
           placeholder="Search Match name.."
           id="id"
           name="id"  
           color="primary"
           onChange={(e) => setSearched(e.target.value)}
           className={classes.searchBar}           
           />
            </Grid> 
            <Grid item xs={5}>
            <button className={classes.addmatcheslist}>Add MatchesList</button>  
            </Grid>
            </Grid>
            <TableContainer className={classes.container}>            
               <Table aria-label="table">
                   <TableHead>
                       <TableRow>
                           {header
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                           .filter((val, i) => {
                            if (searched === ""){
                              return val;
                            } else if (
                              val.MatchName.toLowerCase().includes(searched.toLowerCase())
                            ) {
                              return val.match_name;
                            }
                          })
                           .map((colomn)=>(
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
                       {matchData
                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                       .map((row)=>{
                           return(
                               <TableRow>
                                    <TableCell align="start">{row.id}</TableCell>
                                    <TableCell align="center">{row.match_name}</TableCell>
                                    <TableCell align="center">{row.team1code && row.team1code.code}</TableCell>
                                    <TableCell align="center">{row.team2code && row.team2code.code}</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">
                                        <Editmatchaction />{" "}
                                        <Pointsaction />
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
          count={matchData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />        
           


        </Paper>      
        
       </>
    );

}