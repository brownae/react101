import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

const Layout = (props) => {
    return (
        <div>
            <p>Header</p>
            {props.content}
            <p>Footer</p>
        </div>
    );
}

const template = (
    <div>
        <h1>Page title</h1>
        <p>This is my page!</p>
    </div>
);

ReactDOM.render(<Layout content={template}/>, document.getElementById('app'));
