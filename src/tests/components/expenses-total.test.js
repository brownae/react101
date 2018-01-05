import getExpenseTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('Should return 0 if no expenses',() =>{
    const response = getExpenseTotal([]);
    expect(response).toBe(0);
});

test('Should correctly add up a single expense',() =>{
    const response = getExpenseTotal([expenses[0]]);
    expect(response).toBe(195);
});

test('Should correctly add up all expenses',() =>{
    const response = getExpenseTotal(expenses);
    expect(response).toBe(114195);
});
