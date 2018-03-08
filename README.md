# react101
A place where I'm going to put all the things about react.js

Command line short list.
Run program for the first time load dev dependencies - $ yarn install
Run the dev server - $ yarn run dev-server
Run the test suite - $ yarn test --watch

Git short list.
$ git init - Create a new git repo
$ git status - View the changes to your project code
$ git add - Add files to staging area
$ git commit - Create a new commit with files from staging area
$ git log - View recent commits
$ q - To quit the git log


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

Lecture 102 Rendering Individual Expenses
    Here we create the ExpenseListItem component and then pass it over to the ExpenseList component and use the .map to loop through our expenses to the screen.

    //ExpenseListItem
        import React from 'react';

        const ExpenseListItem = ({ description, amount, createdAt }) =>(
            <div>
                <h3>{description}</h3>
                <p>{amount} - {createdAt}</p>
            </div>
        );

        export default ExpenseListItem;

    //ExpenseList
        import React from 'react';
        import { connect } from 'react-redux';
        import ExpenseListItem from './ExpenseListItem';
        import selectExpenses from '../selectors/expenses'; // this is the filter inside selectors.

        const ExpenseList = (props) => (
            <div>
                <h1>Expense List</h1>
                {props.expenses.map((expense)=>(
                        <ExpenseListItem key={expense.id} {...expense}/>
                        //We pass in two props key gives each item in the loop a unique id and '...expense' provides a copy of everything inside 'expense:'.
                    ))
                }
            </div>
        );

        const mapStateToProps = (state)=> {
            return {
                expenses: selectExpenses(state.expenses, state.filters)
                //The value of expenses is no longer 'state.expenses', because it would never change and show all results. So it's now the value of the result of the filter in the selectors->expenses.
            };
        };

        export default connect(mapStateToProps)(ExpenseList);
    // This is a lot going on. Maybe watch again.

Lecture 103 Controlled Input for Filters
    In this lecture we did two things.

    1. we created a new component that is an input box called 'ExpenseListFilters' and then exported it and then imported it to the 'ExpenseDashboardPage'. Once it was showing up we went back to 'ExpenseListFilters' and did the following...(For the sake of being able to type input and then filter the view of results)

        import React from 'react';
        import { connect } from 'react-redux'; //Imported this
        import { setTextFilter } from '../actions/filters'; //Imported this

        const ExpenseListFilters = (props) => (
            <div>
            //Set the value to the current text and then told it to dispatch when there was a change. On the dispatch it will set the filter parameter to whatever was JUST typed.
                <input type='text' value={props.filters.text} onChange={(e)=>{
                    props.dispatch(setTextFilter(e.target.value));
                }}/>
            </div>
        );

        //This function gives the component access to the filters.
        const mapStateToProps = (state) => {
            return {
                filters: state.filters
            };
        };
        //Connect is the function we brought in from 'react-redux' that allows the data binding between the user and the store. It gives the component access to the state/store.
        export default connect(mapStateToProps)(ExpenseListFilters);

    2. We added a button to the ExpenseListItem that 'onClick' would delete that list item from the store.

        import React from 'react';
        import { connect } from 'react-redux'; //Imported this
        import { removeExpense } from '../actions/expenses'; //Imported this

        const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) =>( //We had to assign/pass in 'dispatch' and 'id' from the props.
            <div>
                <h3>{description}</h3>
                <p>{amount} - {createdAt}</p>
                // on click we run an arrow function that just sends out a dispatch which runs the 'removeExpense' function and requires an object of the id.
                <button onClick={()=>{
                    dispatch(removeExpense({id}));
                }}>Remove</button>
            </div>
        );

        //Note because we didn't need any info FROM 'expenses' or 'filters' to do it's job. It just needed access to the dispatch function. Which it gets from the connect even when the first argument is empty.

        export default connect()(ExpenseListItem);

Lecture 104 Dropdown for Picking Sortby
    In this lecture we created the select dropdown and then set its value base on the current value set in the store. Then we listen to the onChange event and if the value changes to the other it then sends out a dispatch with the correct action object function. This was added just beneath the 'input' in 'ExpenseListFilters'. We did have to import 'sortByDate' & 'sortByAmount' from '../actions/filters'.

        <select
            value={props.filters.sortBy}
            onChange={(e)=>{
                if (e.target.value === 'date'){
                    props.dispatch(sortByDate());
                } else if (e.target.value === 'amount') {
                    props.dispatch(sortByAmount());
                }
            }}>

            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>

Lecture 105 Creating Expense Add/Edit Form
    In this lecture we focused on setting up the Expense Form which we created in components/ExpenseForm.js. We plan on using this format and code on the other pages so we created a class component. We plug in the classs component in the AddExpensePage.js.

        import React from 'react';
        import ExpenseForm from './ExpenseForm';

        const AddExpensePage = () => (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm /> // HERE
            </div>
        );

        export default AddExpensePage;

    Then we went and hashed out the details in our form. First we imported React then created the class called 'ExpenseForm' as seen below, and we exported it. We set up the 'state' and also the 'render(){}'

    Next (on the bottom) we created our form in the 'render()' with the inputs we needed, setting autofocus to the first one. We set the value to the default of the state above and then we set the 'onChange' to run a function every time there is a change. See on amount change... (note i removed onDescriptionChange and onNoteChange for brevity)

        import React from 'react';

        export default class ExpenseForm extends React.Component {

            state = {
                description: '',
                note: '',
                amount: ''
            };

            ...

            onAmountChange = (e) => { // pass in the event
                const amount = e.target.value; get the value from the textarea/input.

                if (amount.match(/^\d*(\.\d{0,2})?$/)) {

                    //This is a regular expression above. It is saying only if true allow the state to change if it matches the regular expression. otherwise then no changes can be made. The regular expression only allows numbers and essentially the curency format. i.e. 100.00

                    this.setState(() => ({ amount }));
                }
            };

            render(){
                return (
                    <div>
                        <form>
                            <input
                                type='text'
                                placeholder='Description'
                                autoFocus
                                value={this.state.description}
                                onChange={this.onDescriptionChange}
                            />
                            <input
                                type='text'
                                    // We needed to set the type to 'text' instead of 'number' so we could set our regular expression on it.
                                placeholder='Amount'
                                value={this.state.amount}
                                onChange={this.onAmountChange}
                            />
                            <textarea
                                placeholder='Add a note for your expense (optional)'
                                value={this.state.note}
                                onChange={this.onNoteChange}
                            ///>
                            </textarea>
                            <button>Add Expense</button>
                        </form>
                    </div>
                )
            }
        }

    We also learned regex101.com is a great tool for making regular expressions.

Lecture 106 Setting Up a Date Picker
    In this lecture we set up the date picker. we started by installing 3 things
        1. 'moment' momentjs.com - Is like a date() function but returns much better formatting.
        2. 'react-dates' https://github.com/airbnb/react-dates is an airbnb react project that gives us their calendar date picker.
        3. and 'react-addons-shallow-compare' which react-dates uses so we do too.  

        $ yarn add moment@2.18.1 react-dates@12.7.0 react-addons-shallow-compare@15.6.0

    we imported to our ExpenseForm component...

        import moment from 'moment';
        import { SingleDatePicker } from 'react-dates';
        import 'react-dates/lib/css/datepicker.css'; // this is the css for the datepicker/

    then we just add the 'SingleDatePicker' component to our form. There are other components we could use from 'react-dates' like start and end date but we don't need it. It is all in the docs on their github.

    This is underneath our '<input/>' in ExpenseForm.

        <SingleDatePicker // the first 4 are REQUIRED
            date={this.state.createdAt}//set default date
            onDateChange={this.onDateChange} function that runs on change
            focused={this.state.calendarFocused} // this is required but I don't know what it does.
            onFocusChange={this.onFocusChange} //
            numberOfMonths={1} // makes only one month show up
            isOutsideRange={() => false} //allows us to pick dates in the past.
        />

    To have a default state for the values we added a few things to the state object.
        state = {
            description: '',
            note: '',
            amount: '',
            createdAt: moment(), //returns a timestamp present time.
            calendarFocused: false //Was required to be set up to false. We named 'calendarFocused' in stead of 'focused' to be more specific.
        };

    Then we had to create the functions to handle the onchanges...

        onDateChange = (createdAt) => { //Set the state to the date passed in
            this.setState(() => ({ createdAt })); //long version '{createdAt: createdAt}'
        };

        onFocusChange = ({focused}) => {//destructured and named then returns the value of focused to calendarFocused in the state.
            this.setState(() => ({ calendarFocused: focused }));
        };
    Everything is now working and updating in real time to the state inside this class component ExpenseForm. Next we need to wire it up to DO something when submitted.

Lecture 107 Wiring Up Add Expense
    In this lecture we did a few little tweaks in the beginning to make it so that a person cannot enter a decimal for the first number in amount.

        //We updated the regular expression. and we change the conditional statement to say if it's NOT empty and meets the requirement of the regular expression then update.
        onAmountChange = (e) => {
            const amount = e.target.value;

            if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
                this.setState(() => ({ amount }));
            }
        };

    We also change the 'onDateChange' function to not allow the user to empty it out. We did this by adding a conditional statement that says only if createdAt has a truthy value do you let the state be change. So it will not allow an empty date to be passed or stored.

        onDateChange = (createdAt) => {
            if (createdAt){
                this.setState(() => ({ createdAt }));
            }
        };

    Next we set up the onSubmit on the form.
        ...
        <form onSubmit={this.onSubmit}>
            <input
                type='text'
                ...

    I didn't understand this at first but next we added a prop to <ExpenseForm /> in 'AddExpensePage.js'.
        //By adding onSubmit as a prop we are able to pass up the values from the state of this component. We put in an arrow function and pass in expense which will hold the returned values from the form.
        ...
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense)=> {
                console.log(expense);
            }}
        />...

    Then we created the function we just called.

        onSubmit = (e) => {
            // We pass in the event and immediately prevent the default page load.
            e.preventDefault();

            //Here we said if there is no description or amount then throw an error. We added error to the state at the top and set its value to and empty string.
            if (!this.state.description || !this.state.amount){
                //error message
                const error = 'Must enter a Description & Amount';
                this.setState(() => ({ error }));

            } else {
                //If both are set then set the error to an empty string and then return to the props.onSubmit the object of the current values held in the state of the expense form.
                this.setState(() => ({ error: ''}));
                this.props.onSubmit({
                    description: this.state.description,

                    amount: parseFloat(this.state.amount, 10) * 100,
                    //amount is saved as a string so we parse it and make it into pennies.

                    createdAt: this.state.createdAt.valueOf(),
                    // createdAt had a 'momentjs' object and we need to return a unix timestamp. so my adding '.valueOf()' we return a unix timestamp in milliseconds. We leared this from the momentjs docs.

                    note: this.state.note
                });
            }
        };

    Now as it stands when we onSubmit it returns the expense to the console.log window. Now we take the data from the 'expense' and plug it into the redux store.

    - On AddExpensePage.js we import connect from 'react-redux' and addExpense from 'actions/expenses'.
    - Then we add the connect to the export default on the bottom.
    - Pass in 'props' to the AddExpensePage function.
    - Then we called props.dispatch and passed in the 'addExpense' function with the expense variable that has an object in it with description, amount, createdAt & note.


        import React from 'react';
        import { connect } from 'react-redux';
        import ExpenseForm from './ExpenseForm';
        import { addExpense } from '../actions/expenses';

        const AddExpensePage = (props) => (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={(expense)=> {
                        props.dispatch(addExpense(expense));
                    }}
                />
            </div>
        );

        export default connect()(AddExpensePage);

    //Now when we submit it takes the data the user typed in and saves it in the redux store. We can see it on the dashboard page. Next we want to reroute the user to the Dashboard page when they hit submit.

    Components we render inside of react-router all get access to special props. We use one of the 'history' methods called 'push()', which is how we change pages and you pass in the path you want to go to.

        const AddExpensePage = (props) => (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={(expense)=> {
                        props.dispatch(addExpense(expense));
                        props.history.push('/')
                        //So we pass in the '/' to route us to the home page. This work just as if they hit a link to that page. so if they click the back button it will keep track and take them back.
                    }}
                />
            </div>
        );
    //AND that's it.

Lecture 108 Wiring up Edit Expense
    First thing we needed to do was link each expense to the EditExpensePage.js and have the id of the expense go with it. We did this by importing the 'Link' from react-router and Then wrapping the h3 with the link tag. Then we passed in 'to={`/edit/${id}`}' which directs us to the page with the id of the item we clicked on.

        const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) =>(
            <div>
                <Link to={`/edit/${id}`}>
                    <h3>{description}</h3>
                </Link>
                <p>{amount} - {createdAt}</p>
                <button onClick={()=>{
                    dispatch(removeExpense({id}));
                }}>Remove</button>
            </div>
        );

    Next we went to the 'EditExpensePage.js' and we imported 'connect' from react-redux and we connected it in on the bottom and with the first one needing to connect to the redux store we did 'mapStateToProps' and the second argument being the component function 'EditExpensePage'. We set up 'mapStateToProps' like this...

        const mapStateToProps = (state, props) => { //Passing in both the state and props.
            return {
                    //'.find()' returns where the condition of true is met. In this case if the id in the redux store matches the id of the prop then it returns true and returns that object.
                expense: state.expenses.find((expense) => expense.id === props.match.params.id)
            };
        };

        export default connect(mapStateToProps)(EditExpensePage);

    For the 'EditExpensePage' function we first imported..
        import ExpenseForm from './ExpenseForm';
        import { editExpense } from '../actions/expenses';

    Then we added the <ExpenseForm /> and we passed it two props. The 'props.expense' coming from the parent with the id in it... and the 'onSubmit' handler which dispatches the 'editExpense()' which we imported and we pass in two arguments, the id and the expense variable being returned from the form with the updated state from the form.
        const EditExpensePage = (props) => {
            return (
                <div>
                    <ExpenseForm
                        expense={props.expense}
                        onSubmit={(expense)=>{
                            props.dispatch(editExpense(props.expense.id ,expense));
                            props.history.push('/');
                            //the 'history.push' redirects us to the home page after the redux store gets updated.
                        }}
                    />
                </div>
            );
        };

    The form we kept mostly as is but made a modification to the state. We wanted it to have the default value of what was in the redux store if it existed and if not then set it to an empty string. We updated the state like this...

            //We had to make a constructor and pass in the props and use the super(props) as to keep it connected then we used a ternary operator to use the prop data if it exists and a default empty string if not.

        export default class ExpenseForm extends React.Component {
                //NOTE with our 'transform-class-properties' plugin the constructor isn't really necessary but we used it anyway.
            constructor(props){  
                super(props);

                this.state = {
                    description: props.expense ? props.expense.description : '',
                    note: props.expense ? props.expense.note : '',
                    amount: props.expense ? (props.expense.amount /100).toString() : '',
                    createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
                    calendarFocused: false,
                    error: ''
                };      
                //On 'amount' we took the value and divided it by 100 to make it not in pennies anymore and we converted it to a string.

                //On 'createdAt' we just needed to wrap it in the moment() function so it would return a date.
            }
        ...
    //Now when you click to edit the program passes in the info from the redux store into the form fields via the state from the redux store. It finds it because the id is passed in to grab it out and display it.

    //Lastly we removed the 'remove' button from the 'ExpenseListItem' and put it in the 'EditExpensePage'. So we gutted the button and from the ExpenseListItem page and get rid of connect and the two imports 'connect' and 'removeExpense'.

    //We put the button under the '<ExpenseForm />' and then imported 'removeExpense' at the top then added props to the front of .dispatch().
    The on the last page 'dispatch' was passed in deconstructed and named. Same with 'id' so we needed to do 'id : props.expense.id'. And then props.history.push('/') to route us back to the home page.

        <button
            onClick={()=>{
                props.dispatch(removeExpense({id : props.expense.id }));
                props.history.push('/');
        }}>Remove</button>

Lecture 109 Redux Dev Tools
    We are installing REDUX deve tools for the chrome browser. We first install the extension in chrome web store then we modify how we 'createStore()' in our code.

    https://github.com/zalmoxisus/redux-devtools-extension

    In the store/configureStore.js we add this one line...

        // Store creation
        export default () => {
            const store = createStore(
                combineReducers({
                    expenses: expensesReducer,
                    filters: filtersReducer
                }), // add a comma and add the line below.
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            );

            return store;
        };

    And that's it.

Lecture 110 Filtering By dates
    We are setting the start date and end date for our app so the user can filter between a date range.

    First we updated filter.js. We imported the moment.js lib and we called momnet two times to set the startDate and endDate with the start of the current month to the end of the current month.

        import moment from 'moment';

        // Filters Reducer
        const filtersReducerDefaultState = {
            text: '',
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        };
    Next we added the datepicker widget to the ExpenseListFilters.js. We started out by switching the function to a class function by deleting...

        'const ExpenseListFilters = (props) => '

    and replacing it with...

    class ExpenseListFilters extends React.Component {
        render() {
            return (
                ...Here is the jsx from the const.
            );
        }
    }

    We then imported at the top ...
        import { DateRangePicker } from 'react-dates';

    Now because we just made it a class based component function we need to add a 'this.' to the beginning of all the calls to 'prop'.
        Like...
            <input
                type='text'
                value={this.props.filters.text} //THIS
                onChange={(e)=>{
                this.props.dispatch(setTextFilter(e.target.value));
                }}
            />
    Then we put in our new DateRangePicker component.The first five are required.

        <DateRangePicker
            startDate={this.props.filters.startDate}//pulled from our props
            endDate={this.props.filters.endDate}//pulled from our props
            onDatesChange={this.onDatesChange}//need to create the function
            focusedInput={this.state.calendarFocused}//We need to set this in the state for this class function component.
            onFocusChange={this.onFocusChange}//need to create the function
            showClearDates={true}//This enables an 'X' to clear dates.
            numberOfMonths={1}//This enables only one month to be shown.
            isOutsideRange={() => false}//This lets us select back in time.
        />

    Next we create the 'state' for this class and set the calendarFocused.
        state = {
            calendarFocused: null
        };
    Then we create the two functions we named but haven't created. 'onDatesChange' and 'onFocusChange'.
            // We could pass in the prop but instead we destructure and pass in the names.
        onDatesChange = ({ startDate, endDate }) => {
                //We call the dispatch on the props and call the action functions from actions/filters.js and pass in the start and end dates. For them to work we need to make sure we import them at the top.
            this.props.dispatch(setStartDate(startDate));
            this.props.dispatch(setEndDate(endDate));
        };

        We are required to set this up for the component and I don't really know what it does.
        onFocusChange = (calendarFocused) => {
            this.setState(() => ({ calendarFocused }));
        };

    Things should be fuctioning at this point except the filters don't actually filter. So next we go to 'selectors/expenses.js' and do a little refactoring.

    //We are getting info from moment.js docs. https://momentjs.com/docs/#/query/is-same-or-before/
    https://momentjs.com/docs/#/query/is-same-or-after/

    Here we imported moment.js and then modified 'const startDateMatch' and 'const endDateMatch'. But first we created 'createdAtMoment' where we assigned it's value to the moment the entry being filtered was createdAt.

    Then we used a ternary operator and said for instance on 'startDateMatch'...
        If 'startDate' is truthy then return true if it's the same or before the the 'createdAtMoment' of the expense. AND if 'startDate' is falsey then retun true. Which means the filter isn't set and return everything.

        import moment from 'moment';

        // Get visible expenses
        export default (expenses, { text, sortBy, startDate, endDate }) => {
            return expenses.filter((expense) => {
                const createdAtMoment = (expense.createdAt);
                const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
                const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
                const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
            ...

Lecture 111 Into: Testing React Components
    Here Andrew explains why writting tests for our app is useful. It seems mundane with a small app but as the app grows it will become a LOT of work to test each component. By having a testing script we can make changes and run the script and know we didn't break anything in less than 2 seconds.

Lecture 112 Setting up jest.
    In this lecture we install and set up Jest.
    install to our project...
        $ yarn add jest@21.2.1
    And then add a script to our package.json...
        "scripts": {
          "serve": "live-server public/",
          "build": "webpack",
          "dev-server": "webpack-dev-server",
          "test":"jest" //HERE
        },
    Now if we run '$ yarn test' it will look through our project for any test cases and run them. However at this point none exist. If we want to keep it running and do a watch we just write.
        $ yarn test --watch

    Next we create a 'test' folder in our 'src'. All our tests will go here.
    we create file 'add.test.js'. NOTE 'test.js' is the extension that Jest looks for to know it's a test.

    we wrote up this example page...
        //This is our first function to test
        const add = (a,b) => a + b;

        //This is our second function to test
        const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

            //'test()' is a global variable only allowed in test.js files. It takes two arguments, test description and an arrow function where you call the function being tested.

            //'expect()' and 'toBe()' are also global variables. You pass in the variable to be checked in and then put in what you are expecting in the 'toBe()'.
        test('Should add two numbers',() => {
            const result = add(3,4);
            expect(result).toBe(7);
        });

        test('Should add name passed onto "Hello" ',() => {
            const result = generateGreeting('Mike');
            expect(result).toBe('Hello Mike!');
        });

        test('Should generate greeting with no name',() => {
            const result = generateGreeting();
            expect(result).toBe('Hello Anonymous!');
        });

    All these tests should pass.

Lecture 113 Testing Expenses Action Generator
    Note I wrote the first test in this lecture and was getting an error. I went to the Q&A and found others had a similar problem. So I needed to intall babel-jest to fix.
        $ yarn add babel-jest
    Now it works.

    In this lecture we are writing test cases for our action/expeses.js functions.

    So we created a copy of the file structure inside our 'tests' folder and created 'tests/actions/expenses.test.js'.

    Then we created the following show 2 of the 3 tests we wrote.
    //Example
        import { addExpense, editExpense, removeExpense } from '../../actions/expenses'; //First Import the functions.

        //removeExpense
        // 'test()' takes two arguments a name and an arrow function where we pass in a case of our function.
        test('Should setup remove expense action object', () =>{
            const action = removeExpense({ id: '123abc'});
            expect(action).toEqual({
                type: 'REMOVE_EXPENSE',
                id: '123abc'
            });
        });
        //'expect()'is where we put the variable we want to be tested.
        //In this test we used '.toEqual()' instead of 'toBe()' because we need the values inside to each be tested not the entire contents as a whole. That's my understanding. '.toEqual' will go through each pair value in the object and check them for a match.

        //'addExpense' We did two of these. this one testing values being passed in work. and the second was that the default settings worked.

        test('Should setup add expense action object with provided values', () => {
            const expenseData = { //We created a test var.
                description: 'Rent',
                note: 'Paid on second',
                amount: 109500,
                createdAt: 1000
            };
            const action = addExpense(expenseData);//passed it in.
            expect(action).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    ...expenseData, //We can use the spread operator instead of retypeing.
                    id: expect.any(String)
                    //Because the id isn't generated by us and is always different we use the '.any()' method to say we expect the value to be any string.
                }
            });
        });

Lecture 114 Testing Filters Action Generators
    In this lecture we created tests for our actions/filters.js. Nothing was that different from the last lecture except the 'sortByDate' and 'sortByAmount' shorthand we used...

        test('Should set sort by date action object', () => {
            expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
        });
        //We can pass the empty function 'sortByDate()' right into the expect and keep the toEqual all on the same line.

    We also imported moment and used it to test the date filters.

        //setStartDate
        test('Should generate set start date action object', () => {
            const action = setStartDate(moment(0));
            expect(action).toEqual({
                type: 'SET_START_DATE',
                startDate: moment(0)
            });
        });
        // We needed to make sure we set the time in the moment or they would not match. Thus the '0' in moment(0).

Lecture 115 Testing Expenses Selector
    In this lecture we wrote 5 tests for the 'selectors/expenses.js', 'selectExpenses' function. Which gets called and used in 'components/ExpenseList.js'. It populates the value of the expenses js object from the state only with items that match the filter.

    We imported 'moment' and 'selectExpenses'. Then we created some test data and made an array of 3 objects.

    Then in each test we created and tweaked the filters object to test every scenario it might have. Then we did the expect() and .toEqual() to provide what we expected.

    On new thing we learned is a new moment.js function.
    ...
        //We can use moment to take us to a time and then add or subtract from that time with '.add()' and '.subtract()'. They take two arguments, (number, type of increment - seconds/minutes/days/months/years)

        },{
            id: 2,
            description: 'Rent',
            note: '',
            amount: 109500,
            createdAt: moment(0).subtract(4, 'days').valueOf()
        },{
            id: 3,
            description: 'Credit Card',
            note: '',
            amount: 4500,
            createdAt: moment(0).add(4, 'days').valueOf()
        }]
    ...

Lecture 116 Testing Filters Reducer
    In this lecture we tested the filters in 'reducers/filters.js'. It was pretty straight forward. Here are two samples explained.

        //Default - nothing passed in.

        //'@@INIT' is what redux passes in on page load. So technically the switch staement works with this. It doesn't match anything in the switch and so it passes through the default settings.

        test('Should setup default filter values',() => {
            const state = filtersReducer(undefined,{ type: '@@INIT' });
            expect(state).toEqual({
                text: '',
                sortBy: 'date',
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month')
            });
        });

        //sortBy amount
        test('Should set sortBy to amount',() => {
            const state = filtersReducer(undefined,{ type: 'SORT_BY_AMOUNT' });
            expect(state.sortBy).toBe('amount');
        });

    Note: use .toEqual() when we are returning an object and .toBe() when we are returning a single value.

Lecture 117 Testing Expenses Reducer
    In this lecture we tested 'expensesReducer' in 'reducers/expenses.test.js'. We would need some test data to run these tests. So we removeed the test data we already wrote in 'selectors/expenses.test.js' and moved it to a new folder called 'fixtures' inside the file 'expenses.js'. Then we just imported that data to the files that would need it. like 'selectors/expenses.test.js' and 'reducers/expenses.test.js'. like ...

        import expenses from '../fixtures/expenses';

    Then we can just call on expenses in our test for the array of object data.

    The following two were tricky for me...

        //add expense
        test('Should add new expense',() => {
            const expense = {
                id: 4,
                description: 'Newest Expense',
                note: '',
                amount: 4000,
                createdAt: 1000
            };
            const action = {
                type: 'ADD_EXPENSE',
                expense: expense
            };
            const state = expensesReducer(expenses, action);
            expect(state).toEqual([...expenses,expense]);
            //Here on this last line we expand the expenses and then add a comma and then put the expense we just added. This stumped me.
        });

        //Edit expense
        test('Should edit expense',() => {
            const action = {
                type: 'EDIT_EXPENSE',
                id: expenses[0].id,
                updates: {
                    description: 'Chewing gum'
                }
            }
            const state = expensesReducer(expenses, action);
            expect(state[0].description).toBe(action.updates.description);

            //I kept selecting the expense by doing 'state.expense[0]'. But that was wrong, 'state' IS the array of expenses. So the correct way to get to the description in the state is... 'state[0].description'
        });

Lecture 118 Snapshot Testing
    Testing components is very different than regular functions. They need to render to make sure they work. Facebook/React created a tool called 'react-test-renderer' to do render components in a testing atmosphere. We installed it using.
        $ yarn add react-test-renderer@16.2.0
    Next we import it into our test file. We are testing Header.js first since it is so simple. We created 'tests/components/Header.test.js'. In the top we import 3 things.

        import react from 'React';
        import ReactShallowRenderer from 'react-test-renderer/shallow';
        import Header from '../../components/Header';

    Then we write the following test.

        test('Should render Header correctly',() => {
            const renderer = new ReactShallowRenderer();
            renderer.render(<Header />);
            // console.log(renderer.getRenderOutput());
            expect(renderer.getRenderOutput()).toMatchSnapshot();
        });

        // We start the test as normal then we create a new instance of ReactShallowRenderer and store it in 'renderer'. ReactShallowRenderer only takes the top level results without burrowing down into children components and tags.
        // Then we call renderer and add on '.render()', this allows us to pass in the component we want to test and render it virtually.
        // Then we run our test case with ...

            expect(renderer.getRenderOutput()).toMatchSnapshot();

            //we expect the output of renderer to match a snapshot of the original. '.toMatchSnapshot()' is a built in 'jest.js' function.
            '.getRenderOutput()' is a built in 'react-test-renderer' function.
        //Jest creates a folder automatically in our tests folder called '__snapshots__'. This is where it will store the snapshot of what ever component we save. Note the first time we run it, it will ALWAYS pass and create a snapshot. From there on out it will compair to see if it's different than the original. If it is, the test will fail. We can then either fix the mistake or type 'u' in the terminal to update the snapshot.

Lecture 119 Enzyme
    In this lecture we install 'Enzyme' which is apparently much better for testing. We also have to add a few other things with it so that it works...

    $ yarn add enzyme@3.2.0 enzyme-adapter-react-16@1.0.0 raf@3.3.2
    //The first is enzyme the second is an adapter so we don't need to code for older versions of react. The third(raf(request animation frame)) is something our browser has built in and does with our code automatically and it does not happen in a test environment unless we bring it in... so we are.

    Next we need to do some more steps to setup enzyme.

    We created 'tests/setupTests.js'. This file allows us to configure the test environment we are going to run in.

    //inside we put ... And docs for this are(http://airbnb.io/enzyme/)

        import Enzyme from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';

        Enzyme.configure({
            adapter: new Adapter()
        });

    Next we configure it to work with Jest. (https://facebook.github.io/jest/docs/en/configuration.html#content)
    We went to the docs/configuration and clicked on the 'setupFiles[array]'. This when set up, makes it so jest runs this first and then our tests.

    On the base level next to our package.json we create 'jest.config.json'.

    in it we put the things we need to run. before jest runs.
        {
            "setupFiles": [
                "raf/polyfill",
                "<rootDir>/src/tests/setupTests.js"
            ]
        }

    Then in our 'package.json' file we update the test attribute to "jest --config=jest.config.json".
    ...
        "build": "webpack",
        "dev-server": "webpack-dev-server",
        "test": "jest --config=jest.config.json" //HERE
      },
    ...

    We are now setup for enzyme 3.

    When we use the '.toMatchSnapshot()' as things are now we will get a lot of extra enzyme crap. So to make it go away and get back to what we want we install 'enzyme-to-json'.
        $ yarn add enzyme-to-json@3.2.2

    Then we import ...

        import toJSON from 'enzyme-to-json';

    //and change our code to...

        test('Should render Header correctly',() => {
            const wrapper = shallow(<Header />);
            expect(toJSON(wrapper)).toMatchSnapshot();
        });
        //We called the toJSON and passed in our wrapper which now weeds out all the irrelevant data. Our snapshot is now more relevant and succinct.

    AND one more thing! inside the 'jest.config.json' we are going to add one more thing.
        {
            "setupFiles": [
                "raf/polyfill",
                "<rootDir>/src/tests/setupTests.js"
            ],//ADD THIS below...
            "snapshopSerializers": [     
                "enzyme-to-json/serializer"
            ]
        }

    Now we no longer need ... the import or to use the 'toJSON()'. So we end up with...

        import React from 'react';
        import { shallow } from 'enzyme';
        import Header from '../../components/Header';

        test('Should render Header correctly',() => {
            const wrapper = shallow(<Header />);
            expect(wrapper).toMatchSnapshot();
        });

    NOW we are set up! This video was painful. Seems like a ton of work. But I'm trusting it will make things run smoother.

Lecture 120 Snapshot Testing with Dynamic Components
    In this lecture we test our first component, ExpenseList.js. We did change the component to render a message if it was passed an empty array. and then to make the list like normal if a list is passed in.

    We also added 'export' in front of the component so we would be able to import the component itself into the test area. NOTE: the default export is the 'connected()()' part of the component which would bring in values from redux state, which we do NOT want to do. We want to test the component in isolation.

    Then we created 'tests/components/ExpenseList.test.js'. We imported the following.

        import React from 'react';
        import { shallow } from 'enzyme';
        import { ExpenseList } from '../../components/ExpenseList';
        import expenses from '../fixtures/expenses';

    //Then wrote the following two tests.

        //On this one we give the prop the expenses array that we created in fixtures(aka test data).
        test('Should render expense list with expenses',() =>{
            const wrapper = shallow(<ExpenseList expenses={expenses}/>);
            expect(wrapper).toMatchSnapshot();
        });

        This one we pass in an empty array.
        test('Should render expense list with empty message',() =>{
            const wrapper = shallow(<ExpenseList expenses={[]}/>);
            expect(wrapper).toMatchSnapshot();
        });
    Both worked and snapshots were stored.

    We then created a test for ExpenseListItem.js This was similar with only a few differences to be noted.

        import React from 'react';
        import { shallow } from 'enzyme';
        import expenses from '../fixtures/expenses';
        import ExpenseListItem from '../../components/ExpenseListItem';

        //Above ExpenseListItem does not need to be wrapped in '{}' because it is the default export. I had it wrapped and it gave me errors.

        test('Should render ExpenseListItem item correctly',() =>{
            const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
            expect(wrapper).toMatchSnapshot();
        });

        //In this test I never would have thought to pass in an expanded expense item without calling and assigning a prop. But it's the only way I've gotten it to work.
            ...shallow(<ExpenseListItem {...expenses[0]} />); ...

Lecture 121 Mocking Libraries with Jest
    In this lecture we solve the problem of taking snapshots with timestamps in them. Time is always changing so the snapshot will always be wrong.

    We look in the docs under 'Manual Mocks'.
    https://facebook.github.io/jest/docs/en/manual-mocks.html#content

    We create the following 'tests/__mocks__/moment.js'(the double underscores and name is significant to jest) inside of that file we put...

        const moment = require.requireActual('moment');

        export default (timestamp = 0) => {
            return moment(timestamp);
        };

        //We create an export default arrow function. That passes in a timestamp. If it's not set it will be set to 0 and if it's set then it passes it on and it will put it through moment.js. We need to use moment so at the top we can't import it because it will look for the 'moment' in the same file. So we need to import it using 'require.requireActual()'.

        //Jest will always go here when it see's 'moment()'. Then we control the current datetime to always be 0. If it was a created at time then it would just be passed along.

    The component we tested was ExpenseForm.js the test for it looks just like the other component tests we have done. But here it is anyway...

        import React from 'react';
        import { shallow } from 'enzyme';
        import ExpenseForm from '../../components/ExpenseForm';
        import expenses from '../fixtures/expenses';

        //default
        test('Should render ExpenseForm correctly',() => {
            const wrapper = shallow(<ExpenseForm />);
            expect(wrapper).toMatchSnapshot();
        });

        //With data passed into the prop.
        test('Should render ExpenseForm with data correctly',() => {
            const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
            expect(wrapper).toMatchSnapshot();
        });

        //I'm not sure why on the second test we pass in the expense this way instead of '<ExpenseForm {...expenses[1]}/>' <-this does NOT work.

Lecture 122 Testing User Interaction
    http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
    In this lecture we learned about three new things, 'simulate()','.at()' and that we can put '.state()' on the component we are testing and have access to it's state, we can be specific by passing in what we want on that state. like ...'wrapper.state('note')' (wrapper is a var holding our component).

    '.simulate()' is a built in method with enzyme. It allows us to simulate all kinds of changes, like click, change, submit and more... See the docs. It takes two arguments the first is what to simulate and the second is the mock event object that will get passed through to the event handlers. This is where we burrow in to set what we need to pass into the event. for example on a 'change' event we expect the value to be on 'e.target.value'. So the second argument would be '{ target: { value } });'. I'm still a little confused on why this works.

    '.at()' is a built in method of enzyme as well. We can add it on to specify the index we want. So if there are 3 input nodes in our form we could specify like this... 'wrapper.find('textarea').at(0)'

    Examples...

        test('Should set note on textarea change',() => {
            const value = 'New note';
            const wrapper = shallow(<ExpenseForm />);
            //We find the textarea and simulate the change event and pass in the 'value' to the event. '{target: {value}}'.
            wrapper.find('textarea').simulate('change', {
                target: { value }
            });
            //Then here we go to the state and see if the value of 'note' is the same as the value.
            expect(wrapper.state('note')).toBe(value);
        });

        //on INVALID do not change amount
        //This one shows how we used '.at()' since the amount was the second input on the form it's 'wrapper.find('input').at(1)'.
        test('Should NOT set amount if invalid input',() => {
            const value = '12.122';
            const wrapper = shallow(<ExpenseForm />);
            wrapper.find('input').at(1).simulate('change', {
                target: { value }
            });
            expect(wrapper.state('amount')).toBe('');
        });
        //In this test we expect nothing to be set becuse we don't allow 2 places past the decimal.

Lecture 123 Test Spies
    (Note: I was not really understaning this as I went trough it. Maybe re-watch)
    In this lecture we learned about spies aka mocked functions. You create a new spy by simply attaching a 'jest.fn()' to a variable like this....

        const onSubmitSpy = jest.fn();

    When you use or pass in the spy it goes through the program and can tell you information about what happened.

    Here is the test we wrote using the mocked function.

        test('Should call onSubmit prop for valid form submission',() => {
            const onSubmitSpy = jest.fn(); //Create spy

            //Here we add on two props to our expense form. The expense and what to run on submit. in this case we run our spy function.
            const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);

            //Here we run the form with simulate and we make sure to prevent the default.
            wrapper.find('form').simulate('submit', {
                preventDefault: () => { }
            });

            //Because we are passing in true data we expect the error message to be set to an empty string.
            expect(wrapper.state('error')).toBe('');

            //Here we expect the 'onSubmitSpy' function to have been called last with this object and data.
            expect(onSubmitSpy).toHaveBeenLastCalledWith({
                description: expenses[0].description,
                amount: expenses[0].amount,
                note: expenses[0].note,
                createdAt: expenses[0].createdAt
            });
        });

    Next we made tests for 'onDateChange' and 'onFocusChange'. These both live in '<ExpenseForm />' in the '<SingleDatePicker />' We learned how to burrow in and test those props...


        test('Should set new date on date change',() => {
            const now = moment(); //create a moment after we imported it up top.

            //just shallow rendered the 'ExpenseForm'
            const wrapper = shallow(<ExpenseForm />);

            //Then we burrow in by using '.find()' to get the component and then '.prop()' which is new to us, to grap the prop by name. Then we tag on the argument/call the function and pass in what we want to pass in.
            wrapper.find('SingleDatePicker').prop('onDateChange')(now);

            //Then we make sure it changed the state to what we were expecting.
            expect(wrapper.state('createdAt')).toEqual(now);
        });


        test('Should set calendar focus on change',() => {
            const wrapper = shallow(<ExpenseForm />);
            wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true});
            expect(wrapper.state('calendarFocused')).toBe(true);
        });

Lecture 124 Testing AddExpensePage
    In this lecture we do a little refactoring to make the component more easily testable.

    We started with this....

        const AddExpensePage = (props) => (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={(expense)=> {
                        props.dispatch(addExpense(expense));
                        props.history.push('/');
                    }}
                />
            </div>
        );

        export default connect()(AddExpensePage);

    Changed to this...(Note: still not done)...

        const AddExpensePage = (props) => (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={(expense)=> {
                        props.addExpense(expense); //slightly shorter, easier to test
                        props.history.push('/');
                    }}
                />
            </div>
        );

        //We created this to connect on the 'addExpense' function below. When expense form hits the 'props.onSubmit' it come and run this section.

        const mapDispatchToProps = (dispatch) => ({
            addExpense: (expense) => dispatch(addExpense(expense))
        });

        //The first argument we don't need so we label it undefined and then we do use the 'mapDispatchToProps' for the second.

        export default connect(undefined, mapDispatchToProps)(AddExpensePage);

    To avoid inline functions and to make the code easier for refactoring and updating later we change the whole thing to a class based component. So it becomes this...

        //We add the 'export' to it so we can test it all by itself.
        export class AddExpensePage extends React.Component {
            //this is a method
            onSubmit = {
                (expense)=> {
                this.props.addExpense(expense);
                this.props.history.push('/');
            };

            //We call the method here.
            render() {
                return (
                    <div>
                        <h1>Add Expense</h1>
                        <ExpenseForm
                            onSubmit={this.onSubmit}
                        />
                    </div>
                );
            }
        }

        const mapDispatchToProps = (dispatch) => ({
            addExpense: (expense) => dispatch(addExpense(expense))
        });

        export default connect(undefined, mapDispatchToProps)(AddExpensePage);

    Now we write the test. We do a couple of new things in this test. I'll explain as we go.

        import React from 'react';
        import { shallow } from 'enzyme';
        import { AddExpensePage } from '../../components/AddExpensePage';
        import expenses from '../fixtures/expenses';

        //Here we declare three variables but do not set them
        let addExpense, history, wrapper;

        //Here we use the jest Global 'beforeEach()' function which will run the arrow function before each test that gets run. This is to keep us from re-writing this over and over when all tests need this.

        beforeEach(() => {
            addExpense = jest.fn();
            history = { push: jest.fn() };
            wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
        });

        //Then we write the tests as if we had already written the variable we need.
        test('Should render AddExpensePage correctly',() =>{
            expect(wrapper).toMatchSnapshot();
        });

        test('Should handle onSubmit',() => {
            //This finds and runs the onSubmit spy with data from the second expense in the fixtures data.
            wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
            expect(history.push).toHaveBeenLastCalledWith('/');
            expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
        });

    This was confusing for me and I think I understand about 70%.

Lecture 125 Testing EditExpensePage
    In this lecture we did a little refactoring. We changed "EditExpensePage" component to a class based component. We used "mapDispatchToProps".

    // Changed to class based and added "mapStateToProps".
        import React from 'react';
        import { connect } from 'react-redux';
        import ExpenseForm from './ExpenseForm';
        import { editExpense, removeExpense } from '../actions/expenses';

        export class EditExpensePage extends React.Component {

            onSubmit = (expense) => {
                this.props.editExpense(this.props.expense.id ,expense);
                this.props.history.push('/');
            };

            onRemove = () =>{
                this.props.removeExpense({id : this.props.expense.id });
                this.props.history.push('/');
            };

            render() {
                return (
                    <div>
                        <ExpenseForm
                            expense={this.props.expense}
                            onSubmit={this.onSubmit}
                        />
                        <button onClick={this.onRemove}>Remove</button>
                    </div>
                );
            }
        }

        //This gives our props access to the redux state.
        const mapStateToProps = (state, props) => ({
            expense: state.expenses.find((expense) => expense.id === props.match.params.id)
        });

        //This gives our props access to our action functions 'editExpense' and 'removeExpense'. It 'maps' the data to the function.
        const mapDispatchToProps = (dispatch, props) => ({
            editExpense: (id, expense) => dispatch(editExpense(id, expense)),
            removeExpense: (data) => dispatch(removeExpense(data))
        });

        //It's a second argument to 'connect'.
        export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

    Next we created the test file for the component in 'tests/components/EditExpensePage.test.js'. Then we imported the things we  would need and wrote our tests. We learned about the 'beforeEach(()=>{})' function in jest. Which is a function we can use to run a set of test code before each test is run. This is helpful when we are writting up multiple tests that will all need the exact same setup. We can write it once and then call it before each test. It looks like this...

        import React from 'react';
        import { shallow } from 'enzyme';
        import { EditExpensePage } from '../../components/EditExpensePage';
        import expenses from '../fixtures/expenses';

        let editExpense, removeExpense, history, wrapper;

        //This runs before each test.
        beforeEach(() => {
            editExpense = jest.fn();
            removeExpense = jest.fn();
            history = { push: jest.fn() };
            wrapper = shallow(
                <EditExpensePage
                    editExpense={editExpense}
                    removeExpense={removeExpense}
                    history={history}
                    expense={expenses[2]}
                />
            );
        });

        test('Should render to match snapshot',() => {
            expect(wrapper).toMatchSnapshot();
        });

        //Here we grab the wrapper(EditExpensePage component) and we find the ExpenseForm component and the onSubmit function and pass in the second expense for data. Then we write 2 cases of what we expected to get back.
        test('Should handle edit expense',() => {
            wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
            expect(history.push).toHaveBeenLastCalledWith('/');
            expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
        });

        test('Should handle remove expense',() => {
            wrapper.find('button').simulate('click');
            expect(history.push).toHaveBeenLastCalledWith('/');
            expect(removeExpense).toHaveBeenLastCalledWith({
                id: expenses[2].id
            });
        });

Lecture 126 Testing ExpenstListFilters
    In this lecture we go into 'ExpenstListFilters' and take out all the inline functions and make them into methods above and call them. We did that with these two, they are now methods...

        onTextChange = (e)=>{
        this.props.dispatch(setTextFilter(e.target.value));
        };

        onSortChange = (e)=>{
            if (e.target.value === 'date'){
                this.props.dispatch(sortByDate());
            } else if (e.target.value === 'amount') {
                this.props.dispatch(sortByAmount());
            }
        };

    Then we hooked up the 'mapDispatchToProps'. It takes in a 'dispatch' and implicitly returns an object. This is what we did...

        const mapDispatchToProps = (dispatch) => ({
            setTextFilter: (text) => dispatch(setTextFilter(text)),
            sortByDate: () => dispatch(sortByDate()),
            sortByAmount: () => dispatch(sortByAmount()),
            setStartDate: (startDate) => dispatch(setStartDate(startDate)),
            setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        });

        //Make sure to connect it as the second argument.
        export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

    Then we remove the .dispatch() used above.

        //Before...
        onTextChange = (e)=>{
        this.props.dispatch(setTextFilter(e.target.value));
        };

        //After...
        onTextChange = (e)=>{
        this.props.setTextFilter(e.target.value);
        };

    Now we are ready to write our tests.

        //typical imports...
        import React from 'react';
        import { shallow } from 'enzyme';
        import { ExpenseListFilters } from '../../components/ExpenseListFilters';
        import { filters, altFilters } from '../fixtures/filters';

        //assign variables
        let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

        //So when we assign each prop to a 'jest.fn'(spy) we are passing it down with the data and can tell us what happened. I don't entireley understand why this works though.
        beforeEach(() => {
            setTextFilter = jest.fn;
            sortByDate = jest.fn;
            sortByAmount = jest.fn;
            setStartDate = jest.fn;
            setEndDate = jest.fn;
            wrapper = shallow(
                <ExpenseListFilters
                    filters={filters}
                    setTextFilter={setTextFilter}
                    sortByDate={sortByDate}
                    sortByAmount={sortByAmount}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            )
        });

        test('Should render ExpenseListFilters correctly',() => {
            expect(wrapper).toMatchSnapshot();
        });

        //Here we learned a new enzyme method we can use called '.setProps()'. It allows us to set a prop or in this case simply override the one before so we can try using our alternate data filters.
        test('Should render ExpenseListFilters with alt data correctly',() => {
            wrapper.setProps({
                filters: altFilters
            });
            expect(wrapper).toMatchSnapshot();
        });

Lecture 127 Testing ExpenstListFilters: Part II
    In this lecture we wrote the rest of the test cases. Here are the ones I found tricky explained...

        //Because the default filter setting which is called 'filter' and imported from fixtures is set to 'sortByDate', we want to test that it changes to 'sortByDate', so we override with the 'altFilters' which is set to 'sortByAmount'.

        test('Should sort by date',() => {
            const value = 'date'; //what we want to filter by.

            //overriding to have default prop that passes down 'sortByAmount'.
            wrapper.setProps({
                filters: altFilters
            });

            //find the select element and simulate the change event and make it's target value 'value' which is 'date'.
            wrapper.find('select').simulate('change', {
                target: { value }
            });
            //Here we just expect that the correct function ran. The 'sortByDate' function.
            expect(sortByDate).toHaveBeenCalled();
        });

        //Here we want to trigger the onDatesChange handler and make sure that it works when passed new values. So we create two new dates and then grab the prop 'onDatesChange' and pass in the values and see if the functions 'setStartDate' and 'setEndDate' were called with the data we passed in.
        test('Should handle date change',() => {
            const startDate = moment(0).add(4, 'years');//set values
            const endDate = moment(0).add(8, 'years');

            //Grab the 'onDatesChange' prop and pass in the object it expects.
            wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });

            //We expect both start and end date functions to have been called with the data we assigned to them.
            expect(setStartDate).toHaveBeenLastCalledWith(startDate);
            expect(setEndDate).toHaveBeenLastCalledWith(endDate);
        });


        //This is to test the DateRangePicker onFocusChange. Which tells the state which date is being set. It can be 'startDate', 'endDate' or 'null'.
        test('Should handle date focus changes',() => {
            const calendarFocused = 'endDate';

            //find and grab onFocusChange and pass it the data. The var we created 'calendarFocused'.
            wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

            //We expect the 'calendarFocused' in the redux state to be changed to 'endDate'
            expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
        });

    //I should go through and rewatch this whole testing section. I understand after we do it but feel kinda blank when I have to think about doing it myself.

Lecture 128 Section Intro: Deploying Your Apps
    High level overview of what we will be doing. Nothing specific.

Lecture 129 Installing git
    Just installed git. I already had it installed.

Lecture 130 What is Git?
    A high level overview of what git does.

Lecture 131 Integrating Git into our Project
    In this lecture we go over basic command line git commands. We deleted a few lines in app.js that we didn't need to use as an example.

    Initializing the project with Git - go to the root of the project in the terminal. This initializes the project into git. Nothing will be tracked, it it just aware of the project from here up.
        $ git init

    To see what is going on with this project and git. Lets you see what is staged and not staged.
        $ git status

    Here is a good point to make the '.gitignore' file on the root and specify what you DO NOT want to track. Like 'node_modules'. If you do a git status now it will no longer see 'node_modules'.

    To add the files we want to track and stage for commit we simply use...
        //To add one file just add the file name.
        $ git add package.json
        //To add all the files from our root...
        $ git add .

    To commit everything that is 'staged' we use git commit and also trail it with our required message about this commit.
        $ git commit -m "Initial commit"

    Note to stage the README.md file on the root you need to use 'sudo'. It will require the password for the user of the computer.
        $ sudo git add ../README.md

    To see recent commits use git log.
        $ git log

Lecture 132 Setting up SSH and Github
    Documentation here - https://help.github.com/articles/connecting-to-github-with-ssh/
    In this lecture we log into our github account and we link our git repo to it. I already had this done so I am just along for the ride.
    'SSH' = Secure Shell. A safe way for two machines to communicate.

    Check to see if SSH is already set up.
        // 'ls' :list all the folders. '-a' :Show all the hidden folders as well. '~/.ssh' :tilda is short for user directory and were looking for the .ssh just one level up. If you see only '. ..' you don't have keys set up. If you see things like.. 'github_rsa github_rsa.pub' then you do. The '.pub' is the public key. Never share the other key. It is a password.

        $ ls -a ~/.ssh

    How to generate one if you don't have one.
        //This command generates the private and public keys.
        $ ssh-keygen -t rsa -b 4096 -C "aebrown9@gmail.com"
            //Breakdown
                ssh-keygen  :ssh key generation.
                -t :lets us specify the type.
                rsa :the type of key we are going to use.
                -b 4096 :bits, the size of the key the bigger the harder it is to hack. we are using the required 4096 bit size.
                -C "aebrown9@gmail.com" :short for comment followed but double quotes to put in your e-mail address. It's associated with the key pair.
        //Next we need to use ssh agent so github will know which key to use. to see if it's running run this weird command.
            $ eval "$(ssh-agent -s)"
        //if it is running you will get 'Agent pid 3753' .. the agent id.

        Next add the new key and add the path to the private key file.
            $ ssh-add ~/.ssh/github_rsa
        Then copy the contents of the public key and put it in github.
            To copy the contents of the public folder use this command...
                $ pbcopy < ~/.ssh/id_rsa.pub
        Then got to github.com then profile/settings/SSH and GPGkeys and click the 'New ssh key' button. Specify a name for the machine you are on and paste in the key.

        And now it is set up.

        Run a test command to see if it's all linked up. This will just check connection. You should see a welcome message.
            $ ssh -T git@github.com
                //The '-T' is to disable things we don't need

        next copy the github SSH address for your repo and then go to the command line and connect it by typing...
            $ git remote add origin *the ssh address from github*
        Now the local git repo knows there is a remote external repository.

        If you run
            $ git remote -v
            //This will tell you what the fetch and push addresses are for this repo on github.

        Now to push everything up to github for the first time we do...
            $ git push -u origin master
            //This is pushing up all our files to the master branch.
        The repo with all our files should be on github now.

Lecture 133 Production Webpack
    In this lecture we setup Webpack to have two build scripts. One is for development and the other is for production. The idea being we need on big file to map our code when we are developing and two files when we are sending to production. The production script bundles out the code that a developer would need it will only run if someone opens the dev tools otherwise the only the small code to run the app will be opened and ran. This give us great saving in terms of the total size of our app.

    So in package.json we added "build:dev" and "build:prod" ...

        ...
        "name": "expensify",
        "version": "1.0.0",
        "main": "index.js",
        "author": "Aaron Brown",
        "license": "MIT",
        "scripts": {
          "serve": "live-server public/",
          "build:dev": "webpack",
          "build:prod": "webpack -p --env production",
          "dev-server": "webpack-dev-server",
          "test": "jest --config=jest.config.json"
        },
        ...
        // the '-p' is the webpack command to build for production mode. It minifies our code and signals 3rd party libraries to build for production as well.
        // '--env production' means set 'env to "production"' We created this hook so when we run 'build:prod' we can make some tweaks to how it's put together.

    Next in 'webpack.config' we changed the 'module.exports' to return a function that returns an object. Before it just returned an object. By doing this we are able to run some logic and pass in a variable.

        module.exports = (env) => {
            // Set 'isProduction' to true or false depending on weather or not env is equal to the string 'production'. This is the hook we set up.
            const isProduction = env === 'production';

            return {
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
                    }, {
                        test: /\.(sass|css)$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'sass-loader'
                        ]
                    }]
                },

                //Here is where we use the slow code if we are launching production and then fast code if for development. 'source-map' runs slower.

                devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
                devServer: {
                    contentBase: path.join(__ dirname, 'public'),
                    historyApiFallback: true
                }
            };
        };

Lecture 134 Creating Separate CSS Files
    In this lecture we configure webpack to give us seperate css files outside of the bundle. This saves us time. When CSS is inside the bundle that means all the JavaScript has to run before the css can get compiled by the browser.

    We install a webpack plugin called 'extract-text-webpack-plugin'. docs here...
    https://github.com/webpack-contrib/extract-text-webpack-plugin/releases

    $ yarn add extract-text-webpack-plugin

    We import the plugin to the webpack.config.js...

        //this imports the webpack plugin 'extract-text-webpack-plugin' with node there isn't an import command but a 'require()' function.
        const ExtractTextPlugin = require('extract-text-webpack-plugin');

        module.exports = (env) => {
            const isProduction = env === 'production';

        //This creates a new instance of the 'extract-text-webpack-plugin' and we pass in what we want the file to be named.
            const CSSExtract = new ExtractTextPlugin('styles.css');

            return {
                entry: './src/app.js',
                output: {
                    path: path.join(__ dirname, 'public'),
                    filename: 'bundle.js'
                },
            ...

    We change this...
        }, {
            test: /\.(sass|css)$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }

    To this...
        }, {
                test: /\.(sass|css)$/,
                use: CSSExtract.extract({
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }]
        },
        plugins: [  //This part is new.
            CSSExtract
        ],

    Now it should create a seperate css file when we run $ yarn run build:prod.

    Next we want to have css maping in production so we do the following.

    change the dev-tool in webpack.config to...

        devtool: isProduction ? 'source-map' : 'inline-source-map',
        //The inline-source-map is a tad slower but more useful.

    Then we change our 'use:' array to to return objects of the the 'css-loader' and 'sass-loader' so we can specify options...

        use: CSSExtract.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true //By default sourceMap is false. We are switching that.
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        })

    Now when we use the dev tools style selector it tells us where in our files the location is not the location in the compressed file.

Lecture 125 A Production Web Server with Express
    In this lecture we learned a tiny bit about express.js and made an express server. Note... I need to learn more about this.

    We installed express in the project...
        $ yarn add express

    We created on the root of the app 'server/server.js'. In server.js we wrote... (Note: added a space after '__ ' and '* ' for commenting purposes only)

        const path = require('path'); //Imports in the path.
        const express = require('express');//Imports express
        const app = express();  //Creates instance of express application.
        const publicPath = path.join(__ dirname, '..', 'public'); //creates the path for our app in which we go down a level and into the public folder.

        app.use(express.static(publicPath)); //Here is where we tell it to use the public directory to create our static assets.

        //req = request res=response
        app.get('* ', (req, res) => {
            res.sendFile(path.join(publicPath, 'index.html'));
        }); //Above says if you can't find what was requested in the public folder then return 'index.html'. Which will make the path correct.

        app.listen(3000,() => {
            console.log('Express server is up.');
        }); //Here we tell express server to launch on port 3000.

    We don't go very in depth in this lecture, should do more research.

Lecture 136 Deploying with Heroku
    Note: we use Heroku almost exclusivley through command line.
    In this lecture I signed up for Heroku and then downloaded the 'Heroku cli' for MacOS from https://devcenter.heroku.com/articles/heroku-cli#macos

    We check to make sure it's there...
        $ heroku --version
        //Should show a version

    To login to heroku via the command line...
        $ heroku login
        //Then follow prompts for e-mail and pw.

    Now we can start to launch our app with heroku. We can just run...
        $ heroku create
        //In this case heroku will generate a random name.
        $ heroku create react-expensify-app-aebrown9
        //This command created the application and ALSO creates another git remote to the locat repository. So now if we run '$ git remote'. We see 'origin' which we created and 'heroku'. NOTE: I did NOT see this but it did give me the two ...
            https://react-expensify-app-aebrown9.herokuapp.com/
            https://git.heroku.com/react-expensify-app-aebrown9.git
        So I'm going to keep plugging along.

    Next we update 'package.json'. Heroku will run through this and here we can instruct it to go to the server and run it.

        ...
        "scripts": {
          "serve": "live-server public/",
          "build:dev": "webpack",
          "build:prod": "webpack -p --env production",
          "dev-server": "webpack-dev-server",
          "test": "jest --config=jest.config.json",
          "start": "node server/server.js" //We add this line. telling heroku to run this node command.
        },...

    We also update our express server.js file. We added 'port' and then call it as the first argument in the 'listen()' funciton.

        const path = require('path');
        const express = require('express');
        const app = express();
        const publicPath = path.join(__ dirname, '..', 'public');
        const port = process.env.PORT || 3000;
        //The port location provided by Heroku. if not found then use port 3000.

        app.use(express.static(publicPath));

        //req = request res=response
        app.get('* ', (req, res) => {
            res.sendFile(path.join(publicPath, 'index.html'));
        });

        app.listen(port,() => {
            console.log('Express server is up.');
        });

    Now our express server is compatible for heroku.

    Next we teach heroku how to run webpack by including one more script in package.json.
        ...
        "scripts": {
          "serve": "live-server public/",
          "build:dev": "webpack",
          "build:prod": "webpack -p --env production",
          "dev-server": "webpack-dev-server",
          "test": "jest --config=jest.config.json",
          "start": "node server/server.js",
          "heroku-postbuild":"yarn run build:prod" //This line.
        },
        ...

    AND we need to add the files produced when we do the 'build:prod' to 'gitignore' so it's not added to the repo. It will be compiled each time it's pushed up to the heroku server.

        public/bundle.js
        public/bundle.js.map
        public/styles.css
        public/styles.css.map

BRANCH - Here I had to create a new branch that had expensify app at the root so Heroku could have JUST the expensify app. The branch name is 'expensify-app-branch'.

    So to push to Heroku I did...

        $ git push heroku expensify-app-branch
        Which created the branch remotely on Heroku but did not runt the app.

    So I had to do...
        $ git push heroku expensify-app-branch:master
        //This says push the expensify-app-branch to the master on heroku.

    This built the app on heroku and at the end of the process it spits out a url that you can see the app on. It's ...
        https://react-expensify-app-aebrown9.herokuapp.com

    You can also open the site in your browser from the terminal by using the heroku command...
        $ heroku open

    If there are errors we can run...
        $ heroku log
        //this will show us where the problem might have come from.

Lecture 137 Regular vs Development Dependencies
    In this lecture we learn how to install something as a dev dependency. So Heroku won't install things it doesn't actually need.
    We installed 'Chalk' we don't use it we just installed it as an example then deleted it. add the '--dev' to make it a dev dependency.
        $ yarn add chalk --dev
        //This says to install chalk but intall it as a dev dependency.

    Next we did a little re-organizing. making the test dependencies dev dependencies.
        //We took thses from dependencies and put them down here.
        "devDependencies": {
          "enzyme": "3.2.0",
          "enzyme-adapter-react-16": "1.0.0",
          "enzyme-to-json": "3.2.2",
          "jest": "21.2.1",
          "react-test-renderer": "16.2.0",
          "webpack-dev-server": "2.5.1"
        }

    Next we created a dist folder in public to clean things up and changed file paths so that the dist folder would be where all the output will go.
        We updated the index.html page to with the path 'dist/bundle.js' and 'dist/styles.css'.

    in the 'webpack.config.js' we updated the output to have a 3rd argument where we add on 'dist'.

        output: {
            path: path.join(__ dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },

    at the bottom on the same file we added " publicPath: '/dist/' " which makes dist the root for the dev server.

        devServer: {
            contentBase: path.join(__ dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }

    Then we deleted the four assets in public...
        public/bundle.js
        public/bundle.js.map
        public/styles.css
        public/styles.css.map

    Then we ran the dev Server
        $ yarn run dev-server
        //This worked and does NOT create the files but serves them directly to the browser. (localhost:8080)

    Then we built the app by running
        $ yarn run build:prod
        //This built the app for production and created the files in dist.

    Then we ran the node express server by running
        $ yarn start
        //this runs the node server.

    Everything worked so we saved and then uploaded the updates to github and heroku.

    $ git push heroku expensify-app-branch:master

Lecture 138 New Feature Workflow
    In this lecture we update and make changes to 'ExpenseListItem' component and learn how to make the changes and deploy them.

    We imported moment.js and numeral.js. Numeral is similar to moment and helps us format our numbers.

        import React from 'react';
        import { Link } from 'react-router-dom';
        import moment from 'moment';
        import numeral from 'numeral';



        const ExpenseListItem = ({ id, description, amount, createdAt }) =>(
            <div>
                <Link to={`/edit/${id}`}>
                    <h3>{description}</h3>
                </Link>
                <p> //Here is where we reformatted.
                    {numeral(amount/100).format('$0,0.00')}
                     -
                    {moment(createdAt).format('MMMM Do, YYYY')}
                </p>
            </div>
        );

        export default ExpenseListItem;

    When we changed the formatting we kept the test suite running to update the changes. We also opened another terminal tab to run the dev server.

    For test suite...
        $ yarn test -- --watch
    for dev server...
        $ yarn run dev-server

    We did have to install numeral.js (http://numeraljs.com/#format).
        $ yarn add numeral

    after we updated the tests and confirmed the formatting worked in the browser via dev-server we saved and uploaded to github. Then we uploaded to heroku.

    In my case...
        $ git push heroku expensify-app-branch:master

    Everything worked.

    There was an issue uploading to Heroku but that was an error on their side. Was not able to upload.

Lecture 139 Adding Total Selector
    In this lecture we add a selector function called expenses-total.js and we created a test for it as well, expenses-total.test.js.

    I got super hung up on '.reduce()', it didn't make sense to me. But we created both files.
        src/selectors/expenses-total.js
        src/tests/components/expenses-total.test.js

    Then we wrote our tests first.
        // We would need both of these imported.
        import getExpenseTotal from '../../selectors/expenses-total';
        import expenses from '../fixtures/expenses';


        test('Should return 0 if no expenses',() =>{
            const response = getExpenseTotal([]);
            expect(response).toBe(0);
        });

        test('Should correctly add up a single expense',() =>{
            const response = getExpenseTotal([expenses[0]]);
            expect(response).toBe(195);
        });

        test('Should correctly add up all expenses',() =>{
            const response = getExpenseTotal(expenses);
            expect(response).toBe(114195);
        });

    Then we wrote our function in src/selectors/expenses-total.js

        export default (expenses) => {
            if (expenses.length === 0 ){
                return 0
            } else {
                return expenses
                    .map((expense) => expense.amount) //this implicitly returns just the numbers of the 'amount' in each object. Then we connect it by adding '.reduce()'.
                    .reduce((sum, value) => sum + value, 0);
                    //reduce takes two arguments the first is a function...
                        (sum, value) => sum + value
                    And the second is the value to start off with...
                        0
            }
        };

    Then we refactored it to be this and we know everything is ok because all our tests pass.

        return expenses
            .map((expense) => expense.amount)
            .reduce((sum, value) => sum + value, 0);

Lecture 140 Build it: Adding Summary Component
    In this lecture we added a line above the "<ExpenseListFilters />" on the 'ExpenseDashboardPage'. We created a new component called 'ExpensesSummary.js' that adds the line "Viewing 0 expenses totalling $0.00"

    First I created the component and put in some dummy text to see if it was working. I did get it to work on my own but I am going to outline the order Andrew did it here.

    Next we created the test component. tests/components/ExpensesSummary.test.js.
    Ideally tests should be written first then they should pass as we build the component.

        //import the things we KNOW we're going to need. ExpensesSummary needs to be in '{ }' or we are not importing the component directly.
        import React from 'react';
        import { shallow } from 'enzyme';
        import { ExpensesSummary } from '../../components/ExpensesSummary';
        import expenses from '../fixtures/expenses';

        //Here we decide we want to pass in two props of numbers as objects.
        test('Should render ExpensesSummary correctly with 1 expense',() =>{
            const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>);
            expect(wrapper).toMatchSnapshot();
        });

        test('Should render ExpensesSummary correctly with multiple expenses',() =>{
            const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={2352345234}/>);
            expect(wrapper).toMatchSnapshot();
        });
    //This part is still difficult for my mind to wrap around when thinking about it from square one.

    Next we went to our component...

    //import things we'll need...
        import React from 'react';
        import { connect } from 'react-redux';
        import numeral from 'numeral';
        import selectExpenses from '../selectors/expenses';
    //We used this on the ExpenseList.js page to bring in filtered results.
        import selectExpenseTotal from '../selectors/expenses-total';
    //The function we just created.

        export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
            const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
        //The value of the word 'expense' depending on the value viewing.
            const formattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00')

            return (
                <div>
                    <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
                </div>
            );
        };


        const mapStateToProps = (state)=> { //this is a function we make to define what we want to bring in from the store so we can manipulate it and use it for our needs in this component.
            const visibleExpenses = selectExpenses(state.expenses, state.filters);

            return {
                expenseCount: visibleExpenses.length,
                expensesTotal: selectExpenseTotal(visibleExpenses)
            };
        };

        export default connect(mapStateToProps)(ExpensesSummary);//Here we use a built in react-redux HOC component that connects our store with OUR component.

    The end of the section

Lecture 141 Intro to Firebase.
    Firebase is a database solution created by Google. It also helps with authorization. We are going to focus on all the CRUD operations. Later we will explore authorization.

Lecture 142 Getting Firebase
    In this lecture we remove the authentication from our database so we can read and write to it without authenticating. We set the rules read and write to true Then we use npm to bring in a firebase library. And then add in the config information provided to a new folder and file we created in 'src' -> 'firebase/firebase.js'. Inside that file we wrote ...
        import * as firebase from 'firebase';
        //Which says bring in everything from firebase and store it on a variable named firebase.
    Then we copied our password config information from firebase and pasted it below.
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyDAWxyEfaRUGL3wPZhiC7iW3tWa6sKysqg",
            authDomain: "expensify-b91ca.firebaseapp.com",
            databaseURL: "https://expensify-b91ca.firebaseio.com",
            projectId: "expensify-b91ca",
            storageBucket: "expensify-b91ca.appspot.com",
            messagingSenderId: "736882551504"
        };
        This is essentially our password to get into our database.

    Then we wrote...
        firebase.initializeApp(config);
        //This is what runs firebase when called.

        firebase.database().ref().set({
            name: 'Aaron Brown'
        });
        //Here we use firebase tools they give us, this line tells it to go to the db and .ref() we don't pass anything which is the root of our db and we use set() and pass in an object with a key-value pair to add in.
    At this point nothing is calling our firebase.js file so we work around that by going to the app.js and importing this file.
        import './firebase/firebase';
        //We just tag this on the end of the import list

    Now when we go to the terminal and run the dev-server it should put the js object in our db.

Lecture 143 writing to the database
    In this lecture we're learning how we use firebase. firebase has lots of features besides a db so to let it know who we are talking to we will always get to the db by writing 'firebase.database()'. to make it simpler we did throw that in a variable 'const database = firebase.database();'

        firebase.initializeApp(config);

        database.ref().set({ //this is less typing and simpler.
            name: 'Aaron Brown',
            age: 35,
            isSingle: false,
            location: {
                city: 'Seattle',
                country: 'United states of America'
            }
        });
        //firebase can handle any datatype.

    ".ref()" is short for reference and it is for getting us to a certain part of our database. Similar to getting to a table in a sql database. So we could reference "users" "products" etc. If we don't pass in anything then it keeps us on the root.

    ".set()" can be called on a reference and it sets the value on that reference. You do not have to pass in an object you can also just pass in a string.
        database.ref().set('This is my data');
        // this erases the object and just puts the string in the db.
    If to upadate a part of our object we...
        database.ref('age').set(37);
        //this will just update the age of my object.
    If we want to update somthing that isn't on the root level like city, this is how we update it.
        database.ref('location/city').set('Portland');
        // we use a '/' to burrow down.

Lecture 144 ES6 Promises
    In this lecture we went to a test area to see how promises work. Promises are just a way to sync up our asynchronous operation. We sent out a request, once it's done then do this with it when its back. we create a dummy promise that waits 5 seconds then runs to play with it.

    This is a promise. A promise has 3 states. They are:
        Promise is pending: You don't know yet.

        Promise is resolved: it succeeded.

        Promise is rejected: It failed.
    You can only call one 'resolve' or 'reject' per promise.

    in each resolve() you can only pass in one argument. If you need more info than just the one argument you can pass in an js object.

        const promise = new Promise((resolve,reject) => {
            setTimeout(()=>{
                resolve({ //like this...
                    name: 'Aaron',
                    age: 35
                });
            }, 5000);
        });

        promise.then((data) => {
            console.log(data);
        });

    To use the reject we need to add it on to the '.then()' and call '.catch()'.
        const promise = new Promise((resolve,reject) => {
            setTimeout(()=>{
            //     resolve({
            //         name: 'Aaron',
            //         age: 35
            //     });
            reject('something went wrong');
            }, 5000);
        });

        promise.then((data) => {
            console.log(data);
        }).catch((error)=>{     //like HERE.
            console.log('error: ', error);
        });
    If we dont do this then the browser will throw an error saying a reject was created but wasn't called. With this syntax it will only be called if there is an error. 'catch' and 'then' take a function as its arguement.

    it is possible to pass in two function arguements into '.then()' if that is done then the second function acts as a catch. This is not as clear to read as '.then().catch()'.

    NOTE: most of the time we don't create promises, they are already created by the library we are using. We just call on them and use them.

    ** we also deleted the playground/promise.js import from our app once we finished.

    
