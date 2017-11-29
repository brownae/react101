import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => ( //This is the component we want
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ) : (
                props.expenses.map((expense)=>{
                    <ExpenseListItem key={expense.id} {...expense}/>
                })
            )
        }
        {props.expenses.map((expense)=>(
                <ExpenseListItem key={expense.id} {...expense}/>
            ))
        }
    </div>
);

const mapStateToProps = (state)=> { //this is a function we make to define what we want to bring in from the store.
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);//Here we use a built in react-redux HOC component that connects our store with OUR component.
