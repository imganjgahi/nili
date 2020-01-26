import React from 'react';
import { FormCreator, IFormProps } from "../../Utils/FormController"

type IProps = IFormProps & {
    onOk: (data: any ) => void;
}

const Register: React.FC<IProps> = (props: IProps) => {

    const submitHandler = (e: any) => {
        e.preventDefault();
        const values = props.onFormSubmit();
        if(!values.err){
            props.onOk(values.data)
        }
    }
    
    const { getFormItem } = props
    return(
        <form onSubmit={submitHandler}>
            <label htmlFor="fullName">نام شما</label>
            {getFormItem({
                name: "fullName",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <input id="fullName" type="text" placeholder="Your FullName" />
            )}

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
            <label htmlFor="confirmPassword"> تکرار رمز عبور</label>
            {getFormItem({
                name: "confirmPassword",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <input id="confirmPassword" type="password" placeholder="confirmPassword" />
            )}
            <button type="submit">Register</button>
        </form>
    )
}

export default FormCreator(Register)