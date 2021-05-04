import { UserPages } from "app/interface/UserResponse";
import * as fromUser from "./user.actions";

export interface UserState {
  dataPages: UserPages;
}

const initState: UserState = {
  dataPages: null,
};

export const userReducer = (
  state = initState,
  actions: fromUser.actions
): UserState => {
  switch (actions.type) {
    case fromUser.ADD_USER:
      return {
        ...state,
        dataPages: {
          ...state.dataPages,
          results: [...state.dataPages.results, actions.payload],
        },
      };

    case fromUser.REMOVE_USER:
      return {
        ...state,
        dataPages: {
          ...state.dataPages,
          results: state.dataPages.results.filter(
            (user) => user.id !== actions.payload
          ),
        },
      };

    case fromUser.LOAD_USERS:
      return {
        ...state,
        dataPages: { ...actions.payload },
      };

    case fromUser.RESET_USERS:
      return {
        ...state,
        dataPages: null,
      };

    default:
      return state;
  }
};
