import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.sass';

const ExpenseDashboardPage = () => (
    <div>
        This is from my Dashboard component.
    </div>
);

const AddExpensePage = () => (
    <div>
        This is from AddExpensePage component.
    </div>
);

const EditExpensePage = () => (
    <div>
        This is from EditExpensePage component.
    </div>
);

const HelpPage = () => (
    <div>
        This is from HelpPage component.
    </div>
);

const routes = (
    <BrowserRouter>
        <div>
            <Route path='/' component={ExpenseDashboardPage} exact={true}/>
            <Route path='/create'  component={AddExpensePage}/>
            <Route path='/edit'  component={EditExpensePage}/>
            <Route path='/help'  component={HelpPage}/>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
