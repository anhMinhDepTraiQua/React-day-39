import { useContext, useSyncExternalStore } from "react";
import Context from "./Context";

export function useStore() {
  return useContext(Context);  // Nhận store từ Provider
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

export function useSelector(selector) {
  const store = useStore();
  
  if (!store) {
    throw new Error("useSelector must be used within a Provider");
  }

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}
