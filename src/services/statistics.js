import axios from "axios";
import { setExpenseAmountPerCategory } from "../app/statisticsSlice";


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

export const getExpensesPerCategory = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("/api/Statistics");
        dispatch(setExpenseAmountPerCategory(data))
    } catch (error) {
        console.log(error)
    }
}