import { Reducer } from "redux";
import { PanelActionTypes } from "./actionType";
import { IPanelState, ActionModel } from "./model";

const unloadedState: IPanelState = {
    panelData: {
        loading: false,
        data: null
    },
    createItem: {
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
                createItem: {
                    ...state.createItem,
                    loading: "",
                    open: action.open
                },
            } as IPanelState;
        }
        case PanelActionTypes.CreateNoteBook: {
            return {
                ...state,
                createItem: {
                    ...state.createItem,
                    loading: "CreateNoteBook"
                },
            } as IPanelState;
        }
        case PanelActionTypes.CreateNoteBookSuccess: {
            return {
                ...state,
                createItem: {
                    ...state.createItem,
                    loading: "",
                },
            } as IPanelState;
        }
        case PanelActionTypes.CreateNoteBookFail: {
            return {
                ...state,
                createItem: {
                    ...state.createItem,
                    loading: "",
                },
            } as IPanelState;
        }

    }
    return state;
};
