import { addExpense, updateExpense, deleteExpense, deleteExpenseError, addExpenseError, getExpensesError, updateExpenseError } from "../app/expensesSlice";
import { toast } from "react-toastify";

const ToastMiddleware = () => next => action => {
    switch(action.type){
        case addExpense.type:
            toast.success("New expense added successfully!");
            break;
        case updateExpense.type:
            toast.success("Expense edited successfully!");
            break;
        case deleteExpense.type:
            toast.success("Expense deleted successfully!");
            break;
        case getExpensesError.type:
            toast.error("Error loading expenses");
            break;
        case addExpenseError.type:
            toast.error("Error adding new expense");
            break;
        case updateExpenseError.type:
            toast.error("Error editing expense");
            break;
        case deleteExpenseError.type:
            toast.error("Error deleting expense");
            break;
        default:
            break;
    }

    return next(action);
}

export default ToastMiddleware;