import { ActionTypes } from './actions';
import { AppContextAction, AppContextState } from './types';

const initialAppContextState: AppContextState = {
  user: null,
};

export const AppContextReducer = (state: AppContextState, action: AppContextAction): AppContextState => {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED_USER:
      return { ...state, user: action.payload };

    case ActionTypes.RESET_STORE:
      return initialAppContextState;

    default:
      return state;
  }
};

export default initialAppContextState;
