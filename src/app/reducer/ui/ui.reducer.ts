import * as fromUI from "./ui.actions";

export interface UIState {
  loading: boolean;
}

const initState: UIState = {
  loading: false,
};

export const uiReducer = (
  state = initState,
  actions: fromUI.actions
): UIState => {
  switch (actions.type) {
    case fromUI.START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case fromUI.FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
