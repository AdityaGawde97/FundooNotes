import  React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignIn from '../Component/SignIn';
import SignUp from '../Component/SignUp';
import ForgotPassword from "../Component/ForgotPassword";
import Dashboard from '../Component/Dashboard';
import Notes from '../Component/Notes';
import Reminder from '../Component/Reminder';
import Archive from '../Component/Archive';
import Trash from '../Component/Trash';
import Label from '../Component/Label';
import CountChart from '../Component/CountChart';

const Routing = () => (
    <Router>
        <Route path='/' exact component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/forgotpassword' component={ForgotPassword} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path='/dashboard/notes' component={Notes} />
        <Route path='/dashboard/reminder' component={Reminder} />
        <Route path='/dashboard/archive' component={Archive} />
        <Route path='/dashboard/trash' component={Trash} />
        <Route path='/dashboard/label' component={Label} />
        <Route path='/dashboard/count-charts' component={CountChart} />
    </Router>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={props => 
            localStorage.getItem('isAuthenticate') ? (<Component {...props} />)  : (<Redirect to={{ pathname: "/" }}/>)
        }
    />

);

export default Routing;