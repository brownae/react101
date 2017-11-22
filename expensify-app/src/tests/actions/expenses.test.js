import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

//removeExpense
test('Should setup remove expense action object', () =>{
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

//editExpense
test('Should setup edit expense action object', () =>{
    const action = editExpense('abc123',{ description: 'Rent'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            description: 'Rent'
        }
    });
});

//two tests for addExpense
//Values being passed in work.
test('Should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'Paid on second',
        amount: 109500,
        createdAt: 1000
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

//Default values work
test('Should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});
