import { Route, Switch } from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard";
import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import AdminDashboardTeste from "../pages/AdminDashboard/Dashboard"
import AdminRoutes from "./AdminRoutes";
import UploadDocument from "../pages/UploadDocument/UploadDocument.js";




const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={ SignIn } />
            <Route path="/cadastro" exact component={ SignUp } />
            <Route path="/upload" exact component={UploadDocument} />
            <PrivateRoutes path="/dashboard" exact component={ Dashboard } /> 
            <AdminRoutes path="/admin-dashboard" exact component={ AdminDashboardTeste } />
        </Switch>
    )
};

export default Routes;