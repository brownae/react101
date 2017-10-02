// Exercise for understanding var let and const
//var can be reassigned as many times as you want
var nameVar = 'Aaron';
var nameVar = 'Mike';
console.log('nameVar', nameVar);

//let can be reassigned but cannot be redefined on same scope level
let nameLet = 'Jen';
nameLet = 'Julie';
console.log('nameLet', nameLet);

// const cannot be reassigned or redefined on same scope level
const nameConst = 'frank';
// nameConst = 'Gunther';
console.log('nameConst', nameConst);

// Block scoping

const fullName = 'Aaron Brown';
let firstName;

if (fullName){
    firstName = fullName.split(' ')[0];
    console.log(firstName);
}
console.log(firstName);
