import React, { createContext, useMemo, useReducer } from 'react';
import { Customer } from '@commercetools/platform-sdk';

type User = Customer | null;

type State = {
  user: User;
  authIsReady: boolean;
};

export type Action = {
  type: string;
  payload: User | null;
};

type AuthContextType = {
  user: User;
  authIsReady: boolean;
  dispatch: React.Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, authIsReady: true };
    case 'LOGOUT':
      return { ...state, user: action.payload };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
