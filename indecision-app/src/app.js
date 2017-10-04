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

class Action extends React.Component{
    render(){
        return (
            <div>
                <button>What should I do?</button>
            </div>
        );
    }
}

//options Component
class Options extends React.Component{
    render(){
        return (
            <ol>
                <li>Option 1</li>
            </ol>
        );
    }
}

// addOption Component
class AddOption extends React.Component{
    render(){
        return (
            <form>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        );
    }
}

const jsx = (
    <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
    </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
