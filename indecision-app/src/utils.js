console.log('Utils.js is running!');

const square = (x) => x * x;
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;

export { square, add, subtract as default }; // this is for passing in various things we want to export.
// exports - 1. default export 2. named exports
