console.log('App.js is running')

//jsx JavaScript XML
//var template = <p>This is JSX from app.js!</p>;

var template = React.createElement(
  "p",
  { id: "happy" },
  "This is JSX from app.js!"
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
