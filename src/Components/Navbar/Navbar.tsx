import React from 'react';
import Modal from '../../Utils/Modal/Modal';
import { connect } from 'react-redux';
import { AuthActions } from '../../actions/Auth/action';
import { IAuthState } from '../../actions/Auth/model';
import { IApplicationState } from "../../store/state";
import { FormCreator, IFormProps } from "../../Utils/FormController"

type IProps = typeof AuthActions & IAuthState & IFormProps
const Navbar = (props: any) => {

    const onCancel = () => {
        props.toggleLoginModal(false)
    }

    const onOk = () => {
        const values = props.onFormSubmit()
        if(!values.err){
            props.loginRequest({email: values.data.email, password: values.data.password})
        }
    }

    const loginFormRender = () => {
        const { getFormItem } = props
        return(
            <form>
                <label htmlFor="email">ایمیل</label>
                {getFormItem({
                    name: "email",
                    rules:[{
                        required: true,
                        msg: "filed must fill"
                    }, 
                {
                    emaliValidate: true,
                    msg: "Email is not valid"
                }]
                    
                },
                <input id="email" type="email" placeholder="E-mail" />
                )}
                
                <label htmlFor="password">رمز عبور</label>
                {getFormItem({
                    name: "password",
                    rules:[{
                        required: true,
                        msg: "filed must fill"
                    }]
                    
                },
                <input id="password" type="password" placeholder="Password" />
                )}
                
            </form>
        )
    }
    return (
        <div className="navbar">
            <Modal 
            visiblity={props.login.open} 
            onOk={onOk}
            onCancel={onCancel} 
            title="LOGIN" >
                {loginFormRender()}
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
)(FormCreator(Navbar));