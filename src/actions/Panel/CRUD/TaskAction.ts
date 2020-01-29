import { AppAction } from "../../../store/state";
import { PanelActionTypes } from "../actionType";
import { ActionModel } from "../model";
import { PanelApi } from "../api";
import {getPanelData} from "../action"

export const toggleCreateModals = (open: string): AppAction<ActionModel> => (dispatch, getState) => {
    dispatch({ type: PanelActionTypes.ToggleCreateModals, open });
}

export const CreateTask = (data: any): AppAction<ActionModel> => async (dispatch, getState) => {
    dispatch({ type: PanelActionTypes.CreateTask })
    try {
        const res = await PanelApi.createTask(data)
        if (res.data) {
            dispatch({ type: PanelActionTypes.CreateTaskSuccess })
            toggleCreateModals("")(dispatch, getState)
            getPanelData()(dispatch, getState)
        }
    } catch (error) {
        dispatch({ type: PanelActionTypes.CreateTaskFail })
        alert(error.response.data.message)
    }

}

export const deleteTask = (TaskId: number): AppAction<ActionModel> => async (dispatch, getState) => {
    dispatch({ type: PanelActionTypes.DeleteTask })
    try {
        const res = await PanelApi.deleteTask(TaskId)
        if (res.data) {
            dispatch({ type: PanelActionTypes.DeleteTaskSuccess })
            getPanelData()(dispatch, getState)
        }
    } catch (error) {
        dispatch({ type: PanelActionTypes.DeleteTaskFail })
        alert(error.response.data.message)
    }

}
