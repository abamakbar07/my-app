import { createContext, useReducer } from "react";

export const StyleContext = createContext();

const initialState = {
  textAlign: "center",
  background: "url('./assets/bgDashboard.png')",
  backgroundSize: "auto",
  backgroundRepeat: "no-repeat",
  /* background-attachment: fixed, */
  backgroundPosition: "center top",
  backgroundColor: "#f3f3f3",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DASHBOARD":
      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

export const StyleContextProvider = ({ children }) => {
  const [stateStyle, dispatchStyle] = useReducer(reducer, initialState);

  return (
    <StyleContext.Provider value={[stateStyle, dispatchStyle]}>
      {children}
    </StyleContext.Provider>
  );
};
