import { Route, Switch } from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import AdminDashboard from "../pages/Dashboard/AdminDashboard"
import AdminRoutes from "./AdminRoutes";




const Routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={ Login }/>
            <PrivateRoutes path="/dashboard" exact component={ Dashboard }/> 
            <AdminRoutes path="/admin-dashboard" exact component={ AdminDashboard } />
        </Switch>
    )

};

export default Routes;