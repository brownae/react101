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
///////////////////////////End

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
//////////////////////////End

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
///////////////////////End

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
//////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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

/////////////////////End

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
/////////////////////End

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
/////////////////////End

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

/////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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
/////////////////////End

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

/////////////////////End

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
/////////////////////End

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
/////////////////////End

Lecture 44 Lifecycle methods
methods that will fire at specific times in the components lifecycle.
They are only available in class based components. They do not work in stateless functional components.
/////////////////////Example
    componentDidMount(){
        console.log('fetching data!');
    }
    componentDidUpdate(prevProp, prevState){
        console.log('saving data');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
/////////////////////End

Lecture 45 Saving and loading options data
    Here we used 'localStorage' to save our data. 'localStorage' is a browser based session. It persists as long as the window is open. 'localStorage(key, value)' takes two parameters. Note: 'localStorage' only works with string data.

    1. We learned how to only store data if there is something there and to show error in body if there is one.
    2. I learned that we can call the same method from the button later at the top. when it's clicked it fires the local method and then fires the parent method when it gets to it.
    3. after all the methods are fired if it causes a change it fires the componentDidUpdate() method and thats where the 'this.state.options' gets stringify'd and stored into localStorage.
    4. Then the componentWillMount() gets fired and it unpacks the localStorage and makes it into a json object and passes it back to the program to render it in a .map loop in the Options function based component.

    I'm pretty sure this is right. :-/

/////////////////////Example
1.
    handleAddOption(e){
        e.preventDefault();

        const option = e.target.elements.option.value.trim();//grabs input
        const error = this.props.handleAddOption(option);// sets message to error var.

        this.setState(()=>({ error: error })); binds error var to error state.

        if (!error){ // if there is no error is false then reset the input value.
            e.target.elements.option.value = '';
        } // if there is an error then it will pass on to the re-render below.
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
End 1.

2.
    //From the parent level(IndecisionApp class) which gets called last when there is a change...
    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState)=>({
                options: prevState.options.concat(option)//here the new option gets concatenated onto the option list.
            }));
    }

    //From the AddOption class...
    handleAddOption(e){ //the e is the event
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(()=>({ error: error }));

        if (!error){
            e.target.elements.option.value = '';
        }
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

    3.
    componentDidUpdate(prevProp, prevState){
        if (prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }

    }

    4.
    componentWillMount(){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options){
                this.setState(()=>({ options: options}));
            }
        } catch (e) {
            //if JSON data is not valid then it will do nothing.
        }

    }

/////////////////////End

Lecture 45 Saving and loading the count
    We used the lifecycle methods to store the count every time the number was updated in componentDidUpdate(prevProp, prevState) and then to call the number from localStorage in componentWillMount() which happens when the page loads. it parses the localStorage value to an int and then passes it to the this.state.count.

    essentially the localStorage always keeps track of the count and then passes it back in when the page is loaded
/////////////////////Example
class Counter extends React.Component {
    constructor(props){ // constructor method
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0 // <-This is not even needed
        };
    };

    componentWillMount(){
        try {
            const count = parseInt(localStorage.getItem('count'));
            if (!isNaN(count)){
                this.setState(()=>({ count: count}));
            }
        } catch (e) {
            //if JSON data is not valid then it will do nothing.
        }

    }

    componentDidUpdate(prevProp, prevState){ //fires with every update.
        if (prevState.count !== this.state.count){
            localStorage.setItem('count', this.state.count);
        }
    }

    handleAddOne(){ //Method
        this.setState((prevState)=> {
            return {
                count : prevState.count + 1
            }
        });
    }

/////////////////////End

Lecture 47 Intro to Webpack

Lecture 48 What is Webpack?
High level overview. Webpack is a bundler and task runner.

Lecture 49 Avoid Global Modules
    When we download global modules it doesn't save in dependencies in the package.json file. So if we are sharing the project the next person will be missing useful tool.

    How to uninstall babel-cli & live-server:
    $ yarn global remove babel-cli live-server

    How to install locally: (note NO 'g' or 'global')
    $ yarn add live-server babel-cli@6.24.1

    next in the package.json we add a "scripts" section and create a key value pair for what we want to have happen when a script is called by name. like "serve":"live-server public/", This will start the live server with the '$yarn serve' command in terminal.

/////////////////////Example
    {
      "name": "indecision-app",
      "version": "1.0.0",
      "main": "index.js",
      "author": "Aaron Brown",
      "license": "MIT",
      "scripts":{
        "serve":"live-server public/",
        "build":"babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
      },
      "dependencies": {
        "babel-cli": "6.24.1",
        "babel-preset-env": "1.5.2",
        "babel-preset-react": "6.24.1",
        "live-server": "^1.2.0"
      }
    }
/////////////////////End

Lecture 50 Installing and configuring Webpack
    THIS IS TO SET UP A BARE BONES CONFIGURATION.

    To install basic. from project root folder.
    $ yarn add webpack
    This adds webpack to our project. Next add to scripts in package.json. Here we changed "build" to "build-babel" and then made "build":"webpack",
    this makes the script go to the 'webpack.config.js' node file. Which we created next on the root level of project.
    ///////Example
    "scripts": {
      "serve": "live-server public/",
      "build":"webpack",
      "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch",
    },
    ////////End
    In the 'webpack.config.js' we put in the following...
    ////////Example
    // must give ENTRY point and OUTPUT
    const path = require('path');//this gives us access to the node .join() function.

    module.exports = {
        entry: './src/app.js',
        output: {
            path:path.join(__ dirname, 'public'),
            filename: 'bundle.js'
        }
    };
    ////////End
    Run $ yarn run build
    if it works then it is good to go. The all you need to do is reference bundle.js on your index page.

    In the scripts section on package.json change "build":"webpack" to "build":"webpack --watch", to have it watch for changes.

Lecture 51 ES6 import/export

    Here we learned how to export and import a file.
    ///////Example

    // this should be at the top of the page where we want to import. We must have the names of the functions we want to import and the path from where it is coming from.
        import { square, add } from './utils';
    If we just imported the page like this...
        import './utils';
    the program will run that page then come back.

    //There are two ways to export a function from a file. Named exports and default. Here are two ways to do named exports.

    first is where we export by name
        export { square, add };

    the second way is the default where we add 'export' in front of where it is defined.
        export const add = (a,b) => a + b;
    ///////End

Lecture 52 Default exports
    With default exports we can just have one.

    ///////Example
    //In export area you need to set 'as default'. You can only do it to one.
        const square = (x) => x * x;
        const add = (a,b) => a + b;
        const subtract = (a,b) => a - b;

        export { square, add, subtract as default };

    //On the import page you need to reference it BEFORE the curly braces. Because it is the default you could actually change the name of subtract to anything and call it below with that name as well.
        import subtract, { square, add } from './utils';

        console.log('app.js is running!');
        console.log(square(4));
        console.log(add(100,23));
        console.log(subtract(100,81));

    an alternate way set the default would be to write export default then reference the name. like below.

        export const square = (x) => x * x;
        export const add = (a,b) => a + b;
        const subtract = (a,b) => a - b;
        export default subtract;

    OR we could get rid of the const name and do inline... Then when we assign the default on the import we define the name to use.

        export const square = (x) => x * x;
        export const add = (a,b) => a + b;
        export default (a,b) => a - b;

    ///////End

Lecture 53 Import NPM modules
    Find a useful npm module and install it locally. To call that file write in the top of the page...
    Read module docs to know how to use the functions installed.
    ///////Example
    (validatior is the name of the package module we installed)
        import validator from 'validator';

        console.log(validator.isEmail('test'));

    //We also installed react and react-dom with npm locally then called them.
        //This is lacking babel so we needed to use React.createElement.
        import React from 'react';
        import ReactDOM from 'react-dom';

        const template = React.createElement('p',{},'testing123');

        ReactDOM.render(template, document.getElementById('app'));

    ///////End

Lecture 54 Setting Up Babel with Webpack
We need to use a loader for webpack to know what to do with the files before it passes them down. Webpack can't render JSX. We need to install babel.

    ///////Example
    We install...
    // babel core which is for tools like Webpack, by itself it doesn;t have much functionality, and we included the babel-loader which is a webpack plugin and will allow us to teach webpack how to run babel when it see's certain files.

        $ yarn add babel-core@6.25.0 babel-loader@7.1.1
    after we need to set it up in webpack.config.js. We are going to setup module.rules

    const path = require('path');//this gives us access to the node .join() function.
    // must give ENTRY point and OUTPUT

    module.exports = {
        entry: './src/app.js',
        output: {
            path: path.join(__ dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader' //we want Webpack loader to use babel-loader.
                test: /\.js$/, // this is using regular expression syntax. We want to run all files that end in .js
                exclude: /node_modules/ //We want to exclude this file
            }]
        }
    };

    NEXT we setup a new file for babel called .babelrc this is where we put in presets we want babel to use.
    We write this inside...

        {
            "presets": [
                "env",
                "react"
            ]
        }
    Then run the build from the command line ...
        $ yarn run build

    ///////End

Lecture 55 One Component per file
    In this lecture we moved each component to it's own file. Webpack stitches them together.

    Note: When exporting a class that will do one thing we can export it inline. like...
    ///////Example
    export default class AddOption extends React.Component{
        constructor(props){
            super(props);
            this.handleAddOption = this.handleAddOption.bind(this);
            this.state = {
                error: undefined
                ...
    ///////End
    As we move each component to it's file we need to be mindful that the component has what it needs and that the path to those files is correct. Note each file will need react imported to it.
    ///////Example
    import React from 'react';
    import Option from './Option';


    const Options = (props) => {
        return (
            <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
            </div>
        );
    };

    export default Options;
    ///////End

Lecture 56 Source Maps with Webpack
    Here we add a webpack dev-tool called cheap-module-eval-source-map
    https://webpack.js.org/configuration/devtool/
    It's set up inside of webpack.config.js and then we need to restart webpack from terminal.

    This tool lets the chrome browser know where a bug originated in our code.
    ///////Example
    const path = require('path');//this gives us access to the node .join() function.
    // must give ENTRY point and OUTPUT

    module.exports = {
        entry: './src/app.js',
        output: {
            path: path.join(__ dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }]
        },
        devtool: 'cheap-module-eval-source-map'
    };
    ///////End

Lecture 57 Webpack Dev Server
    Here we are going to switch from using 'liveServer' to Webpacks development server. It comes with nice to have features.
    https://webpack.js.org/configuration/dev-server/
    We installed locally
        $ yarn add webpack-dev-server@2.5.1
    We then setup in our webpack.config.js 'devServer.contentBase'. This tells webpack where our public file is to take and render to browser.
    ///////Example
    module.exports = {
        entry: './src/app.js',
        output: {
            path: path.join(__ dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }]
        },
        devtool: 'cheap-module-eval-source-map',
        devServer: {             
        //this is what we added. I ad a space here in the read only between the underscores and dirname.
            contentBase: path.join(__ dirname, 'public')
        }
    };
    ///////End
    NEXT we write a script to call to run when we want to run the server.
    In package.json.
        {
          "name": "indecision-app",
          "version": "1.0.0",
          "main": "index.js",
          "author": "Aaron Brown",
          "license": "MIT",
          "scripts": {
            "serve": "live-server public/",
            "build": "webpack",
            "dev-server": "webpack-dev-server"
        }, ...

    "webpack-dev-server" when ran '$ yarn run dev-server' will render the bundle.js in it's head and send it to the browser and listen for changes. It is really fast. when we need a bundle for distrobution we can run '$ yarn run build'.
