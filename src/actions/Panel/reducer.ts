import { Reducer } from "redux";
import { PanelActionTypes } from "./actionType";
import { IPanelState, ActionModel } from "./model";

const unloadedState: IPanelState = {
    panelData: {
        loading: false,
        data: null
    },
    itemCRUD: {
        loading: "",
        open: ""
    }
};


export const PanelReducer: Reducer<IPanelState> = (
    state: IPanelState = unloadedState,
    action: ActionModel,
) => {
    switch (action.type) {
        //#################### Login cases
        case PanelActionTypes.GetPanelData: {
            return {
                ...state,
                panelData: {
                    ...state.panelData,
                    loading: true
                },
            } as IPanelState;
        }
        case PanelActionTypes.GetPanelDataSuccess: {
            return {
                ...state,
                panelData: {
                    ...state.panelData,
                    loading: false,
                    data: action.data
                },
            } as IPanelState;
        }
        case PanelActionTypes.GetPanelDataFail: {
            return {
                ...state,
                panelData: {
                    ...state.panelData,
                    loading: false
                },
            } as IPanelState;
        }
        case PanelActionTypes.ToggleCreateModals: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                    open: action.open
                },
            } as IPanelState;
        }
        case PanelActionTypes.CreateNoteBook: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "CreateNoteBook"
                },
            } as IPanelState;
        }
        case PanelActionTypes.CreateNoteBookSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as IPanelState;
        }
        case PanelActionTypes.CreateNoteBookFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as IPanelState;
        }
        case PanelActionTypes.DeleteNoteBook: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "DeleteNoteBook",
                },
            } as IPanelState;
        }
        case PanelActionTypes.DeleteNoteBookSuccess: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as IPanelState;
        }
        case PanelActionTypes.DeleteNoteBookFail: {
            return {
                ...state,
                itemCRUD: {
                    ...state.itemCRUD,
                    loading: "",
                },
            } as IPanelState;
        }

    }
    return state;
};
