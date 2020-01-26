import React from 'react';
import Modal from '../../Utils/Modal/Modal';
import { connect } from 'react-redux';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IApplicationState } from "../../store/state";
import { IFormProps } from "../../Utils/FormController"
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { Link } from 'react-router-dom';

type IProps = typeof AuthActions & IAuthState & IFormProps 
const Navbar = (props: IProps) => {
    const onCancel = () => {
        props.toggleLoginModal(false)
    }

    const onLoginOk = (data: any) => {
        props.loginRequest({ email: data.email, password: data.password })
    }
    const onRegisterOk = (data: any) => {
        props.registerRequest({ email: data.email, password: data.password, fullName: data.fullName })
    }

    console.log("Propas: ", props.isAuth)
    return (
        <div className="navbar">
            <Modal
                visiblity={props.login.open}
                onCancel={onCancel}
                title="LOGIN" >
                <div className="authPanel">
                    <div className="LoginPanel">
                        <Login {...props} onOk={(data) => onLoginOk(data)} />
                    </div>

                    <div className="RegisterPanel">
                        <Register {...props}  onOk={(data) => onRegisterOk(data)}/>
                    </div>
                </div>
            </Modal>
            <h1 className="logo"><Link to ="/" >NILI</Link></h1>
            <ul className="navMenu">
                {props.isAuth ? (
                    <li className="navMenuItem"><Link to="/Dashboard">داشبورد</Link></li>
                ): (
                    <li className="navMenuItem"><Link to="/">خانه</Link></li>
                )}
                <li className="navMenuItem"><Link to="/About">درباره نیلی</Link></li>
                <li className="navMenuItem">خدمات نیلی</li>
                <li className="navMenuItem">ارتباط با ما</li>
            </ul>
            <div className="navAuth">
                <small className="navLogin" onClick={() => props.toggleLoginModal(true)}>
                    Login
                </small>
            </div>
        </div>
    )


}

export default connect(
    (state: IApplicationState) => state.auth,
    AuthActions,
)(Navbar);