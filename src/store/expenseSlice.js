import { createSlice } from "@reduxjs/toolkit";
// import initialState from "./initialState";

const initialState = [];

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload);
        },
        removeExpense: (state, action) => {
            const index = state.findIndex(expense => expense.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        editExpense: (state, action) => {
            const index = state.findIndex(expense => expense.id === action.payload.id);
            if (index > -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        }
    }
});

export const { addExpense, removeExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;