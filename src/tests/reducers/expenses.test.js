import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

//default
test("Should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

//remove expense by id
test("Should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

//remove nothing if id not found
test("Should NOT remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: -1
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

//add expense
test("Should add new expense", () => {
  const expense = {
    id: 4,
    description: "Newest Expense",
    note: "",
    amount: 4000,
    createdAt: 1000
  };
  const action = {
    type: "ADD_EXPENSE",
    expense: expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

//Edit expense
test("Should edit expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      description: "Chewing gum"
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe(action.updates.description);
});

//Do NOT edit expense if id not found.
test("Should NOT edit expense if id not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: -2,
    updates: {
      description: "Chewing gum"
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
  //state should be the same as expenses with NO changes.
});

test("Should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
