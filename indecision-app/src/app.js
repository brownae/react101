console.log('App.js is running')

var app = {
    title: "Indecision App",
    subtitle: 'Put your life in the hands of a computer'
};

var template =(
    <div>
        <h1>{app.title}</h1>
        <p>{app.subtitle}</p>
        <ol>
            <li>Item One</li>
            <li>Item Two</li>
        </ol>
    </div>
);

var user = {
    name : 'Aaron',
    Age : 27,
    Location : 'Seattle, WA'
}

var username = 'Aaron';
var userAge = 27;
var userLocation = 'Seattle, WA';

var templateTwo = (
    <div>
        <h1>{user.name}</h1>
        <p>Age: {user.Age}</p>
        <p>Location: {user.Location}</p>
    </div>
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
