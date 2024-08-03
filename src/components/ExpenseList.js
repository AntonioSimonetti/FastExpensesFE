import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetExpenses, DeleteExpense, UpdateExpense } from "../services/expenses";
import { Button, Row, Col, Alert } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import "../styles/ExpenseList.css";


export default () => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expensesSlice.expenses); 
    const error = useSelector(state => state.expensesSlice.error);  

    useEffect(() => {
        GetExpenses(dispatch);
        console.log("expenses: ", expenses)
    }, [dispatch]);

    const handleDelete = (expenseId) => {
        DeleteExpense(dispatch, expenseId);
    };

    if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

    if (expenses.length === 0) {
        return <h1 style={{ color:"var(--primary-color)"}}>No expenses added yet</h1>;
    }

    return expenses.map(e => 
        <div key={e.id} data-id={e.id} style={{ marginBottom: "1rem" }}>
            <ListRow expense={e} onDelete={handleDelete}/>
        </div>
    );
}

const ListRow = ({ expense, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    return ( isEditing 
        ? <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
        : <div className="expense-list-div">
              <Row className="row-list">
                  <Col className="col-div-description">{expense.description}</Col>
                  <Col style={{ fontWeight: "bolder"}} className="col-div-amount">{expense.amount}€</Col>
                  <Col className="col-div-btn">
                      <Button variant="warning" className="btn-edit" onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                      <Button variant="danger"  className="btn-delete" onClick={() => onDelete(expense.id)} style={{ marginLeft: "1rem" }}>Delete</Button>
                  </Col>
              </Row>
              <hr />
          </div>
    )
}
