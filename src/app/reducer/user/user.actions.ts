import { Action } from "@ngrx/store";
import { AuthUser } from "app/interface/AuthResponse";
import { UserPages } from "app/interface/UserResponse";

export const ADD_USER = "[USER] Add User";
export const REMOVE_USER = "[USER] Remove User";
export const LOAD_USERS = "[USER] Load User";
export const RESET_USERS = "[USER] Reset User";

export class AddUserAction implements Action {
  readonly type = ADD_USER;
  constructor(public payload: AuthUser) {}
}

export class RemoveUserAction implements Action {
  readonly type = REMOVE_USER;
  constructor(public payload: string) {}
}

export class LoadUserAction implements Action {
  readonly type = LOAD_USERS;
  constructor(public payload: UserPages) {}
}

export class ResetUserAction implements Action {
  readonly type = RESET_USERS;
  constructor() {}
}

export type actions =
  | AddUserAction
  | RemoveUserAction
  | LoadUserAction
  | ResetUserAction;
