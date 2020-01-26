import React from 'react';
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import AboutPage from '../AboutPage/AboutPage';
import Home from '../Home/Home';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IFormProps } from "../../Utils/FormController";
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import DashboardPage from '../Dashboard/DashboardPage';



type IProps = typeof AuthActions & IAuthState & IFormProps & RouteComponentProps
const LayoutManager: React.FC<IProps> = (props: IProps) => {

    console.log("IS Auth", props.isAuth)
    return (
        <div className="App">
            <Navbar {...props} />
            <Switch>
                <Route path="/About" component={AboutPage} />
                {props.isAuth ? (
                    <Route path="/" component={DashboardPage} />
                ) : (
                        <Route path="/" component={Home} />
                    )}
            </Switch>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(LayoutManager);