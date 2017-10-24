import React from 'react';

const PortfolioProjectPage = (props) => {
    console.log(props);
    return (
        <div>
            <h1>Project numeber {props.match.params.id}</h1>
            <p>Check out this amazing project!</p>
        </div>
    );
};

export default PortfolioProjectPage;
