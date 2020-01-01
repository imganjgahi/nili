

import { IAuthState } from '../actions/Auth/model';
export interface IApplicationState {
    auth: IAuthState,
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
