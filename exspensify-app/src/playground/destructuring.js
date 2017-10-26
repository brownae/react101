//
// const person = {
//     name: 'Aaron',
//     age: 33,
//     location: {
//         city: 'Seattle',
//         temp: 55
//     }
// };
//
// const {name = 'Anonymous', age} = person;
// cosnt name = person.name;
// cosnt age = person.age;

// console.log(`${name} is ${age}.`);
//
// const {city, temp: temperature = 'Unkown'} = person.location;
//
// if (city && temperature){
//     console.log(`It's ${temperature} in ${city}.`);
// }
// if (person.location.city && person.location.temp){
//     console.log(`It's ${person.location.temp} in ${person.location.city}.`);
// }

const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(publisherName);
