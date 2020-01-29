import { Action } from "redux";
import {PanelActionTypes} from './actionType';

export interface IPanelState {
    panelData: {
        loading: boolean;
        data: any;
    }
    itemCRUD: {
        loading: string;
        open: string;
    }
}

interface IGetPanelData extends Action<string> {
    type: PanelActionTypes.GetPanelData
}
interface IGetPanelDataSuccess extends Action<string> {
    type: PanelActionTypes.GetPanelDataSuccess
    data: any
}
interface IGetPanelDataFail extends Action<string> {
    type: PanelActionTypes.GetPanelDataFail
}

interface IToggleCreateModals extends Action<string> {
    type: PanelActionTypes.ToggleCreateModals
    open: string
}


// ########################################### NOTE BOOK CRUD MODEL
interface ICreateNoteBook extends Action<string> {
    type: PanelActionTypes.CreateNoteBook
}
interface ICreateNoteBookSuccess extends Action<string> {
    type: PanelActionTypes.CreateNoteBookSuccess
}
interface ICreateNoteBookFail extends Action<string> {
    type: PanelActionTypes.CreateNoteBookFail
}

interface IDeleteNoteBook extends Action<string> {
    type: PanelActionTypes.DeleteNoteBook
}
interface IDeleteNoteBookSuccess extends Action<string> {
    type: PanelActionTypes.DeleteNoteBookSuccess
}
interface IDeleteNoteBookFail extends Action<string> {
    type: PanelActionTypes.DeleteNoteBookFail
}

// ########################################### TASK CRUD MODEL
interface ICreateTask extends Action<string> {
    type: PanelActionTypes.CreateTask
}
interface ICreateTaskSuccess extends Action<string> {
    type: PanelActionTypes.CreateTaskSuccess
}
interface ICreateTaskFail extends Action<string> {
    type: PanelActionTypes.CreateTaskFail
}

interface IDeleteTask extends Action<string> {
    type: PanelActionTypes.DeleteTask
}
interface IDeleteTaskSuccess extends Action<string> {
    type: PanelActionTypes.DeleteTaskSuccess
}
interface IDeleteTaskFail extends Action<string> {
    type: PanelActionTypes.DeleteTaskFail
}

export type ActionModel = IGetPanelData
    | IGetPanelDataSuccess
    | IGetPanelDataFail
    | IToggleCreateModals
    | ICreateNoteBook
    | ICreateNoteBookSuccess
    | ICreateNoteBookFail
    | IDeleteNoteBook
    | IDeleteNoteBookSuccess
    | IDeleteNoteBookFail
    | ICreateTask
    | ICreateTaskSuccess
    | ICreateTaskFail
    | IDeleteTask
    | IDeleteTaskSuccess
    | IDeleteTaskFail