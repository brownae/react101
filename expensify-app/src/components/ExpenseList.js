import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = (props) => ( //This is the component we want
    <div>
        <h1>Expense List</h1>
        {props.expenses.length}
        {props.filters.text}
    </div>
);

const mapStateToProps = (state)=> { //this is a function we make to define what we want to bring in from the store.
    return {
        expenses: state.expenses,
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseList);//Here we use a built in react-redux HOC component that connects our store with OUR component.
