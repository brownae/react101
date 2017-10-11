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

Lecture 28 Component Props
Props are properties. We learned how to pass data down the line to nested components.
/////////////////////Example

class IndecisionApp extends React.Component {
    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        const options = ['Thing One','Thing Two','Thing Three'];

        return (
            <div> //With 'title={title}' we are setting up key value pairs essentially.
                <Header title={title} subtitle={subtitle}/>
                <Action />
                <Options options={options}/>//HERE declared array and passed it in with the created 'options' prop.
                <AddOption />
            </div>
        );
    }
}

class Options extends React.Component {
    render(){
        return (
            <div>
            { //HERE we grabbed the array through the parent prop and then looped through each item in the array and passed it as a prop to the 'Option' component.
                this.props.options.map((option) => <Option key={option} optionText={option}/>)
            }
            </div>
        );
    }
}

class Option extends React.Component {
    render(){
        return (
            <div>//HERE we are each optionText is returned
                {this.props.optionText}
            </div>
        );
    }
}

/////////////////////END

Lecture 29 Events and Methods.
(Methods are functions of a class). Here we added an event handler 'onSubmit' and we wrote the method right inside the prop and handled it.
/////////////////////Example
class AddOption extends React.Component{
    handleAddOption(e){
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        if (option){
            alert(option+' was typed');
            e.target.elements.option.value = '';
        };

    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}
/////////////////////END

Lecture 30 Method binding.
When we created the 'handleRemoveAll' method in the Options class it changed the context of the 'this' location. By default methods return undefined to the 'this' call. (Render() is not an event handler so it keeps the correct context.) To fix this we override the constructor of the 'React.Component' we extended. we let the default constructor build by using 'super(props);'. then we tie the 'this.handleRemoveAll' to itself with '.bind()' . The first parameter allows you to set the context. By doing this we are ensuring that every time the 'handleRemoveAll' method is called it's context is correct.

/////////////////////Example
class Options extends React.Component {
    constructor(props){
        super(props); // this has to be done or we don't carry on the data and methods from React.Component.
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }

    handleRemoveAll(){
        // alert('handleRemoveAll!');
        console.log(this.props.options);
    }

    render(){
        return (
            <div>
            <button onClick={this.handleRemoveAll}>Remove All</button>
            {
                this.props.options.map((option) => <Option key={option} optionText={option}/>)
            }
            </div>
        );
    }
}
/////////////////////END

Lecture 31 What Is Component State?
React Component state

<Counter />

{
    count: 0
}

1. Set up default state of object.
2. Component rendered with default state values.*
3. Change state based on event.
4. Component re-rendered using new state values.*
5. Start again at 3
(* this happens automatically.)

Lecture 32 Adding State to Counter App: Part 1
returning to counter-example.js we re-write it to use props. and bind the methods to the correct context. Buttons just spit out a console.log().

/////////////////////Example
class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
    };

    handleAddOne(){
        console.log('+1');
    }

    handleMinusOne(){
        console.log('-1');
    }

    handleReset(){
        console.log('Reset');
    }

    render(){
        return(
            <div>
                <h1>Count:</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}
ReactDOM.render(<Counter />, document.getElementById('app'));
/////////////////////END

Lecture 33 Adding State to Counter App: Part 2
wired up the buttons to live update the json object property 'counter:0'. The object is built right inside of constructor.
/////////////////////Example
* nothing inside the render section changed and here is an example of handleAddOne and the constructor.

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        };
    };

    handleAddOne(){
        this.setState((prevState)=> { //prevState or parameter grabs the state in the constructor.
            return {
                count : prevState.count + 1
            }
        });
    }
/////////////////////END

Lecture 34 Alternative setState syntax
Below is alternate syntax used twice to show point that react is asynchronous and so both are done at the same time and the second method is getting old data at the same time the one above is switching it to 0. It's shorter but when it's put inside an Anonymous function one runs and completes before the next starts.
/////////////////////Example
handleReset(){
    // this.setState(()=>{ //original
    //     return {
    //         count : 0
    //     }
    // });
    this.setState({ //First
        count: 0
    });
    this.setState({ // Second executed asynchronously
        count: this.state.count + 1
    });
}
/////////////////////END

Lecture 35 Build it: adding state to VisibilityToggle
Took the build-it-visible.js and made it into a prop and re-wrote methods in context.

/////////////////////Example
class VisibilityToggle extends React.Component{
    constructor(props){
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            toggle : false
        };
    };

    handleToggleVisibility(){
        this.setState((prevState) => {
            return {
                toggle : !prevState.toggle
            }
        });

    };

    render(){
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>{this.state.toggle ? 'Hide Details' : 'Show Details'} </button>
                {this.state.toggle && <p>Some details about things</p>}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));
/////////////////////END

Lecture 36 Indecision State: Part 1
We learned how to get our props to communicate with their parent by passing down functions.

We set up this.state on the top level in 'class IndecisionApp'. Then we passed down a function 'handleDeleteOptions()' to the Action class. when the button to delete is clicked it triggers the 'handleDeleteOptions()' function on the top which resets the options array value to 0, which causes the 'Options' class to re-render and set to 0 on the UI.

Next we created the 'handlePick()' function and passed it down to the 'Action' class. When the 'What should I do' button is pressed it triggers the 'handlePick()' function on top and the math algorithm randomly picks an option from the array and prints it to the screen.

We had to bind both functions to the parent constructors 'this' context with the bind() function.

Also in the 'Action' class we put in an inline method 'hasOptions={this.state.options.length > 0}' which passes down 'true' or 'false' to the button 'disabled' property to make the button disabled if there is nothing in the options array.

/////////////////////Example
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.state = {
            options: ['Thing One','Thing Two','Thing Four']
        };
    }

    handleDeleteOptions(){
        this.setState(() => {
            return {
                options : []
            };
        });
    }

    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }


    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions ={this.handleDeleteOptions}
                />
                <AddOption />
            </div>
        );
    }
}

class Action extends React.Component{
    render(){
        return (
            <div>
                <button onClick={this.props.handlePick} disabled={!this.props.hasOptions}>
                    What should I do?
                </button>
            </div>
        );
    }
}
/////////////////////END

Lecture 37 Indecision State: Part 2
Here we learned how to pass values up to the parent and update 'options'. We created the 'handleAddOption' function and bound it's 'this' context to the IndecisionApp class then passed it down into render, to <AddOption/> class. There we built into the handleAddOption function that was there and after minor validation passed the values up.

We also learned how to pass back an error message if something goes wrong.

/////////////////////Example
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
    }

    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState)=>{
            return {
                options: prevState.options.concat(option)
            };
        });
    }

    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions ={this.handleDeleteOptions}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(()=>{
            return {
                error //same as... error: error
            }
        });
    }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}
/////////////////////END

Lecture 38 Summary: Props vs States.

Props -
    an object
    Can be used when rendering
    Changes from above cause re-rendering
    Comes from above
    Can't be changed by component itself

State -
    an object
    Can be used when rendering
    Changes cause re-rendering
    Defined in component itself
    Can't be changed by component itself

Lecture 40 SECTION 5 Intro Stateless functional components
Here we switched some class based components to function based components.

Stateless functional components are good for when you don't need to do much except pass info down or trigger a single function. If you are only calling render in a class based component, then it should probably be a Stateless functional component.

Class based is when you need to do more complicated things like add a state.

/////////////////////Example

//NEW function based component
const Option = (props) => { //pass in the props
    return (
        <div>
            {props.optionText} // drop the 'this' not needed.
        </div>
    );
};

//OLD
// class Option extends React.Component {
//     render(){
//         return (
//             <div>
//                 {this.props.optionText}
//             </div>
//         );
//     }
// }

/////////////////////END

Lecture 41 Default prop values
This way of setting defaultProps is the same for a class or function component.

Beneath class or function type the name with '.defaultProps' attached.
You can then get rid of where it was called earlier and it will get overridden if a prop is passed in where the component is called. In a class component where the 'this.state = {}' is declaring the prop value make it reference the props.title
/////////////////////Example

const Header = (props) =>{
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

<Header title={'New Name'} /> //this would override the default.
/////////////////////END

Lecture 42 React Dev Tools
Introduces the chrome React dev tool.

Lecture 43 Removing Individual options
converting 'this.setState' from explicitly using a return to implicitly return an object.

We also added a button to each option in the list. We created a function 'handleDeleteOption' and passed it down the chain through <Options /> to <Option />.
/////////////////////Example
    //Before
    <!-- handleDeleteOptions(){
        this.setState(() => {
            return {
                options : []
            };
        });
    } -->
    //after
    this.setState(()=>({options : [] }));
/////////////////////////

    handleDeleteOption(optionToRemove){ //Created function
        this.setState((prevState)=>({
            options : prevState.options.filter((option)=>{
                return optionToRemove !== option; //the filter() function removes anything from an array that returns false. So here we are saying if what is passed does not match the option then keep it. If it does match then remove it.
            })
        }));
    }

    render(){
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions ={this.handleDeleteOptions}
                    handleDeleteOption ={this.handleDeleteOption} //Passed prop down...
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }

    const Options = (props) => {
        return (
            <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption} //Added as a prop in Option
                    />
                ))
            }
            </div>
        );
    };

    const Option = (props) => {
        return (
            <div>
                {props.optionText}
                <button
                    onClick={(e) => {
                        props.handleDeleteOption(props.optionText);// made it here! To prevent it from passing up the event we had to do an inline function explicitly handing in the text... 'props.optionText'.
                    }}>
                    Remove
                </button>
            </div>
        );
    };
/////////////////////END
