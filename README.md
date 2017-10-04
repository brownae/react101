# react101
A place where I'm going to put all the things about react.js



Notes:
From root of folder...
To reinstall dependencies: $ yarn install
To run babel and have it watch: $ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

You can run two terminal windows at the same time.
To run live server: $ live-server public //public is folder to run.

To template in react create and js object and then inject using {}'s. Then render in the html using ReactDOM.render(name of template, where you want it to go)

Example:
//////////////////////////
var user = {
    name : 'Aaron',
    Age : 27,
    Location : 'Seattle, WA'
}

var templateTwo = (
    <div>
        <h1>{user.name}</h1>
        <p>Age: {user.Age}</p>
        <p>Location: {user.Location}</p>
    </div>
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
///////////////////////////END

lecture 11 Conditional Rendering
Leaned 3 ways of Conditional rendering. 1 through a function, 2 through shorthand ternary operator and 3 logical && operator.


///////////////////////////Examples
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
//////////////////////////END

lecture 13 Const and let
file playground/es6-let-const.js

lecture 14 Arrow Functions pt 1
file playground/es6-arrow-function.js

Lecture 15 ES6 Aside: Arrow functions
file playground/es6-arrow-function2.js

Lecture 16 Events and attributes
Shows how to use class as className in jsx and how to do onClick event.

Lecture 17 Manual Data Binding
manually bound data using a custom function that re-rendered the template after each onClick event.
///////////////////// example
let count = 0;
const addOne = () => {
    count++;
    renderCounterApp();
};

const renderCounterApp = () => {

    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    );

    ReactDOM.render(templateTwo, appRoot);
};

renderCounterApp();
///////////////////////END

Lecture 18 Forms and input
Learned to create a form and to use the onFormSubmit event handler from react documentation on forms. Still need to prevent the event default.
///////////////////////Example
const onFormSubmit = (e) => {

    e.preventDefault();

    const option = e.target.elements.option.value; //(note:option is the name of the element we are getting value of.)

    if (option){
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    };
};

<form onSubmit={onFormSubmit}>
    <input type="text" name="option"/>
    <button>Add Option</button>
</form>
//////////////////////END

Lecture 19 Arrays in JSX
Arrays are supported by JSX. You can use boolean values but they will not render. Strings, numbers and floats will render. You can also put JSX in the array and it will render. When rendering repeating li's or other elements the key property must be added and have a unique value. react keeps track of every element and it must have an identifier.
/////////////////////Example
//in this example we looped/mapped through the app.options and updated the array with the value wrapped in an li tag with a key that is the same value.
<ol>
    {
        app.options.map((option) => {
            return <li key={option}> {option}</li>
        })
    }
</ol>
/////////////////////END

Lecture 20 Picking an option
How to set up a randomNum using the Math.random and then picking a random option from the options given. How to disable a button with an argument.

/////////////////////Example
const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
    console.log(randomNum);
};

<button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
/////////////////////END

Lecture 21 Build-it Visibility toggle
This was a challenge exercise to make a simple toggle option to hide and show details. This is the whole app.
/////////////////////Example
let toggle = false;


let toggler = () => {
    toggle = !toggle;
    render();
    console.log('End ');
};

const render = () => {
    const template = (
        <div>
            <h1>Visibility Toggle</h1>

            <button onClick={toggler}>{toggle ? 'Hide Details' : 'Show Details'}</button>
            {toggle && <p>Some details about things</p>}
        </div>
    );
    ReactDOM.render(template, document.getElementById('app'));
};

render();
/////////////////////END

Lecture 24 ES6 Classes pt 1
Class = bluepint. Learned about creating classes and the syntax to set default values in the constructor.
/////////////////////Example
class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting(){
        //return 'Hi! I am '+ this.name;
        return `Hi I am ${this.name}!`;
    }

    getDescription(){
        return `${this.name} is ${this.age} years old.`;
    }
}

const me = new Person('Aaron', 34);
console.log(me.getDescription());

const kid = new Person();
console.log(kid.getDescription());
/////////////////////END

Lecture 25 ES6 Classes pt 2
How to extend class. 'super' is used to refer to parent class and pass on to extended class.
/////////////////////Example

class Traveler extends Person {
    constructor(name,age,homeLocation){
        super(name,age);//super means get from parent
        this.homeLocation = homeLocation;//connect the new property
    }

    getDescription(){  this is overriding the parent class.
        let greeting = super.getGreeting();

        if (this.homeLocation()){
            greeting += ` I'm visiting from ${this.homeLocation}.`;
        }

        return greeting;
    }

}

const me = new Traveler('Aaron', 34,'Seattle, Wa');
console.log(me.getDescription());

/////////////////////END

Lecture 26 Creating a react component
Moved jsx Indecision app out of app.js to playground jsx-indecision.js
react components are just extended react classes. The have to be named with an uppercase first letter and have to define a 'render(){}' method. To use them you call them inside some jsx. They look like custom html tags.
/////////////////////Example
//This is a bare bones working react component with static values.

class Header extends React.Component {
    render(){
        return (
            <div>
                <h1>Indecision</h1>
                <h2>Put your life in the hands of a computer</h2>
            </div>
        );
    }
}

const jsx = (
    <div>
        <Header /> // this is calling the header above.
        <Action />
        <Options />
        <AddOption />
    </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
/////////////////////END

Lecture 27 Nesting Components
Our components can render jsx, so they can render other components inside. The parent component was the only thing rendered in the reactDOM.render call on the bottom of the page, but it's children also get called.
/////////////////////Example
// the Option component is called inside the 'Options' component which was called inside the 'IndecisionApp' component below.

    class Options extends React.Component {
        render(){
            return (
                <div>
                Options component here
                    <Option />
                </div>
            );
        }
    }

// we can render the top level parent in the ReactDOM and it will render the components inside of it and on down the line
    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
/////////////////////END
