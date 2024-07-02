interface Action {
  type: string;
  payload?: any;
}

interface StateProp {
  currentUser: any;
  loading: boolean;
  timelinePost: {
    _id: string;
    userId: string;
    caption: string;
    img: string;
    likes: string[];
    comments: string[];
    createdAt: Date;
  }[];
}

const reducer = (state: StateProp, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null };
    case "GET_POST":
      return { ...state, timelinePost: action.payload };
    case "UPDATE_POST":
      return {
        ...state,
        timelinePost: [...state.timelinePost, action.payload],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
