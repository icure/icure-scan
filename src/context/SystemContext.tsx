import React, { createContext, useReducer } from 'react';
import {
  SystemAction,
  SystemActionTypes,
  SystemState,
} from './reducer-action/SystemReducerActions';

const systemReducer = (
  state: SystemState,
  action: SystemAction
): SystemState => {
  switch (action.type) {
    case SystemActionTypes.SetCryptoReady:
      const cryptoReady = action.payload;
      return {
        ...state,
        cryptoReady,
        systemReady: state.storeReady && cryptoReady,
      };
    case SystemActionTypes.SetSecureStoreAvailable:
      const storeReady = action.payload;
      return {
        ...state,
        storeReady,
        systemReady: storeReady && state.cryptoReady,
      };
    case SystemActionTypes.SetCheckCompleted:
      return { ...state, checkCompleted: true };
    case SystemActionTypes.SetError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const setCryptoReady = (dispatch: React.Dispatch<SystemAction>) => async (
  status: boolean
) => {
  dispatch({ type: SystemActionTypes.SetCryptoReady, payload: status });
};

const setStoreReady = (dispatch: React.Dispatch<SystemAction>) => async (
  status: boolean
) => {
  dispatch({
    type: SystemActionTypes.SetSecureStoreAvailable,
    payload: status,
  });
};

const setSystemChecked = (dispatch: React.Dispatch<SystemAction>) => async (
  status: boolean
) => {
  dispatch({ type: SystemActionTypes.SetCheckCompleted, payload: status });
};

const setError = (dispatch: React.Dispatch<SystemAction>) => async (
  error: any
) => {
  dispatch({ type: SystemActionTypes.SetError, payload: error });
};

const defaultSystemState: SystemState = {
  cryptoReady: false,
  storeReady: false,
  systemReady: false,
  checkCompleted: false,
  error: '',
};

const systemDefaultDispatcher = {
  setCryptoReady: (_: boolean) => Promise.resolve(),
  setStoreReady: (_: boolean) => Promise.resolve(),
  setSystemChecked: (_: boolean) => Promise.resolve(),
  setError: (_: any) => Promise.resolve(),
};

export const Context = createContext<{
  state: SystemState;
  setCryptoReady: (status: boolean) => Promise<void>;
  setStoreReady: (status: boolean) => Promise<void>;
  setSystemChecked: (status: boolean) => Promise<void>;
  setError: (error: any) => Promise<void>;
}>({
  state: defaultSystemState,
  ...systemDefaultDispatcher,
});

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(systemReducer, defaultSystemState);

  const dispatcher = {
    setCryptoReady: setCryptoReady(dispatch),
    setStoreReady: setStoreReady(dispatch),
    setSystemChecked: setSystemChecked(dispatch),
    setError: setError(dispatch),
  };
  return (
    <Context.Provider value={{ state, ...dispatcher }}>
      {children}
    </Context.Provider>
  );
};

export default { Context, Provider };
