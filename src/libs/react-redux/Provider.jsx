import Context from '../Context.js';

function Provider({store, children}){
    return <Context.Provider value={store}>{children}</Context.Provider>;
}

export default Provider;