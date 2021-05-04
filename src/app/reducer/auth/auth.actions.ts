import { Action } from "@ngrx/store";
import { AuthUser } from "app/interface/AuthResponse";

export const SET_USER = "[AUTH] Save User";
export const UNSET_USER = "[AUTH] Delete User";

export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor(public payload: AuthUser) {}
}

export class UnsetUserAction implements Action {
  readonly type = UNSET_USER;
  constructor() {}
}

export type actions = SetUserAction | UnsetUserAction;
