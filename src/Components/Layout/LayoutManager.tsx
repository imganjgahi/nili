import React from 'react';
import { Switch, Route } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import AboutPage from '../AboutPage/AboutPage';
import Home from '../Home/Home';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IFormProps } from "../../Utils/FormController";



type IProps = typeof AuthActions & IAuthState & IFormProps 
const LayoutManager: React.FC<IProps> = (props: IProps) => {

    return (
        <div className="App">
                <Navbar {...props} />
                <Switch>
                    <Route path="/About" component={AboutPage} />
                    <Route path="/" component={Home} />
                </Switch>
        </div>
    )
}

export default LayoutManager