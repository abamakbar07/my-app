import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  isAdmin: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isAdmin: false,
        isUser: true,
        user: {
          name: action.payload.name,
          email: action.payload.email
        },
        loading: false,
      };
    case "ADMIN_LOGIN":
      return {
        ...state,
        isAdmin: true,
        isUser: false,
        user: {
          name: action.payload.name,
          email: action.payload.email
        },
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        user: {
          id: "",
          email: "",
          fullName: "",
          role: "",
        },
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
