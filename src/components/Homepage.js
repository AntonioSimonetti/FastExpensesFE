import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
    return(
    <div style={{width: "60%", margin:"auto"}}>
        <ToastContainer />
        <h3 style={{ color: "var(--primary-color)", marginTop: "1rem", marginBottom: "1rem"}}>Add a new Expense</h3>
        <ExpenseForm />
        <hr style={{ border: "1px solid grey "}} />
        <h3 style={{ color: "var(--primary-color)"}}>Your Expenses</h3>
        <ExpenseList/>
    </div>
    )
}

export default HomePage;