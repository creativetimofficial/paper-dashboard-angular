import { Action } from "@ngrx/store";

export const START_LOADING = "[UI] Start Loading";
export const FINISH_LOADING = "[UI] Finish Loading";

export class StartLoadingAction implements Action {
  readonly type = START_LOADING;
  constructor() {}
}

export class FinishLoadingAction implements Action {
  readonly type = FINISH_LOADING;
  constructor() {}
}

export type actions = StartLoadingAction | FinishLoadingAction;
