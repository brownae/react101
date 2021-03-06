class Counter extends React.Component {
    constructor(props){ // constructor method
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        };
    };

    componentWillMount(){
        try {
            const count = parseInt(localStorage.getItem('count'));
            console.log('Will mount');
            if (!isNaN(count)){
                this.setState(()=>({ count: count}));
            }
        } catch (e) {
            //if JSON data is not valid then it will do nothing.
        }

    }

    componentDidUpdate(prevProp, prevState){
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

    handleMinusOne(){ //Method
        this.setState((prevState) =>{
            return {
                count : prevState.count - 1
            }
        });
    }

    handleReset(){ //Method
        this.setState(()=>{
            return {
                count : 0
            }
        });
    }

    render(){ //RENDER Method
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }

}

ReactDOM.render(<Counter />, document.getElementById('app')); // render the virtual dom on the document in the element with an ID of app.

// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp();
// };
// const minusOne = () => {
//     count--;
//     renderCounterApp();
// };
// const reset = () => {
//     count = 0;
//     renderCounterApp();
// };
//
//
//
// const renderCounterApp = () => {
//
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>Reset</button>
//         </div>
//     );
//
//     ReactDOM.render(templateTwo, appRoot);
// };
//
// renderCounterApp();
