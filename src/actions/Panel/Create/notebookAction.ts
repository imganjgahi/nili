import { AppAction } from "../../../store/state";
import { PanelActionTypes } from "../actionType";
import { ActionModel } from "../model";
import { PanelApi } from "../api";


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
        }
    } catch (error) {
        //loagin perosses faild
        dispatch({ type: PanelActionTypes.CreateNoteBookFail })
        alert(error.response.data.message)
    }

}
