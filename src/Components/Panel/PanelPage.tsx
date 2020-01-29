import React from 'react'
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import * as PanelActions from '../../actions/Panel/index';
import { IPanelState } from '../../actions/Panel/model';
//@ts-ignore
import addNote from "../../Assets/Icons/addNote.svg";
//@ts-ignore
import addPlus from "../../Assets/Icons/addPlus.svg";
//@ts-ignore
import trash from "../../Assets/Icons/trash.svg";
import { IFormProps } from "../../Utils/FormController";
import CreateNoteBook from './Create/CreateNoteBook';
import CreateTask from './Create/CreateTask';
type IProps = IPanelState & typeof PanelActions & IFormProps
const PanelPage: React.FC<IProps> = (props: IProps) => {
    React.useEffect(() => {
        props.getPanelData()
    }, [])
    const { data } = props.panelData;
    return (
        <div className="container">
            <CreateNoteBook {...props} />
            <CreateTask {...props} />
            <div className="notebookList">
                <div className="palletHeader">
                    <h3>Notebook List</h3>
                    <img className="iconMenu"
                        src={addPlus}
                        onClick={() => props.toggleCreateModals("CreateNoteBook")} />
                </div>
                {data ? (
                    <React.Fragment>
                        {data.notebooks ? data.notebooks.map(((notebook: any) => {
                            return (
                                <div key={notebook.id} className="notebookItem">
                                    <p className="notebookTitle"> {notebook.title} </p>
                                    <div>
                                        <img
                                            onClick={() => { props.deleteNotebook(notebook.id) }}
                                            className="iconMenu"
                                            src={trash}
                                            alt="deleteIcon" />
                                    </div>
                                </div>
                            )
                        })) : (
                                <p className="empty">
                                    you dont have  any notebook yet!
                            </p>
                            )}

                        {data.notebooks && data.notebooks.length > 4 ? (
                            <a href="#" className="seeMore"> SEE ALL + </a>
                        ) : null}
                    </React.Fragment>
                ) : (
                        <p className="empty">
                            you dont have  any notebook yet!
                </p>
                    )}
            </div>

            <div className="taskList">
                <div className="palletHeader">
                    <h3>Task List</h3>
                    <img 
                    onClick={() => props.toggleCreateModals("CreateTask")}
                    className="iconMenu" 
                    src={addNote} />
                </div>

                {data ? (
                    <React.Fragment>
                        {data.tasks ? data.tasks.map(((task: any) => {
                            return (
                                <div key={task.id} className="taskItem">
                                    <p className="taskTitle"> {task.title} </p>
                                    <div className="rowMenu">
                                        <img
                                            onClick={() => { props.deleteTask(task.id) }}
                                            className="iconMenu"
                                            src={trash}
                                            alt="deleteIcon" />
                                    </div>
                                </div>
                            )
                        })) : (
                                <p className="empty">
                                    you dont have any task yet!
                            </p>
                            )}

                        {data.tasks && data.tasks.length > 4 ? (
                            <a href="#" className="seeMore"> SEE ALL + </a>
                        ) : null}
                    </React.Fragment>
                ) : (
                        <p className="empty">
                            you dont have any task yet!
                </p>
                    )}
            </div>

            <div className="customNoteList">
                <div className="palletHeader"><h3>Custom Note</h3> <img className="iconMenu" src={addPlus} /></div>

                {data ? (
                    <React.Fragment>
                        {data.customNotes ? data.customNotes.map(((customNote: any) => {
                            return (
                                <div key={customNote.id} className="customNoteItem">
                                    <p className="customNoteTitle"> {customNote.title} </p>
                                </div>
                            )
                        })) : (
                                <p className="empty">
                                    you dont have any Custom Note yet!
                            </p>
                            )}
                        {data.customNotes && data.customNotes.length > 4 ? (
                            <a href="#" className="seeMore"> SEE ALL + </a>
                        ) : null}
                    </React.Fragment>
                ) : (
                        <p className="empty">
                            you dont have any Custom Note yet!
                </p>
                    )}
            </div>
        </div>
    )
}
export default connect(
    (state: IApplicationState) => state.panel,
    PanelActions,
)(PanelPage);