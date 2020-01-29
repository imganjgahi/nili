import React from 'react'
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import { PanelActions } from '../../actions/Panel/action';
import { IPanelState } from '../../actions/Panel/model';
//@ts-ignore
import threeDotIcon from "../../Assets/Icons/threeDots.svg";
//@ts-ignore
import addNote from "../../Assets/Icons/addNote.svg";
//@ts-ignore
import addPlus from "../../Assets/Icons/addPlus.svg";
type IProps = IPanelState & typeof PanelActions
const PanelPage: React.FC<IProps> = (props: IProps) => {

    React.useEffect(() => {
        props.getPanelData()
    }, [])
    const { data } = props.panelData;
    return (
        <div className="container">
            <div className="notebookList">
                <div className="palletHeader"><h3>Notebook List</h3> <img className="threeDots" src={addPlus} /></div>
                {data ? (
                    <React.Fragment>
                        {data.notebooks ? data.notebooks.map(((notebook: any) => {
                            return (
                                <div key={notebook.id} className="notebookItem">
                                    <p className="notebookTitle"> {notebook.title} </p>
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
                <div className="palletHeader"><h3>Task List</h3> <img className="threeDots" src={addNote} /></div>
            
            {data ? (
                    <React.Fragment>
                        {data.tasks ? data.tasks.map(((task: any) => {
                            return (
                                <div key={task.id} className="taskItem">
                                    <p className="taskTitle"> {task.title} </p>
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
                <div className="palletHeader"><h3>Custom Note</h3> <img className="threeDots" src={addPlus} /></div>
            
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