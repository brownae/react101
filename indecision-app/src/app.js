console.log('App.js is running')

var app = {
    title: "Indecision App",
    subtitle: 'Put your life in the hands of a computer',
    options: ['One','Two']
};

var template =(
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p> }
        {app.options.length > 0 ? <p>Here are your options</p> : <p>No Options</p> }
        <ol>
            <li>Item One</li>
            <li>Item Two</li>
        </ol>
    </div>
);

var user = {
    name : 'Aaron',
    age : 27,
    location : 'Seattle, WA'
};

function getLocation(location){
    if (location){
        return <p>Location: {location}</p>;
    }
};

var templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
);

var appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
