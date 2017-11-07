import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: { props.info }</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => ( //this is the HOC
        <div>
            { props.isAdmin && <p>This content is confidential. Please don't share</p> }
            <WrappedComponent {...props} />
        </div>
    );
};

//require authentication
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? (<Info {...props}/>) : (<p>Must login to see info.</p>) }
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));
