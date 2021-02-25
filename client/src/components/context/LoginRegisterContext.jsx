import { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
   modalLogin: false,
   modalRegister: false,
   loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_MODAL":
      return {
        ...state,
        modalLogin: true,
        modalRegister: false,
        loading: false,
      };
    case "REGISTER_MODAL":
      return {
        ...state,
        modalLogin: false,
        modalRegister: true,
        loading: false,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modalLogin: false,
        modalRegister: false,
        loading: false,
      };
    default:
      throw new Error();
  }
};

export const ModalContextProvider = ({ children }) => {
  const [stateModal, dispatchModal] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={[stateModal, dispatchModal]}>
      {children}
    </ModalContext.Provider>
  );
};
