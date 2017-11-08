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

Lecture 57 Webpack Dev-Server
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

Lecture 58 ES6 Class properties
    We installed a bable plugin called 'Class properties transform' (http://babeljs.io/docs/plugins/transform-class-properties/). This allows us to convert our class based components to the brand new class properties syntax. We no longer have to worry about binding the 'this' value to the class scope and we don't need to add the constructor.   

    SETUP:
        $ yarn add babel-plugin-transform-class-properties@6.24.1
    then in .babelrc ...
        {
            "presets": [
                "env",
                "react"
            ],
            "plugins": [
                "transform-class-properties"
            ]
        }
    and then we start webpack again... and we're good.
        $ yarn run dev-server

    ///////Example
        class OldSyntax {
            constructor(){
                this.name = 'Mike';
                this.getGreeting = this.getGreeting.bind(this);
            }
            getGreeting(){
                return `Hi my name is ${this.name}.`;
            }
        }
        const oldSyntax = new OldSyntax();
        const getGreeting = oldSyntax.getGreeting; // without constructor this would break the binding.
        console.log(getGreeting());

    // ---------------------
        class NewSyntax {
            name = 'Jen';
            getGreeting = () => {
                return `Hi my name is ${this.name}.`;
            }; // <- new syntax needs a semicolon
        }
        const newSyntax = new NewSyntax();
        const newGetGreeting = newSyntax.getGreeting;
        console.log(newGetGreeting());

    ///////End

Lecture 59 Section Intro: Using a Third Party Component.
    We are going to use a third party component that adds a modal instead of the alert.

Lecture 60 Passing Children to Component
    In this one we learned two ways to pass data into a component.

    ONE:
    //We can add a prop to the Layout component and then call it inside with props.content

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

    TWO:
    //We can open and close the layout tag below and pass inline info in by putting it between and calling props.children.

        import React from 'react';
        import ReactDOM from 'react-dom';
        import IndecisionApp from './components/IndecisionApp';

        const Layout = (props) => {
            return (
                <div>
                    <p>Header</p>
                    {props.children}
                    <p>Footer</p>
                </div>
            );
        }


        ReactDOM.render(<Layout> <p>This is in line</p> </Layout>, document.getElementById('app'));

        OR ... to make it easier to look at...
        ReactDOM.render((
            <Layout>
                <p>This is in line</p>
            </Layout>
            ), document.getElementById('app'));

Lecture 61 Setting up React-Modal
    We installed the react-modal and put it in it's own file in OptionModal.js, we also had to import 'import Modal from 'react-modal'; at the top.'. Then in IndecisionApp we added an object to the 'state' called 'selectedOption: undefined' and made a method in the called 'clearSelectedOption' and then passed it down to the OptionModal. The method is set to undefined but gets set to a value which changes it's state to truthy.
    https://github.com/reactjs/react-modal

    ///////Example

        import React from 'react';
        import Modal from 'react-modal';

        //note this is using implicit return shorthand.
        const OptionModal = (props) => (
            <Modal
                isOpen={!!props.selectedOption}//Note two !! changes the value to true or false absolutely. nothing truthy or falsy.
                onRequestClose = {props.clearSelectedOption}// this is a Modal option. Which means when a user pushes escape or clicks outside the modal do this... in our case we run 'props.clearSelectedOption'.
                contentLabel="Selected Option" >

                <h3>Selected Option</h3>
                {props.selectedOption && <p>{props.selectedOption}</p>} //If there is something there then render.
                <button onClick={props.clearSelectedOption}>Okay</button>
            </Modal>
        );

        export default OptionModal;

        //In IndecisionApp...
            export default class IndecisionApp extends React.Component {
                state = {
                    options: [],
                    selectedOption: undefined
                };

                clearSelectedOption = () => {
                    this.setState(()=>({selectedOption: undefined}));
                };...
            In the render section at the bottom...
                <OptionModal
                    selectedOption = {this.state.selectedOption}
                    clearSelectedOption = {this.clearSelectedOption}
                />

    ///////End
    Then we added it in the bottom of the IndecisionApp and passed in a prop.

Lecture 62 Bonus Refactoring Other Stateless Functional Components
    We can explicitly return a component that only returns one thing. So in this section we go through and remove the return lines from components that only return one thing and are stateless.

    //Before
        import React from 'react';

        const Action = (props) =>{
            return (
                <div>
                    <button onClick={props.handlePick} disabled={!props.hasOptions}>
                        What should I do?
                    </button>
                </div>
            );
        };

        export default Action;
    //after
        import React from 'react';

        const Action = (props) => (
                <div>
                    <button onClick={props.handlePick} disabled={!props.hasOptions}>
                        What should I do?
                    </button>
                </div>
            );

        export default Action;

Lecture 63 Section Intro - Styling React
    Just an intro to talk about using scss.

Lecture 64 Setting up webpack with SCSS
    Installing two packages...
        https://www.npmjs.com/package/css-loader
        https://www.npmjs.com/package/style-loader
        $ yarn add style-loader@0.19.0 css-loader@0.28.7
    Then we add to the webpack.config.js
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }], { // add a comma and add another rule
                test:/\.css$/
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        },
        This will render just our css.
    In the head of the app.js file we import the css like this...
        import './styles/styles.css';
    When we run our dev-server it will work. At this point we COULD style the entire app using css.

    //Next we are setting up for sass. we installed these two packages
        $ yarn add sass-loader@6.0.6 node-sass@4.5.3
    sass-loader, allows us to import the sass files
    node-sass, complies the sass to css.
    //Now we just add sass-loader in the webpack config.
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, { //<--This rule tells webpack what to do when it encounters a .sass
                test:/\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader' // <----Just add this, sass-loader will use node-sass.
                ]
            }]
        },
    Make sure you are importing sass in the app.js import file...
        import './styles/styles.sass';
    Run the dev-server.

Lecture 65 Architecture and Header Styles
    We learned how to break up our styles into multiple styles. I also learned a little about...
        //BEM(block element modifier) naming convention
    //Example...
        Block component
            .btn {}

        Element that depends upon the block
            .btn__price {}

        Modifier that changes the style of the block            
            .btn--orange {}
            .btn--big {}

        <a class="btn btn--big btn--orange" href="http://css-tricks.com">
            <span class="btn__price">$9.99</span>
            <span class="btn__text">Subscribe</span>
        </a>
    //Example end

    css rem vs em...
        While em is relative to the font-size of its direct or nearest parent, rem is only relative to the html (root) font-size.
    we set up the html to 62.5% which makes 1rem = 10px.
        html
            font-size: 62.5%
    We are setting up our sass file structures and starting to style.

Lecture 66 Reset That $#!*
    Setting up a css reset.
    https://necolas.github.io/normalize.css/
    $ yarn add normalize.css@7.0.0

    once installed inside out webpack.config.js we update the rule for sass. from ...
        }, {
            test:/\.sass$/, //<-- To ... test: /\.(sass|css)$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    We also import it from node modules above our main styles.sass in the app.js

        import React from 'react';
        import ReactDOM from 'react-dom';
        import IndecisionApp from './components/IndecisionApp';
        import 'normalize.css/normalize.css'; // Put above styles!
        import './styles/styles.sass';

        ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

Lecture 67 Theming with variables
    We are setting up a settings.sass file where we define our spacing sizes and colors.

Lecture 68 Big Button & Options List
    We learned about sass functions.
    http://sass-lang.com/documentation/Sass/Script/Functions.html
    we used the darken function...
        .big-button
            background-color: $purple
            border: none
            border-bottom: .6rem solid darken($purple, 10%)
    Learned about the css sudo class ':disabled'.
        .big-button:disabled
            opacity: .5
        //when button is disabled it will change opacity
    Did styles on buttons.

Lecture 69 Styling the Options List
    We styled the widget and the things inside it. Pretty straight forward.

Lecture 70 Styling Option Items
    We created add-option.sass and option.sass
    I learned about CSS flex-grow Property. It tells the element you are styling to grow into the available space.

Lecture 71 Styling React Modal
    Styled the modal by targeting it's built in classes and also set up a parameter for the modal tha allows us to name the class inside the modal div.

    //Example
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose = {props.clearSelectedOption}
        contentLabel="Selected Option"
        closeTimeoutMS={200} //We can set the timeout
        className="modal"> // here we specify OUR class name that we can style.

        <h3 className="modal__title" >Selected Option</h3>

        {props.selectedOption && <p className='modal__body'>{props.selectedOption}</p>}
        <button className='button' onClick={props.clearSelectedOption}>Okay</button>
    </Modal>

Lecture 72 Mobile Considerations
    We set up media queries and made a few tweaks

Lecture 73 Favicon
    We installed a favicon

Lecture 74 - 75
    Explains React Router and client side vs server side rendering.

Lecture 76 Setting Up Expensify app
    Cloning indecision-app and making a basic boilerplate for starting new projects and the next project "Expensify app".
    We saved one as a boilerplate and made another one we will work in called expensify-app.

Lecture 77 React-router 101
    We install react React-router
    $ yarn add react-router-dom@4.2.2
    We then imported two things in app.js, 'BrowserRouter, Route'.
        import { BrowserRouter, Route } from 'react-router-dom';
    We then set added a tweak to the dev-server in webpack.config.js ... the dev sever need to not look to the server for pages but the app.js for pages(Hence client side server) so we added a line to the dev-sever... this means when you get a 404 not found look to the client for the page to render.

        devServer: {
            contentBase: path.join(__ dirname, 'public'),
            historyApiFallback: true //<-- Added this line
        }

    After this we set up some dummy components and then set up the router in app.js
    //Example-Start
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

        const routes = (
            <BrowserRouter>
                <div>
                    <Route path='/' component={ExpenseDashboardPage} exact={true}/> //We had to set up the exact because the '/' matches everything.
                    <Route path='/create'  component={AddExpensePage}/>
                    <Route path='/edit'  component={EditExpensePage}/>
                    <Route path='/help'  component={HelpPage}/>
                </div>
            </BrowserRouter>
        );

        ReactDOM.render(routes, document.getElementById('app'));
    //Example-End

Lecture 78 Setting Up a 404
    We use an element provided by react-router called <Switch>.
    We import it at the top of app.js and then replace our div that is wrapping the routes with the <Switch> tag. This changes the behavior of how it goes through the child elements. It looks through and stops when it finds a match instead of rendering everything that can be rendered. If no matches then it will match with the route that has no path and render the 404 page.

        import { BrowserRouter, Route, Switch } from 'react-router-dom';

        const routes = (
            <BrowserRouter>
                <Switch> // from <div> to <Switch>
                    <Route path='/' component={ExpenseDashboardPage} exact={true}/>
                    <Route path='/create'  component={AddExpensePage}/>
                    <Route path='/edit'  component={EditExpensePage}/>
                    <Route path='/help'  component={HelpPage}/>
                    <Route component={NotFoundPage}/>
                </Switch> // from </div> to </Switch>
            </BrowserRouter>
        );

        ReactDOM.render(routes, document.getElementById('app'));

Lecture 79 Linking Between Routes
    Here we learned that anchor tags be default go to the server. We could us JS to prevent but React-router has a build it element/component for this called <Link>. This is to take advantage of the speed of client side routing.
        // Here is how you would use in place of an <a></a> tag.
            <div>
                404 - <Link to="/">Go to Home Page</Link>
            </div>
    What if we want a header on every page? BrowserRouter needs the next child to be a container element/component. So we can creat a div inside of <BrowserRouter> and around <Switch>.
        // Like so...
        const routes = (
            <BrowserRouter>
                <div> // <- div wrapping Switch
                    <Header /> // <- Header added
                    <Switch>
                        <Route path='/' component={ExpenseDashboardPage} exact={true}/>
                        <Route path='/create'  component={AddExpensePage}/>
                        <Route path='/edit'  component={EditExpensePage}/>
                        <Route path='/help'  component={HelpPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );

        ReactDOM.render(routes, document.getElementById('app'));
    The <Link> tag is useful for switching between pages within the app, BUT the NavLink is ideal for a nav bar becasue it adds extra features, like highlighting the page you are currently on. SO we will set up our header with NavLink tags. First we have to import it at the top....

        // like so...
        import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

        // And then use NavLink...
        const Header = () => (
            <header>
                <h1>Exspensify</h1>
                <NavLink to="/" activeClassName="is-active" exact={true} >Dashboard</NavLink>
                <NavLink to="/create" activeClassName="is-active" >Create Expense</NavLink>
                <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
                <NavLink to="/help" activeClassName="is-active">Help</NavLink>
            </header>
        );
    //We added the prop "activeClassName" and set it to "is-active". This is one of the perks of using NavLink. When we are on the page selected it changes the class to the page to "is-active". AND just like with the route we need to set the home page element to 'exact={true}'. Otherwise the class will always be applied to the home page because it starts with a '/'.

    We should use <Link> almost everywhere in our app except with the nav bar.

Lecture 80 Organizing Our Routes
    Here we break things into their own files AND we put the AppRouter in it's own folder called 'router' to keep it out of the way. A couple things to remember... When you put the component in it's own file it still needs access to "React from 'react'" so we need to import it at the top as well as any other asset we may be using in that page like <Link> or <NavLink> as well as exporting the default...

    //Example
        import React from 'react';
        import { Link } from 'react-router-dom';


        const NotFoundPage = () => (
            <div>
                404 - <Link to="/">Go to Home Page</Link>
            </div>
        );

        export default NotFoundPage;

    Then we import this component to the page that needs it. In the top of that page we import it from it's file and the path is relative to where we are...

        import NotFoundPage from '../components/NotFoundPage';

Lecture 81 Query Strings and URL parameters
    In this video we are learning about the props that react router passes as it renders pages. These props are 'history', 'location', 'match', 'staticContext'. Location keeps an eye on the URL and when things are passed through on it. We learn how to make the URL dynamic so that when we want to edit a page or a post we can pass the id on the end and get a specific post or query.

    //example
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path='/' component={ExpenseDashboardPage} exact={true}/>
                    <Route path='/create'  component={AddExpensePage}/>
                    <Route path='/edit/:id' //<- we added the /:id component={EditExpensePage}/>
                    <Route path='/help'  component={HelpPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    With what we added to the edit path it no longer can render with just a url of '/edit' but now requires an id for ReactRouter to see it.

    This is how we set up the EditExpensePage so we could see the props in the console, and render what is passed in.

        //Example
        import React from 'react';

        const EditExpensePage = (props) => {
            console.log(props);
            return (
                <div>
                    Editing the expense with the id of {props.match.params.id}.//<- we can drill into the props to get the data that was passed.
                </div>
            );
        };

        export default EditExpensePage;
        //End

Lecture 82 Build It: Router for Portfolio Site
    We clone the exspensify-app and make a portfolio app. We had to delete most of the components and pages routed in the AppRouter and the nav section in the header and redo this app with 4 pages(HomePage, PortfolioPage, ContactPage and 404). Then we hooked it back up. On the porfolio page we had to put two <Link>'s to two portfolio pieces and pass in a number 1 to display the correct project.
        //Examples
        //AppRouter.js
        import React from 'react';
        import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
        import HomePage from '../components/HomePage';
        import ProjectPortfolioPage from '../components/ProjectPortfolioPage';
        import ContactPage from '../components/ContactPage';
        import ProjectPage from '../components/ProjectPage';
        import NotFoundPage from '../components/NotFoundPage';
        import Header from '../components/Header';


        const AppRouter = () => (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' component={HomePage} exact={true}/>
                        <Route path='/portfolio'  component={PortfolioPage}/>
                        <Route path='/contact'  component={ContactPage}/>
                        <Route path='/project/:id'  component={PortfolioProjectPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );

        export default AppRouter;

        //Portfolio Page
        import React from 'react';
        import { Link } from 'react-router-dom'; // I forgot to import this at first.

        const PortfolioPage = () => (
            <div>
                <h1>Portfolio Page!</h1>
                <p>Checkout my Portfolio!</p>
                <Link to="/portfolio/1">Project 1</Link>
                <Link to="/portfolio/2">Project 2</Link>
            </div>
        );

        export default PortfolioPage;

        //Project Page
        import React from 'react';

        const ProjectPage = (props) => {
            console.log(props);
            return (
                <div>
                    <h1>Project numeber {props.match.params.id}</h1>
                    <p>Check out this amazing project!</p>
                </div>
            );
        };

        export default ProjectPage;

Lectures 83 & 84
    Explains why we need redux. What I got is that data needs to be passed down from top to bottom but some components on the bottom of the structure need access to some data that their parents don't so by using redux we can bypass sending data down from the top only and instead supply data directly to the component that needs it. This also allows components to be free standing and flexible, so They can be used in lots of different places.

    Think of redux as something similar to the window object. It is a global object that can be used anywhere in the client side of the program.

Lecture 85 Setting Up Redux
    Here we installed redux with
        $ yarn add redux@3.7.2
    Then we told webpack.config.js to listen to the redux-101.js file instead of app.js. We created that file in playground.
    To use redux we must use 'createStore' so we import it and then make a very simple example.

    The first argument in createStore(), must be a function. and in the params of the function we pass in the default state. This is just returning the default state.

    We can fetch the data using the .getState() method on the store.

    //Example
        import { createStore } from 'redux';

        const store = createStore((state = {count: 0}) => {
            return state;
        });

        console.log(store.getState());
    //End
    In the next video we will learn how to change the default with actions.

Lecture 86 Dispatching Actions
    Learning all about Actions which allows us to change things in the redux store.

    Action is an object that gets sent to the store, it's our way to communicate with the store. We pass a second argument to 'createStore()' called 'action', then inside we create a switch statement where we do different things depending on the action sent in.

    Below we dispatch an Action by calling 'store.dispatch()' then inside we put an object that sets a 'type'. We set it to something and then when that matches in the switch it triggers what we want to have happen. 'INCREMENT' returns 'count: state.count + 1' and increments the state of count by 1.
    Everytime a 'store.dispatch()' is called it runs the redux store (const store).

    //Example
    import { createStore } from 'redux';

    const store = createStore((state = {count: 0}, action) => {
        // console.log('Running');
        switch (action.type){
            case 'INCREMENT':
                return {
                    count: state.count + 1
                };
            case 'DECREMENT':
                return {
                    count: state.count - 1
                };
            case 'RESET':
                return {
                    count: 0
                };
            default:
                return state;
        }

    });

    console.log(store.getState());

    // increment, decrement, reset.
    store.dispatch({
        type: 'INCREMENT'
    });

    store.dispatch({
        type: 'RESET'
    });

    store.dispatch({
        type: 'DECREMENT'
    });


    console.log(store.getState());

Lecture 87 Subscribing and Dynamic Actions
    Here we learn more options that redux provides.
    'subscribe' allows us listen to the store for ANY changes.
    and adding onto the object after 'type' allows us to create dynamic actions when that action type is called.

    'subscribe' allows us listen to the store for ANY changes. Every time a change is made it runs the subscribe.
    //Example
        store.subscribe(()=>{
            console.log(store.getState());
        });
    However if we want stop subscribing we can assign the method to a const and call that to stop following the changes. The state keeps changing but it stops runing the 'subscribe()' method.
    //Example
        const unsubscribe = store.subscribe(()=>{
            console.log(store.getState());
        });

        store.dispatch({
            type: 'INCREMENT'
        });

        unsubscribe(); //It stops tracking here

    With dispatch() you MUST define a 'type'. After you have done that you can add as much as you want.

    Below we add a new key value pair ... 'incrementBy: 5'. Then inside the switch case 'INCREMENT' we create a new variable called 'incrementBy'. It's value will depend on if the 'typeof' 'action.incrementBy' is a number. If it is then use that number, if false then use the number 1. This is done with a ternary operator.

    //Example.
        const store = createStore((state = {count: 0}, action) => {
            // console.log('Running');
            switch (action.type){

                case 'INCREMENT':
                    const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;

                    return {
                        count: state.count + incrementBy
                    }; ...

        store.dispatch({
            type: 'INCREMENT',
            incrementBy: 5
        });

        this will return 5.
    incrementBy is tied to to the object it is created with.?
    We can also assign by defining a type and then following it with a value. Below we have a type of 'SET' and when it is called we set count to 101 by returning 'count: action.count'.
        //Example
        ...
        case 'SET':
            return {
                count: action.count
            }
        ...

        store.dispatch({
            type: 'SET',
            count: 101
        });

Lecture 88 ES6 Object Destructuring
    In this lecture we learned we can destructure objects. Which can make passing down the data more clear and/or less typing.

    This is a slight break from redux to point out a new ES6 syntax for object destructuring which will help to work with arrays and objects.

    Cool stuff!!
        //Our object...
        const person = {
            name: 'Aaron',
            age: 33,
            location: {
                city: 'Seattle',
                temp: 55
            }
        };

    If we wanted to use the data form this object here is the older way to do that...

            console.log(`It's ${person.location.temp} in ${person.location.city}.`);
            //This is a lot of typing.

            we could also do this to remove typing but it's also a lot of typing.
            const temp = person.location.temp
            const city = person.location.city

    So using the new syntax we could assign each thing in the object to a variable in shorthand. Like this...

        const {city, temp} = person.location; // city and temp directly match city and temp from the object so they bind.

        // then we would only have to write...
        console.log(`It's ${temp} in ${city}.`);

    Lets say you want to change the const/var name from temp to temperature so it's clearer. you do the same as above but use the ':'. like...

        const {city, temp: temperature} = person.location; // The colon kind of binds the new word(temperature) to the standing variable(temp)

        // then we would only have to write...
        console.log(`It's ${temperature} in ${city}.`);

    Now lets say you want to set a default incase the there is no name in the object. you use the '='. That is done like...

        const {name = 'Anonymous', age} = person;

        console.log(`${name} is ${age}.`);

        // if there is no 'name' defined in the object it will return 'Anonymous'.

    To get crazy you can use both on one variable. you just use in this order ':', '='...

        const {city, temp: temperature = 'Unkown'} = person.location;

        if (city && temperature){
            console.log(`It's ${temperature} in ${city}.`);
        }
        //temp is now temperature and if it's not there then the default will be 'Unkown'.

Lecture 89 Array Destructuring
    Here we learned how to restructure an array for many of hte same reasons as destructuring an object.

    Our Array...
        const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

    Old School way...
        console.log(`You are in ${address[1]} ${address[2]}.`);
        //If you look at this out of context you don't know what address[1]is.

    new syntax. It is like deconstructing an object but you use square brackets'[]' instead of curly braces '{}'.

        const [street, city, state, zip] = address;

        console.log(`You are in ${city} ${state}.`);

    If you don't want to assign everything in the array to a variable you can leave places blank but keep the commas. like...

        const [ , , state,] = address //The commas act as placeholders for the index. Here we are only assigning 'state'.

        console.log(`You are in ${state}.`);

    If you want to rename a variable, it is easy since there is no name assigned in the array, it's done by index. So you can name anything what you want to so long as you have it in the right order.

        const [ , city, yourState,] = address

        console.log(`You are in ${city} ${yourState}.`);

    Setting a default. You just use the '='.

        const address = [];

        const [ , city = 'New York', ,] = address

        console.log(`You are in ${city}.`);

        //it's kind of goofy but the default naming would only really work if the array came in empty or if the last item in the array was not there and the order of naming assignments lined up.

Lecture 90 Refactoring and Organizing
    In this lecture we learned about Action generators. Where we tell 'store.dispatch' what we want to do through a function.  We prefer them over inline action objects. So instead of having to define and pass data each time like this object...

        store.dispatch({
            type: 'INCREMENT',
            incrementBy: 5
        });

    We can set up a function above and then call that function and pass in or not pass in what's needed. like this instead.

        store.dispatch(incrementCount({incrementBy:5}));
    OR...
        store.dispatch(incrementCount());

    incrementCount() is this function we defined at the top. By doing this it is more reliable. If a misspelled word happens it will throw an error. Where as with action objects it doesn't.

        const incrementCount = ({ incrementBy = 1 } = {}) => ({
                type: 'INCREMENT',
                incrementBy: incrementBy
            });

    In the above function we did a bit of destructuring. The first line says... A const with a name of 'incrementBy' set to an arrow function that implicitly returns an object. We pass in the first parenthesis '{ incrementBy = 1 } = {}', which says if incrementBy exists  and has a value great, but if not set it to 1 and the '= {}' means it is an object by default then it gets decontructed and will pass in the 'incrementBy: 1'. Yes, it's kind of confusing.

Lecture 91 Reducers
    Reducers are a core concept in Redux. The definition of reducer from the redux website is...
        "Actions describe the fact that something happened, but don't specify HOW the application's state changes in response. This is the job of reducers."
    The switch we wrote is a perfect example of a reducer.

    Key attributes of a reducer...
        1. Reducers are pure functions. They take what is given to them and process it. They do not rely on variables outside their own scope/function. The output is determined by the input. It does not change anything outside of the scope.
        2. Never change state or action. It should only read the state and action when passed in and then return the modified version/ new instance of the object and then let react change the state.

    So my understanding is that reducers read the 'state' and 'action' and then create & modify a new instance of it and return that value. It doesn't actually change the value at the source. That will happen if need be outside of the reducer via react or redux.

Lecture 92 Working with Multiple Reducers
    In the previous example we passed in a single reducer to
        'store = createStore(countReducer);'
    That can get really messy when you need to do a lot of things. So in this lecture we learned about and imported 'combineReducers'. This is a built in redux function that lets us combine reducers. We created two reducers called, 'expensesReducer' and 'filtersReducer' and we created variables that set their default states...

        const expensesReducerDefaultState = [];

        const filtersReducerDefaultState = {
            text: '',
            sortBy: 'date', //date or amount
            startDate: undefined,
            endDate: undefined
        };

    This are the reducers...

        const expensesReducer = (state = expensesReducerDefaultState, action) => {
            switch (action.type){
                default:
                    return state;
            }
        };

        const filtersReducer = (state = filtersReducerDefaultState, action) => {
            switch (action.type){
                default:
                    return state;
            }
        };

    Then we combined them inside the createStore() function...
        //We broke it to multiple lines to read easier

        const store = createStore(
            combineReducers({
                expenses: expensesReducer,
                filter: filtersReducer
            })
        );

        We are saying here that we want expenses to be handled by 'expensesReducer' and filter to be handled by 'filtersReducer'.

    When we log 'store.getState()' to the console we get an object with expenses: [] and filer with the default object settings from 'filtersReducerDefaultState'.

Lecture 93 ES6 Spread Operator in Reducers on arrays
    Note we installed uuid which generated "universally unique id's". This is used temporarily until our database does this.
        https://www.npmjs.com/package/uuid
    Here we created an addExpense function. and we deconstructed the input parameters to make a object if one does not exist.

        // ADD_EXPENSE
        const addExpense = (//we broke it down into lines-easy to read.
            { // if any of these things aren't passed in then make them and set them.
                description = '',
                note = '',
                amount = 0,
                createdAt = 0
            } = {}
        ) => ({
            type: 'ADD_EXPENSE',
            expense: {
                id: uuid(),
                description,//this is shorthand notation it means 'description: description'
                note,
                amount,
                createdAt
            }
        });

    We created a switch to handle the 'type:' when it is passed into the store.dispatch() and then triggers the two reducers (expensesReducer & filtersReducer)
        //Example
        const expensesReducer = (state = expensesReducerDefaultState, action) => {
            switch (action.type){
                case 'ADD_EXPENSE':
                    return state.concat(action.expense);//note concat...
                default:
                    return state;
            }
        };
    When we use the concat function it does not change the original state. We then took this a step further and learned about the 'ES6 Spread Operator'. it looks like this sort of like this '...variable'. the ... is like saying grab all the crap inside of the thing that follows.

        //Example
        const expensesReducer = (state = expensesReducerDefaultState, action) => {
            switch (action.type){
                case 'ADD_EXPENSE'://the following has the exact same effect.
                    return [
                        ...state, //*HERE*
                        action.expense
                    ];
                default:
                    return state;
            }
        };
    We are saying take all the current items and then add on the 'action.expense'.

    Then we wired the removeExpense function. And handled it in the switch.

        // REMOVE_EXPENSE
        const removeExpense = ({id} = {}) =>({
            type: 'REMOVE_EXPENSE',
            id
        });

        const expensesReducer = (state = expensesReducerDefaultState, action) => {
            switch (action.type){
                case 'ADD_EXPENSE':
                    return [
                        ...state,
                        action.expense
                    ];
                case 'REMOVE_EXPENSE':
                    return state.filter(({id})=> id !== action.id );
                    //note filter() keeps the truthy value and drops the false. So if the action.id matches the id that is false they do match and it's dropped.
                default:
                    return state;
            }
        };

    So when we make the call below on the two instances of store.dispatch()... we remove the rent expense from the object array.
        const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100}));
        const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300}));

        //call
        store.dispatch(removeExpense({ id: expenseOne.expense.id }));
    This one really confused me.

Lecture 94 Spreading Objects Operator
    using the spreading objects operator we are able to create new objects bringing in data from existing objects.

    BUT browsers don't currently support it so we need to bring in a plugin from to babel.
        https://babeljs.io/docs/plugins/transform-object-rest-spread/

    In this lecture we created an action object that lets us set the filter text value to what we want.

    We first created the call at the bottom.

        //we called the action object function 'setTextFilter' and passed in one argument an object text with a value of 'rent'.
            store.dispatch(setTextFilter({ text:'rent' }));

        Then at the top we set up the action object function... the first argument in our function is 'text' and if it's not set we set it to an empty string by default. Then we implicitly return an object.
            // SET_TEXT_FILTER
            const setTextFilter = (text = '') => ({
                type: 'SET_TEXT_FILTER',
                text
            });

        Then we go to the filtersReducer where the object function gets passed to and we tell it what we want to do when it see's the type 'SET_TEXT_FILTER'. we tell it to return a copy of the state object but then overide 'text' with a value of the text from the action object. (The action object is like the virtual object that is made with every change. It is made by the .dispatch() function, its the payload or way to communicate with the redux store.)

            const filtersReducer = (state = filtersReducerDefaultState, action) => {
                switch (action.type){
                    case 'SET_TEXT_FILTER':
                        return {
                            ...state,
                            text: action.text
                        };
                    default:
                        return state;
                }
            };

Lecture 95 Wrapping Up Our Reducers
    In this lecture we created the action objects to SORT_BY_DATE & SORT_BY_AMOUNT.

    //Make the call and name the function. we set the first to take a number argument and the second blank so it will reset to undefined
        store.dispatch(setStartDate(125));
        store.dispatch(setStartDate());

    Next we made the action object function...
        // SET_START_DATE
        const setStartDate = (startDate) => ({
            type: 'SET_START_DATE',
            startDate
        });
        // there was no need to set the default state of 'startDate' to undefined because that is the default.

    Then we added the type case to the the switch in the filtersReducer...

        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
    Now all our action objects are set for the reducers.

Lecture 96 Filtering Redux Data
    In this lecture we set up the filter by creating the fucntion 'getVisibleExpenses'.

    first inside the store.subscribe() section we created a const where we stored the state and then another where we passed the state into a function called 'getVisibleExpenses' which we have not created yet and sotred that in side of 'const visibleExpenses', then spit that out to the console.

        store.subscribe(() => {
            const state = store.getState();
            const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
            console.log(visibleExpenses);
        });

    We then created the getVisibleExpenses function. we passed in expenses and filters. BUT filters we deconstructed and assigned with the '{}'. Then we said filter the results by each expense and only out of each expense if all three parameters are true(startDateMatch && endDateMatch && textMatch).

        // Get visible expenses
        const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
            return expenses.filter((expense) => {

                const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;

                const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

                const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

                return startDateMatch && endDateMatch && textMatch;
            });
        };
        //EXPLAINING startDateMatch & endDateMatch
            if the typeof startDate is not equal to a number then return true. This makes it so it's always true so we don't prevent filtering if there is no start date. However if it is a number then the first parameter is false and we go on to the next. which says if the the time that the expense was created is after the time of the startDate(the time period we are looking for) then return true if not then return false. The opposite is the case of endDateMatch

        We used the following store.dispatches to manipulate the state and test our filter. Not all at once though.

            store.dispatch(setStartDate(0));
            store.dispatch(setEndDate(2000));

            store.dispatch(setTextFilter('rent'));

Lecture 97 Sorting Redux Data
    In this lecture we added onto the 'getVisibleExpenses' function. by concatenating the .sort() function.
        ....
            const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

            return startDateMatch && endDateMatch && textMatch;

        }).sort((a, b) => {
            if (sortBy === 'date'){
                return a.createdAt < b.createdAt ? 1 : -1;
            } else if (sortBy === 'amount'){
                return a.amount < b.amount ? 1 : -1;
            }
        });
    };
        We use a compare function to sort the date if that is what was assigned into the 'sortBy' property in the object. It's pretty straight forward.
        So if 'a.createdAt < b.createdAt' then that is true and 1 is returned and 'b.createdAt' gets moved above a. if a.        So if 'a.createdAt < b.createdAt' then that is true and 1 is returned and 'b.createdAt' gets moved above a. if 'a.createdAt' was more than 'b.createdAt' then it would be false and -1 would be returned and b would stay beneath.

Lecture 98 Section Intro: Connecting React and Redux
    We need to connect the two so that components can grab info from the redux store and so that components can do something when they are interacted with and update the store.

Lecture 99 Organizing Redux
    In this lecture we broke up the redux-expensify.js file into pieces and moved them into the expensify app. (so out of playground). We created 4 folders and put the following files inside...

        actions ->  expenses.js (addExpense,removeExpense, editExpense)
                    filters.js (setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate)

        reducers -> expenses.js (expensesReducer)
                    filters.js (filtersReducer)

        selectors-> expenses.js(getVisibleExpenses)

        store ->    configureStore.js(store)

    Then we imported all of these to the head of the app.js and we ran some store.dispatch()'s to test and see if all was working.

        const store = configureStore();//this calls in the store

        store.subscribe(() => { //this runs with every change.
            const state = store.getState();
            const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

            console.log(visibleExpenses);
        });

        store.dispatch(addExpense({description: 'Water bill', amount: 300}));
        store.dispatch(addExpense({description: 'Gas bill', amount: 100}));

        store.dispatch(setTextFilter('water'));

Lecture 100 The Higher Order Component
    Higher Order Component(HOC) - Is just a react component that renders another component. The HOC is the component that creates the lower ones inside it. This is useful when you want to use a component you already have but want to modify it in some way.

    The point of HOC is to reuse code. We can ...
        Render hijacking
        Prop Manipulation
        Abstract State

    We created hoc.js in the playground folder. We set up a react workspace. We then created a simple component that required a prop.
        //example
            const Info = (props) => (
                <div>
                    <h1>Info</h1>
                    <p>The info is: { props.info }</p>
                </div>
            );

        ReactDOM.render(<Info info="These are the details" />, document.getElementById('app'));

    Then we created a function that would create a component and then also used the component we already created. This is a reusable peice.

        //require authentication
        const requireAuthentication = (WrappedComponent) => {
            return (props) => (
                <div>
                    { props.isAuthenticated ? (<Info {...props}/>) : (<p>Must login to see info.</p>) }
                </div>
            );
        };

        const AuthInfo = requireAuthentication(Info);
            // This becomes the component we call and we pass in the component we want to manipulate/use.

        ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));
            //AuthInfo is the component and we add a prop to it 'isAuthenticated={false}', which gets passed down as a prop that gets used in our HOC component. In the requireAuthentication function we return a jsx 'div' and inside we use a ternary operator that says if 'isAuthenticated' is true then show the Info component. If it's false then show the message 'Must login to see info.'.

Lecture 101 Connecting Store and Component with React-Redux
    //Switch webpack.config.js back to watching app.js.
    We install the react-redux library and import it in app.js.
    $ yarn add react-redux@5.0.6

    In app.js we import Provider from react redux and then make a new const below to allow our components to use it. It has a prop that IS the store. Then we tell ReactDOM to render that(jsx).

        import { Provider } from 'react-redux';
    ...
        const jsx = (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );


        ReactDOM.render(jsx, document.getElementById('app'));

    In expense dashboard component we import '<ExpenseList />', a component we will create. and put it in the component.

        import React from 'react';
        import ExpenseList from './ExpenseList';

        const ExpenseDashboardPage = () => (
            <div>
                <ExpenseList />
            </div>
        );

        export default ExpenseDashboardPage;

    Then we create the component 'ExpenseList' in our components folder. We import react and connect from react-redux.

        import React from 'react';
        import { connect } from 'react-redux';

        const ExpenseList = (props) => ( //This is the component we want
            <div>
                <h1>Expense List</h1>
                {props.expenses.length}
                {props.filters.text}
            </div>
        );

        const mapStateToProps = (state)=> { //this is a function we make to define what we want to bring in from the store.
            return {
                expenses: state.expenses,
                filters: state.filters
            };
        };

        export default connect(mapStateToProps)(ExpenseList); //Here we use a built in react-redux HOC component 'connect' that connects our store with OUR component.
            i.e.
                connect(function that says what we want from store)(component)
    This allows our components to exist in isolation with out having to be tethered to parents and children.
