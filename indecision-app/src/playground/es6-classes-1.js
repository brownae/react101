class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting(){
        //return 'Hi! I am '+ this.name;
        return `Hi I am ${this.name}!`;
    }

    getDescription(){
        return `${this.name} is ${this.age} years old.`;
    }
}

class Student extends Person {
    constructor(name,age,major){
        super(name,age);
        this.major = major;
    }

    hasMajor(){
        return !!this.major
    }

    getDescription(){
        let description = super.getDescription();

        if (this.hasMajor()){
            description += ` Their major is ${this.major},`;
        }

        return description;
    }
}

class Traveler extends Person {
    constructor(name,age,homeLocation){
        super(name,age);//super means get from parent
        this.homeLocation = homeLocation;
    }

    getDescription(){
        let greeting = super.getGreeting();

        if (this.homeLocation){
            greeting += ` I'm visiting from ${this.homeLocation}.`;
        }

        return greeting;
    }

}

const me = new Traveler('Aaron', 34,'Seattle, Wa');
console.log(me.getDescription());

const kid = new Traveler(undefined,undefined,'Nowhere');
console.log(kid.getDescription());
