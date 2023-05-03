import React from "react";
type AppStore = {
  mode: string;
};

const initialState: AppStore = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

type Action = { type: "TOGGLE_MODE" };

function reducer(state: AppStore, action: Action): AppStore {
  switch (action.type) {
    case "TOGGLE_MODE":
      return {
        mode: state.mode === "dark" ? "light" : "dark",
      };
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
