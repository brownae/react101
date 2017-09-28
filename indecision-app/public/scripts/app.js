'use strict';

console.log('App.js is running');

var app = {
    title: "Indecision App",
    subtitle: 'Put your life in the hands of a computer'
};

var template = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        app.title
    ),
    React.createElement(
        'p',
        null,
        app.subtitle
    ),
    React.createElement(
        'ol',
        null,
        React.createElement(
            'li',
            null,
            'Item One'
        ),
        React.createElement(
            'li',
            null,
            'Item Two'
        )
    )
);

var user = {
    name: 'Aaron',
    Age: 27,
    Location: 'Seattle, WA'
};

var username = 'Aaron';
var userAge = 27;
var userLocation = 'Seattle, WA';

var templateTwo = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        user.name
    ),
    React.createElement(
        'p',
        null,
        'Age: ',
        user.Age
    ),
    React.createElement(
        'p',
        null,
        'Location: ',
        user.Location
    )
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
