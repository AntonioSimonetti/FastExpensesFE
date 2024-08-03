import { addExpense, addExpenseError, getExpenses, getExpensesError, deleteExpense, deleteExpenseError, updateExpense, updateExpenseError  } from "../app/expensesSlice";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://expensesbe.azurewebsites.net/",    
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const AddExpense = async (dispatch, expense) => {
    try {
        const { data } = await axiosInstance.post("/api/expenses/AddExpense", expense);
        dispatch(addExpense(data));
    } catch (error) {
        console.error("AddExpense Error:", error);
        dispatch(addExpenseError(error));
    }
}

export const GetExpenses = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("/api/expenses/GetExpenses");
        console.log("data in get expenses: ", data);

        dispatch(getExpenses(data));
    } catch (error) {
     

       if (error.response.data === "No expenses found for the user.") {
            console.log("No expenses found, skipping error dispatch.");
            return; // dont dispatch the error, the component tells already no expense found to the user
        }
        dispatch(getExpensesError({ message: error.message, code: error.code }));
    }
};

export const DeleteExpense = async (dispatch, expenseId) => {
    try {
        const response = await axiosInstance.delete(`/api/expenses/DeleteExpense/${expenseId}`);
        if (response.status === 204) {
            dispatch(deleteExpense(expenseId));
        } else {
            throw new Error('Failed to delete expense');
        }
    } catch (error) {
        console.error("DeleteExpense Error:", error);
        dispatch(deleteExpenseError({ message: error.message, code: error.code }));
    }
}

export const UpdateExpense = async (dispatch, expense) => {
    try {
        const { data } = await axiosInstance.put(`/api/expenses/UpdateExpense/`, expense);
        console.log('UpdateExpense response data:', data);
        dispatch(updateExpense(data));
    } catch (error) {
        console.error("UpdateExpense Error:", error);
        dispatch(updateExpenseError(error));
    }
};
