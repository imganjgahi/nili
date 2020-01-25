import React from 'react';
import Modal from '../../Utils/Modal/Modal';
import { connect } from 'react-redux';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IApplicationState } from "../../store/state";

type IProps = typeof AuthActions & IAuthState
const Navbar = (props: any) => {

    const onCancel = () => {
        props.toggleLoginModal(false)
    }
    return (
        <div className="navbar">
            <Modal visiblity={props.login.open} onCancel={onCancel} title="LOGIN" >
        <h1>Login modal</h1>
            </Modal>
            <h1 className="logo">NILI</h1>
            <ul className="navMenu">
                <li className="navMenuItem"><a href="#">درباره نیلی</a></li>
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