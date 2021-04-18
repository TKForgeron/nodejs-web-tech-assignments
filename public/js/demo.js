// This is just a demo piece of code, used at example.html. It is not structured in a particular way.
class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
    age(x) {
        return x - this.year;
    }
}

let date = new Date();
let year = date.getFullYear();

let myCar = new Car("Ford", 2014);
let yourCar = new Car("Audi", 2020);
document.getElementById("demo").innerHTML =
    "My car is " + myCar.age(year) + " years old, yours is " + yourCar.age(year) + " years old.";