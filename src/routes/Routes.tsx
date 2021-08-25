import { Route, Switch } from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login}/>
            <PrivateRoutes path="/dashboard" exact component={Dashboard}/> 
        </Switch>
    )

};

export default Routes;