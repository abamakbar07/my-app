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
    case "TEST_ADMIN":
      return {
        ...state,
        isAdmin: true,
        user: {
          name: action.payload.name,
          email: action.payload.email
        },
        loading: false,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        loading: false,
      }
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
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
