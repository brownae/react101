import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

const NotFoundPage = () => (
    <div>
        404 This is from NotFoundPage component.
    </div>
);

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path='/' component={ExpenseDashboardPage} exact={true}/>
            <Route path='/create'  component={AddExpensePage}/>
            <Route path='/edit'  component={EditExpensePage}/>
            <Route path='/help'  component={HelpPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
