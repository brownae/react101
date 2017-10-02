//Traditional function
function square(x){
    return x * x;
};

//arrow function. Note ALL arrow functions are anonymous, you have to assign like here.
// const squareArrow = (x) => {
//     return x * x;
// }

//another shorthand syntax. Good only returning only one thing
const squareArrow = (x) => x * x;

console.log(square(8));
console.log(squareArrow(8));

// Challenge Use arrow function
const name = 'Joe Smoe';
//Regular arrow function
// const getFirstName = (x) => {
//     return x.split(' ')[0];
// }

//shorthand arrow function
const getFirstName = (x) => x.split(' ')[0];


console.log(getFirstName(name));
