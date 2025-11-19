import ContextDefault from './Context';
import ProviderDefault from './Provider';
import { useStore as useStoreDefault, useDispatch as useDispatchDefault, useSelector as useSelectorDefault } from './hooks';


export const Context = ContextDefault;
export const Provider = ProviderDefault;
export const useStore = useStoreDefault;
export const useDispatch = useDispatchDefault;
export const useSelector = useSelectorDefault;


export default {
Context,
Provider,
useStore,
useDispatch,
useSelector,
};