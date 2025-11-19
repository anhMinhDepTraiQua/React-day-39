import { ADD_TODO, EDIT_TODO, DELETE_TODO } from "./constants";


const initialState = [];


export default function reducer(state = initialState, action) {
switch (action.type) {
case ADD_TODO:
return [...state, action.payload];


case EDIT_TODO:
return state.map((todo) =>
todo.id === action.payload.id
? { ...todo, text: action.payload.text }
: todo
);


case DELETE_TODO:
return state.filter((todo) => todo.id !== action.payload.id);


default:
return state;
}
}