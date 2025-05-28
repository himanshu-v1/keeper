import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setState: (state, action) => {
            state.push(...action.payload);
        },
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

export const { setState, addExpense, removeExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;