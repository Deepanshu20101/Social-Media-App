import { ReactNode, createContext, useReducer } from "react";
import reducer from "./reducer";

interface Action {
  type: string;
  payload?: any;
}

interface contextProviderProps {
  children: ReactNode;
}

interface StateProp {
  currentUser: any;
  loading: boolean;
}

const initialState: StateProp = {
  currentUser: null,
  loading: false,
};

export const Context = createContext<{
  state: StateProp;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const ContextProvider: React.FC<contextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
