import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import { AddExpense, UpdateExpense } from '../services/expenses';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/ExpenseForm.css";

const ExpenseForm = ({ expense = null, setIsEditing = () => {} }) => {
    const descriptions = ['Groceries', 'Credit Card', 'Student Loans', 'Eating out', 'Gas'];
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticationSlice.userId);

    const isEditing = Boolean(expense);

    useEffect(() => {
        if (expense) {
            setDescription(expense.description);
            setAmount(expense.amount);
        }
    }, [expense]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const expenseData = { description, amount: Number(amount), userId };

        if (isEditing) {
            console.log('Updating data:', { ...expenseData, id: expense.id });
            UpdateExpense(dispatch, { ...expenseData, id: expense.id }); 
        } else {
            console.log('Adding data:', expenseData);
            AddExpense(dispatch, expenseData);
        }

        if (setIsEditing) {
            setIsEditing(false);
        }
    };


     
    return (

    <Form onSubmit={handleSubmit} className='add-expense-form'>
            <Row>
                <Col>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='select' onChange={event => setDescription(event.target.value)}>
                        {descriptions.map((d, idx) => <option key={idx}>{d}</option>)}
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type='number'
                        step='0.01'
                        placeholder="Enter amount"
                        value={amount}
                        onChange={event => setAmount(event.target.value)} 
                    />
                </Col>
                <div style={{ marginTop: 'auto' }}>
                    <Button variant='primary' type='submit' className='btn-form-add-expense'>     
                        {isEditing ? 'Save' : 'Add'}
                    </Button>
                </div>
            </Row>
        </Form>
    );
}

export default ExpenseForm;




