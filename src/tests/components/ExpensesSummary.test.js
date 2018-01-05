import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('Should render ExpensesSummary correctly with 1 expense',() =>{
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary correctly with multiple expenses',() =>{
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={2352345234}/>);
    expect(wrapper).toMatchSnapshot();
});
