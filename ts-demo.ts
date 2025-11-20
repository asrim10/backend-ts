let message: string = "Hello";
console.log(message);

message = "ASUR";
console.log(message);

// Primitive Types

let booleanVar: boolean = true;
let numberVae: number = 42;
let symbolVar: symbol = Symbol("unique");
let nullVar: null = null;
let undefinedVar: undefined = undefined;

let anyVar: any = "Could be anything";
anyVar = anyVar + 100; // No error

let unknownVar: unknown = "Could be anything too";
// unknownVar = unknownVar + 100; // Error
// unknown is type assertion

let scores: number[] = [90, 80, 70];
console.log(scores);

// tuples
let tupleVar: [string, number] = ["Alice", 30];
console.log(tupleVar);
// tupleVar = [30,"Alice"] // Error

// Union
let id: string | number | number;
id = "Hello";
console.log(id);
id = 123;
console.log(id);

// id = true // err

// functions

function add(num1: number, num2: number): string {
  let sum: number = num1 + num2;
  return `Sum is ${sum}`;
}
let result: string = add(10, 20);
console.log(result);

const greet = (name: string = "Guest"): void => {
  console.log(`Hello,${name}`);
};

greet();

// Object Definition
// 1. Object Literal
let person: { name: String; age: number } = {
  name: "Bob",
  age: 25,
  // isActive: true //error
};

console.log(person, person.name);

// 2. Interface
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; //optional
}

const laptop: Product = {
  id: 1,
  name: "Laptop",
  price: 1500,
};

console.log(laptop);

// 3. Type Alias

type Student = {
  id: number;
  name: string;
  grade: string;
  product?: Product;
};

let student1: Student = {
  id: 101,
  name: "Charlie",
  grade: "A",
  product: laptop,
};
console.log(student1);

// Generics
function identity<T>(arg: T): T {
  return arg;
}

// Data type injected at call time
let output1: string = identity<string>("myString");
console.log(output1);
let output2: number = identity<number>(100);
console.log(output2);

// enum
// named constant
enum Role {
  Admin,
  User,
  Guest,
}

let userRole: Role = Role.Admin;
console.log(userRole); // 0
console.log(userRole == Role.Admin); // constant check

let userRoleName: string = "admin";
console.log(userRoleName == "Admin"); // case sensitive check

// Generic Usecase
interface User {
  id: number;
  name: string;
  role: Role;
}

let optUser: Partial<User> = {
  name: "Dave",
};

// every attribute is optional
console.log(optUser);
let readonlyUser: Readonly<User> = {
  id: 1,
  name: "Eve",
  role: Role.User,
};

// readonlyUser.id = 2; // Error
console.log(readonlyUser);

enum CarType {
  Sedan,
  SUV,
  Truck,
  Coupe,
}

type CarModel = {
  name: string;
  description: string;
};

interface Car {
  make: string | number;
  model: CarModel;
  year: number;
  type: CarType;
  isElectric?: boolean | number | string;
}

let cars: Car[] = [
  {
    make: "Alto",
    model: {
      name: "Alto",
      description: "Desc",
    },
    year: 2000,
    type: CarType.SUV,
  },
  {
    make: "Benz",
    model: {
      name: "Benz",
      description: "Desc",
    },
    year: 2020,
    type: CarType.SUV,
  },
  {
    make: "Maruti",
    model: {
      name: "Maruti",
      description: "Desc",
    },
    year: 2025,
    type: CarType.SUV,
  },
];

const carsolderthan2015: Car[] = cars.filter((car) => car.year < 2015);
console.log(carsolderthan2015);
