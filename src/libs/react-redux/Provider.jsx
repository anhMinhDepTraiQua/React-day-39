import React from "react";
import Context from "./Context";

export default function Provider({ store, children }) {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}
