import React from 'react';
import Modal from '../../../Utils/Modal/Modal';
import * as PanelActions from '../../../actions/Panel/index';
import { IPanelState } from '../../../actions/Panel/model';
import { FormCreator, IFormProps } from "../../../Utils/FormController";

type IProps = IPanelState & typeof PanelActions & IFormProps
const CreateTask: React.FC<IProps> = (props: IProps) => {

    const onOk = (e:any = undefined) => {
        if(e){
            e.preventDefault()
        }
        const {err, data} = props.onFormSubmit();
        if(!err){
            props.CreateTask(data)
        }
    }
    const onCancel = () => {
        props.toggleCreateModals("");
    }
    const {getFormItem} = props
    return (
        <Modal visiblity={props.itemCRUD.open === "CreateTask"} 
        title="Create a new Task"
        onOk={onOk}
        onCancel= {onCancel}>
            <form onSubmit={onOk}>
            <label htmlFor="noteBookId">For NoteBook</label>
            {getFormItem({
                name: "noteBookId",
                initialValue: "Delevop Time",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <select id="noteBookId">
                <option value={1}>note 1</option>
                <option value={2}>note 2</option>
                <option value={3}>mote 3</option>
            </select>
            )}
            <label htmlFor="title"> Title</label>
            {getFormItem({
                name: "title",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <input id="title" type="text" placeholder="Task Title" />
            )}
            <label htmlFor="description">Task Description</label>
            {getFormItem({
                name: "description",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <input id="description" type="text" placeholder="Task Description" />
            )}
            <label htmlFor="category">Category</label>
            {getFormItem({
                name: "category",
                initialValue: "Delevop Time",
                rules:[{
                    required: true,
                    msg: "filed must fill"
                }]
                
            },
            <select id="category" onChange={() => console.log("change")}>
                <option value="Sport">Sport</option>
                <option value="Study">Study</option>
                <option value="Delevop Time">Delevop Time</option>
            </select>
            )}
            </form>
        </Modal>
    )
}

export default FormCreator(CreateTask)