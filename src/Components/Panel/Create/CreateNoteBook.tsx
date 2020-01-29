import React from 'react';
import Modal from '../../../Utils/Modal/Modal';
import * as PanelActions from '../../../actions/Panel/index';
import { IPanelState } from '../../../actions/Panel/model';
import { FormCreator, IFormProps } from "../../../Utils/FormController";

type IProps = IPanelState & typeof PanelActions & IFormProps
const CreateNoteBook: React.FC<IProps> = (props: IProps) => {

    const onOk = (e:any = undefined) => {
            e.preventDefault()
        const {err, data} = props.onFormSubmit();
        if(!err){
            props.CreateNotebook(data)
        }
    }
    const onCancel = () => {
        props.toggleCreateModals("");
    }
    const {getFormItem} = props
    return (
        <Modal visiblity={props.itemCRUD.open === "CreateNoteBook"} 
        title="Create Notebook"
        onOk={onOk}
        onCancel= {onCancel}>
            <form onSubmit={onOk}>
            <label htmlFor="title">Notebook Title</label>
            {getFormItem({
                name: "title",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <input id="title" type="text" placeholder="Notebook Title" />
            )}
            </form>
        </Modal>
    )
}

export default FormCreator(CreateNoteBook)