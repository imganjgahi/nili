import React, { ReactComponentElement } from 'react';
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import AboutPage from '../AboutPage/AboutPage';
import Home from '../Home/Home';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IFormProps } from "../../Utils/FormController";
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import PanelPage from '../Panel/PanelPage';
import CalendarPage from '../Calendar/CalendarPage';



type IProps = typeof AuthActions & IAuthState & IFormProps & RouteComponentProps
const LayoutManager: React.FC<IProps> = (props: IProps) => {

    console.log("IS Auth", props.isAuth)
    const authCheck = (routh: any) => {
        return props.isAuth ? routh : <Route path="/" component={Home} />
    }
    return (
        <div className="App">
            <Navbar {...props} />
            <Switch>
                {authCheck(<Route path={"/calendar"} component={CalendarPage} />)}
                <Route path="/About" component={AboutPage} />
                {authCheck( <Route path="/" component={PanelPage} />)}
            </Switch>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(LayoutManager);