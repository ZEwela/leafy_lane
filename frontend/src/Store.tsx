import React from "react";
import { Cart, CartItem } from "./types/Cart";
type AppStore = {
  mode: string;
  cart: Cart;
};

const initialState: AppStore = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "TOGGLE_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem };

function reducer(state: AppStore, action: Action): AppStore {
  switch (action.type) {
    case "TOGGLE_MODE":
      return {
        ...state,
        mode: state.mode === "dark" ? "light" : "dark",
      };
    case "CART_ADD_ITEM": {
      const newItem: CartItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      const cartItems: any = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<object>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppStore, Action>>(
    reducer,
    initialState
  );
  const value = { state, dispatch };
  return <Store.Provider value={value} {...props} />;
}

export { Store, StoreProvider };
