import moment from 'moment';
import filtersReducer from '../../reducers/filters';

//Default nothing passed in.
test('Should setup default filter values',() => {
    const state = filtersReducer(undefined,{ type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

//sortBy amount
test('Should set sortBy to amount',() => {
    const state = filtersReducer(undefined,{ type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

//sortBy date
test('Should set sortBy to date',() => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = { type: 'SORT_BY_DATE'}
    const state = filtersReducer(currentState,action);
    expect(state.sortBy).toBe('date');
});

//text filter
test('Should set text filter',() => {
    const action = { type: 'SET_TEXT_FILTER', text: 'this is my filter'};
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(action.text);
});

//startDate filter
test('Should set startDate filter',() => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate: startDate
    };
    const state = filtersReducer(undefined,action);
    expect(state.startDate).toEqual(startDate);
});

//endDate filter
test('Should set endDate filter',() => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate: endDate
    };
    const state = filtersReducer(undefined,action);
    expect(state.endDate).toEqual(endDate);
});
