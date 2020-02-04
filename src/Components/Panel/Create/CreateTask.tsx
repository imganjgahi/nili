import React, { useState, useEffect } from 'react';
import Modal from '../../../Utils/Modal/Modal';
import * as PanelActions from '../../../actions/Panel/index';
import { IPanelState } from '../../../actions/Panel/model';
import { FormCreator, IFormProps } from "../../../Utils/FormController";
import Select from '../../../Utils/Select/Select';
import Calendar from '../../Calendar';

type IProps = IPanelState & typeof PanelActions & IFormProps
const CreateTask: React.FC<IProps> = (props: IProps) => {

    const [taskOption, showTaskOption] = useState<boolean>(false)

    const onOk = (e: any = undefined) => {
        if (e) {
            e.preventDefault()
        }
        const { err, data } = props.onFormSubmit();
        if (!err) {
            props.CreateTask(data)
        }
    }
    useEffect(() => {
        if (props.itemCRUD.open === "") {
            console.log("CreateTask");
            if (props.resetForm) {
                props.resetForm()
                showTaskOption(false)
            }
        }
    }, [props.itemCRUD.open])
    const onCancel = () => {
        props.toggleCreateModals("");
    }
    const { getFormItem } = props
    return (
        <Modal visiblity={props.itemCRUD.open === "CreateTask"}
            title="Create a new Task"
            onOk={onOk}
            onCancel={onCancel}>
            <form onSubmit={onOk}>
                <label htmlFor="category">Category</label>
                {getFormItem({
                    name: "category",
                    initialValue: "Delevop Time",
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    }]

                },
                    <Select optionList={[
                        { id: "Sport", title: "Sport" },
                        { id: "Study", title: "Study" },
                        { id: "Event", title: "Event" },
                        { id: "Delevop Time", title: "Delevop Time" },
                    ]} />
                )}
                <label htmlFor="title"> Title</label>
                {getFormItem({
                    name: "title",
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    }]

                },
                    <input id="title" type="text" placeholder="Task Title" />
                )}
                <label htmlFor="description">Task Description</label>
                {getFormItem({
                    name: "description",
                    rules: [{
                        required: true,
                        msg: "filed must fill"
                    }]

                },
                    <textarea id="description" placeholder="Task Description"></textarea>
                )}
                <div>
                    <h5 onClick={() => showTaskOption(!taskOption)}>Options {taskOption ? " -" : " +"}</h5>
                    {taskOption && (
                        <div className="taskOptionForm">
                            <label htmlFor="doDate"> DO Date</label>
                            {getFormItem({
                                name: "doDate",
                                rules: [{
                                    required: true,
                                    msg: "filed must fill"
                                }]

                            },
                                <Calendar id="doDate" position="bottom" />
                            )}
                            <label htmlFor="mode"> mode </label>
                            {getFormItem({
                                name: "mode",
                                initialValue: "1",
                                rules: [{
                                    required: true,
                                    msg: "filed must fill"
                                }]

                            },
                                <Select position="bottom" id="repeatMode" optionList={[
                                    { id: "1", title: "dont Repeat" },
                                    { id: "2", title: "Repeat evreyDay" },
                                    { id: "3", title: "Reminde me on" },
                                ]} />
                            )}

                        </div>
                    )}
                </div>
            </form>
        </Modal>
    )
}

export default FormCreator(CreateTask)