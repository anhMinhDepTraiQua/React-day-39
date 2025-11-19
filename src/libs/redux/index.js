export function createStore(reducer, preloadedState) {
  let state = preloadedState;
  let listeners = [];

  state = reducer(state, { type: "@@redux/INIT" });

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  return { getState, dispatch, subscribe };
}
