import { ReactNode, createContext, useEffect, useReducer } from "react";
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

const currentUserStorage = localStorage.getItem("currentUser");

const initialState: StateProp = {
  currentUser: currentUserStorage ? JSON.parse(currentUserStorage) : null,
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

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [state.currentUser]);

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
