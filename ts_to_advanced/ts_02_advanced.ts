// ==========================================
// TYPESCRIPT 02: ADVANCED CONCEPTS
// ==========================================
// This file dives into Object-Oriented Programming (OOP),
// Generics, and more complex type narrowing mechanisms.

// ------------------------------------------
// 1. CLASSES
// ------------------------------------------
// TypeScript adds access modifiers and explicit property declarations to ES6 Classes.

class Employee {
    // Access Modifiers control visibility:
    // public: (default) Accessible from anywhere.
    // private: Accessible ONLY within this class itself.
    // protected: Accessible within this class AND its subclasses.

    public name: string;
    private salary: number;
    protected department: string;

    // readonly properties can only be assigned during initialization or in the constructor.
    readonly id: number;

    constructor(name: string, salary: number, department: string, id: number) {
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.id = id;
    }

    // Encapsulation: Using methods to access private data
    getSalary(): number {
        return this.salary;
    }

    setSalary(newSalary: number): void {
        if (newSalary > 0) {
            this.salary = newSalary;
        }
    }
}

// Inheritance: Subclasses inheriting from a Parent class
class Manager extends Employee {
    public teamSize: number;

    constructor(name: string, salary: number, department: string, id: number, teamSize: number) {
        super(name, salary, department, id); // 'super' calls the parent's constructor
        this.teamSize = teamSize;
    }

    public getDepartmentInfo(): string {
        // Can access 'department' because it was marked 'protected' in the parent class
        return `Manager of ${this.department}`;
    }
}

// Abstract Classes
// Classes that cannot be instantiated directly. They serve as blueprints for other classes.
abstract class Shape {
    abstract getArea(): number; // Subclasses MUST implement this method

    printInfo(): void {
        console.log(`Area is: ${this.getArea()}`);
    }
}

class Circle extends Shape {
    // Parameter properties: shorthand to declare and assign properties in the constructor
    constructor(private radius: number) { super(); }

    getArea(): number { return Math.PI * this.radius * this.radius; }
}


// ------------------------------------------
// 2. INTERFACES (Advanced)
// ------------------------------------------

// Extending Interfaces (Inheritance for interfaces)
interface Animal {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}
const myDog: Dog = { name: "Rex", breed: "German Shepherd" };

// Interface Declaration Merging
// If you declare the same interface twice, TS automatically merges them together.
interface Window { title: string; }
interface Window { width: number; }
// A variable of type Window must now have BOTH 'title' and 'width'.


// ------------------------------------------
// 3. GENERICS (Crucial for LeetCode)
// ------------------------------------------
// Generics allow you to create reusable components that work with a variety of types
// without sacrificing type safety.

// Generic Function
// <T> is a type variable. It captures the type provided by the user.
function reverseArray<T>(items: T[]): T[] {
    return items.reverse();
}
let numberArray = reverseArray<number>([1, 2, 3]); // Type is explicitly number[]
let stringArray = reverseArray(["a", "b", "c"]); // TS infers type is string[]

// Generic Interfaces (Common for Linked Lists, Trees, etc.)
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
let month: KeyValuePair<number, string> = { key: 1, value: "January" };

// Generic Classes
class Stack<T> {
    private items: T[] = [];
    push(item: T) { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
}
let numStack = new Stack<number>();
numStack.push(10); // Type safe!

// Generic Constraints
// You can restrict what types can be passed to a generic type variable using 'extends'.
interface HasLength {
    length: number;
}
function printLength<T extends HasLength>(arg: T): void {
    console.log(arg.length); // Safe because we guaranteed T has a 'length' property
}
printLength("Hello"); // OK (strings have length)
printLength([1, 2, 3]); // OK (arrays have length)
// printLength(10); // Error! Numbers don't have a length property.


// ------------------------------------------
// 4. UNION AND INTERSECTION TYPES
// ------------------------------------------

// Union (|): A value can be one of several types. Think of it as "OR".
function formatCommandline(command: string | string[]) {
    // We must narrow the type before using specific methods
    if (typeof command === "string") {
        return command.trim(); // TS knows command is a string here
    } else {
        return command.join(" "); // TS knows command is an array here
    }
}

// Intersection (&): Combines multiple types into one. Think of it as "AND".
interface Draggable { drag(): void; }
interface Resizable { resize(): void; }
type UIWidget = Draggable & Resizable; // Must implement BOTH drag() and resize()


// ------------------------------------------
// 5. LITERAL TYPES
// ------------------------------------------
// Allowing a string or number to take an exact, specific value.
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
function fetchAPI(url: string, method: HTTPMethod) { /* ... */ }
// fetchAPI("/users", "PATCH"); // Error! "PATCH" is not a valid HTTPMethod.


// ------------------------------------------
// 6. TYPE GUARDS AND ASSERTIONS
// ------------------------------------------

// Type Assertions (Casting): Telling TS "I know better than you, trust me."
// Use 'as' keyword (preferred in React/JSX environments)
let someElement = document.getElementById("myCanvas") as HTMLCanvasElement;

// Custom Type Guards (Predicates)
// A function that returns a boolean, with a special return type `parameterName is Type`.
function isString(val: any): val is string {
    return typeof val === "string";
}

function processValue(val: string | number) {
    if (isString(val)) {
        // Here, TS knows 'val' is definitely a string
        console.log(val.toUpperCase());
    } else {
        // Here, TS knows 'val' is definitely a number
        console.log(val.toFixed(2));
    }
}


// Make this file a module to avoid global scope pollution
export {};

