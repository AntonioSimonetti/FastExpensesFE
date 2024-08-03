import { createSlice, createAction } from "@reduxjs/toolkit";

export const addExpenseError = createAction("newExpenseError");
export const getExpensesError = createAction("getExpensesError");
export const updateExpenseError = createAction("editExpenseError");
export const deleteExpenseError = createAction("deleteExpenseError");

export const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState: {
        expenses: [],
        error: null
    },
    reducers: {
      
        addExpense: (state, action) => {
            return {...state, expenses: [action.payload, ...state.expenses]}
        },
        getExpenses: (state, action) => {
            return { ...state, expenses: action.payload, error: null };
        },
        deleteExpense: (state,action) => {
            return { ...state, expenses: state.expenses.filter(expense => expense.id !== action.payload) }
        },
        updateExpense: (state, action) => {
            console.log('updateExpense reducer called with:', action.payload);
            const updatedExpense = action.payload;
            const expenses = state.expenses.map(expense =>
                expense.id === updatedExpense.id ? updatedExpense : expense
            );
            return { ...state, expenses, error: null };
        },
      
    }
})

export const { addExpense, getExpenses, deleteExpense, updateExpense  } = expensesSlice.actions;

export default expensesSlice.reducer;