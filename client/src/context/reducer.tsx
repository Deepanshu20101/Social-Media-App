interface Action {
  type: string;
  payload?: any;
}

interface StateProp {
  currentUser: any;
  loading: boolean;
}

const reducer = (state: StateProp, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
