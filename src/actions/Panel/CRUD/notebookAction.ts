import { AppAction } from "../../../store/state";
import { PanelActionTypes } from "../actionType";
import { ActionModel } from "../model";
import { PanelApi } from "../api";
import {getPanelData} from "../action"

export const toggleCreateModals = (open: string): AppAction<ActionModel> => (dispatch, getState) => {
    dispatch({ type: PanelActionTypes.ToggleCreateModals, open });
}

export const CreateNotebook = (data: any): AppAction<ActionModel> => async (dispatch, getState) => {
    dispatch({ type: PanelActionTypes.CreateNoteBook })
    try {
        const res = await PanelApi.createNoteBook(data)
        if (res.data) {
            dispatch({ type: PanelActionTypes.CreateNoteBookSuccess })
            toggleCreateModals("")(dispatch, getState)
            getPanelData()(dispatch, getState)
        }
    } catch (error) {
        //loagin perosses faild
        dispatch({ type: PanelActionTypes.CreateNoteBookFail })
        alert(error.response.data.message)
    }

}

export const deleteNotebook = (noteBookId: number): AppAction<ActionModel> => async (dispatch, getState) => {
    dispatch({ type: PanelActionTypes.DeleteNoteBook })
    try {
        const res = await PanelApi.deleteNoteBook(noteBookId)
        if (res.data) {
            dispatch({ type: PanelActionTypes.DeleteNoteBookSuccess })
            getPanelData()(dispatch, getState)
            // const {data} = getState().panel.panelData
            // if(data) {
            //     const notebooks = data.notebooks;
            //     if(notebooks) {
            //         const updateNoteBooks = notebooks.filter((note: any) => note.id === noteBookId)
            //         data.notebooks = updateNoteBooks

            //     }
            // }
        }
    } catch (error) {
        //loagin perosses faild
        dispatch({ type: PanelActionTypes.DeleteNoteBookFail })
        alert(error.response.data.message)
    }

}
