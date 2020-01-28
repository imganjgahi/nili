import React from 'react'
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import { PanelActions } from '../../actions/Panel/action';
import { IPanelState } from '../../actions/Panel/model';

type IProps = IPanelState & typeof PanelActions
const PanelPage: React.FC<IProps> = (props: IProps) => {

    React.useEffect(() => {
        props.getPanelData()
    }, [])
    const { data } = props.panelData;
    return (
        <div className="container">
            <div className="notebookList">
                <h3>Notebook List</h3>
                {data ? (
                    <React.Fragment>
                        {data.notebooks.map(((notebook: any) => {
                            return (
                                <div key={notebook.id} className="notebookItem">
                                    <p className="notebookTitle"> {notebook.title} </p>
                                </div>
                            )
                        }))}

                        {data.notebooks.length > 5 ? (

                            <div className="notebookItem">
                                <p className="notebookTitle"> + SEE ALL </p>
                            </div>

                        ) : null}
                    </React.Fragment>
                ) : (
                <p className="empty">
                    you have not any notebook
                </p>
                )}


            </div>
            <div className="taskList">
                <h3>List</h3>


            </div>
            <div className="customList">
                <h3>List</h3>


            </div>
        </div>
    )
}
export default connect(
    (state: IApplicationState) => state.panel,
    PanelActions,
)(PanelPage);