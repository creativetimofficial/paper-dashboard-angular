import { ActionReducerMap } from "@ngrx/store";
import * as fromUI from "./reducer/ui/ui.reducer";
import * as fromAuth from "./reducer/auth/auth.reducer";
import * as fromUser from "./reducer/user/user.reducer";

export interface AppState {
  ui: fromUI.UIState;
  auth: fromAuth.AuthState;
  user: fromUser.UserState;
}

export const combineReducer: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
};
