import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../Loginpage/Loginpage";
import Dashboard from "../Dashboard/Dashboard";
import Editplayerstable from "../Editplayerstable/Editplayerstable"
export default function Routes(){
    return(
        <Router>
             <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route  path="/Dashboard" component={Dashboard} />
                <Route  path="/auction-table" component={Dashboard} />
                <Route  path="/players-table" component={Dashboard} />
                <Route  path="/ipl-matches" component={Dashboard} />
                <Route  path="/edit-players/:id" component={Editplayerstable} />
             </Switch>
        </Router>
    );
}