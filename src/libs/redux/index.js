function createStore(reducer, preloadedState){
    let state = reducer(preloadedState, {
      type: '@@redux/INITj.l.z.h.t.o'
    })
    const listeners = [];
    return{
      getState(){
        return state;
      },
      dispatch(action){
        state = reducer(state, action)
        listeners.forEach(listener => listener());
      },
      subscribe(listener){
        listeners.push(listener);
        return function unsubscribe(){
          const index = listeners.indexOf(listener);
          listeners.splice(index, 1);
        }
      }
    }
  }

export default createStore;