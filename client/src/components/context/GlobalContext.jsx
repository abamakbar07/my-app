import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  loginStatus: true,
  isLogin: false,
  isAdmin: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loginStatus: true,
        isAdmin: false,
        isLogin: true,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin
        },
        loading: false,
      };
    case "ADMIN_LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loginStatus: true,
        isAdmin: true,
        isLogin: false,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin
        },
        loading: false,
        pageTransaction: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        user: {
          id: action.payload.id,
          email: action.payload.email,
          fullName: action.payload.fullName,
          isAdmin: action.payload.isAdmin
        },
        loading: false,
      };
    case "ADMIN_LOADED":
      return {
        ...state,
        isAdmin: true,
        user: {
          id: action.payload.id,
          email: action.payload.email,
          fullname: action.payload.fullname,
          isAdmin: action.payload.isAdmin
        },
        pageTransaction: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loginStatus: false,
      }
    case "REGISTER_SUCCESS":
      return {
        ...state,
        registerStatus: true,
      }
    case "REGISTER_FAILED":
      return {
        ...state,
        registerStatus: false,
        errorMessage: action.payload.message
      }  
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
          isAdmin: "",
        },
        pageTransaction: false,
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
