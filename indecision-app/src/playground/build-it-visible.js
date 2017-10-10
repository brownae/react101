class VisibilityToggle extends React.Component{
    constructor(props){
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            toggle : false
        };
    }

    handleToggleVisibility(){
        this.setState((prevState) => {
            return {
                toggle : !prevState.toggle
            };
        });

    }

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

// let toggle = false;
//
//
// let toggler = () => {
//     toggle = !toggle;
//     render();
//     console.log('End ');
// };
//
// const render = () => {
//     const template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//
//             <button onClick={toggler}>{toggle ? 'Hide Details' : 'Show Details'}</button>
//             {toggle && <p>Some details about things</p>}
//         </div>
//     );
//     ReactDOM.render(template, document.getElementById('app'));
// };
//
// render();
