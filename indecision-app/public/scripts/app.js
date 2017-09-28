'use strict';

console.log('App.js is running');

//jsx JavaScript XML
var template = React.createElement(
  'h1',
  null,
  'dIndecision App'
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
