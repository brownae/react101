'use strict';

//arguments object - no longer bound with arrow function
// the object arguments can see ALL arguments passed to it. This goes away with arrow function.

// const add = function(a,b){
//     console.log(arguments);
//     return a+b;
// };

// const add = (a,b) => { // throws error
//     console.log(arguments);
//     return a+b;
// };

// console.log(add(55,1,1001));

//this keyword - no longer bound with arrow function
// If you want to use a "this" use the es5 syntax. with arrow functions the "this" keyword looks to it's parent to define the "this". Which can be bad in some cases.

// .map() as oppsed to .forEach()... .map() allows to loop through array and add in a function that can change the array as it goes, resaved with updated values.

var user = {
    name: 'Aaron',
    cities: ['Seattle', 'Dubai', 'New York'],
    printPlacesLived: function printPlacesLived() {
        var _this = this;

        return this.cities.map(function (city) {
            return _this.name + ' has lived in ' + city;
        });

        console.log(this.name);
        console.log(this.cities);

        this.cities.forEach(function (city) {
            console.log(_this.name + ' has lived in ' + city);
        });
    }
};

console.log(user.printPlacesLived());

var multiplier = {
    //array of numbers
    numbers: [10, 20, 30],
    multiplyBy: 2,
    //multiply method
    multiply: function multiply() {
        var _this2 = this;

        return this.numbers.map(function (number) {
            return _this2.multiplyBy * number;
        });
    }
};
console.log(multiplier.multiply());
