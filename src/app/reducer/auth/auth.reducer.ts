import * as fromAuth from "./auth.actions";
import { AuthUser } from "../../interface/AuthResponse";

export interface AuthState {
  user: AuthUser;
}

const initState: AuthState = {
  user: null,
};

export const authReducer = (
  state = initState,
  actions: fromAuth.actions
): AuthState => {
  switch (actions.type) {
    case fromAuth.SET_USER:
      return {
        ...state,
        user: actions.payload,
      };
    case fromAuth.UNSET_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
