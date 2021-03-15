import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  carts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      const filterExistedProductFormCart = state.carts.filter(
        (product) => product.id === action.payload.id
      );

      if (filterExistedProductFormCart.length > 0) {
        return {
          ...state,
          carts: state.carts.map((product) =>
            product.id === action.payload.id
              ? {
                  ...product,
                  qty: product.qty + 1,
                }
              : product
          ),
        };
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...action.payload,
            qty: 1,
          },
        ],
      };
    case "REMOVE_CART":
      return {
        ...state,
        carts: state.carts.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        carts: [],
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [stateCart, dispatchCart] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[stateCart, dispatchCart]}>
      {children}
    </CartContext.Provider>
  );
};
