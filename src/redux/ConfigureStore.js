import { combineReducers, configureStore } from '@reduxjs/toolkit';
import  addLegSlice  from "./ducks/TodoReducer";

export const reducer = combineReducers({
    addLegSlice 
})

export const store = configureStore({
    reducer
})
