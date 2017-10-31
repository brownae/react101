import { createStore, combineReducers } from 'redux';

const demoState = {
    expenses : [{
        id: 'alsdkjfsadf',
        description: 'January Rent',
        note: 'This was the last payment at this address',
        amount: 54000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};
