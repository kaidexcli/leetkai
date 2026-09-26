// ==========================================
// TYPESCRIPT 01: FUNDAMENTALS
// ==========================================
// This file covers the core building blocks of TypeScript.
// Read through the explanations and experiment with the code.
// TypeScript is a superset of JavaScript that adds static typing.

// NOTE: THE BROKEN UNDERLINE DOES NOT INDICATE ERROR, IT MEANS THAT VARIABLE IS
// DECLARED BUT NEVER USED

// ------------------------------------------
// 1. BASIC PRIMITIVE TYPES
// ------------------------------------------
// By explicitly declaring types, the compiler can catch errors before runtime.

// String: Textual data.
let username: string = "Kai";

// Number: Numeric values (integers, floating-point, hexadecimal, etc.).
let age: number = 25;

// Boolean: True or false values.
let isStudent: boolean = true;


// ------------------------------------------
// 2. ARRAYS & TUPLES
// ------------------------------------------

// Arrays: Store lists of values of a specific type.
// You can declare them in two ways:
let scores: number[] = [95, 80, 75];
let names: Array<string> = ["Alice", "Bob"]; // Generic array syntax

// Tuples: Arrays with a fixed number of elements where the types are known.
// Very useful for representing a pair of values, like a coordinate or returning multiple values.
let coordinate: [number, number] = [10, 20];
let userRecord: [number, string, boolean] = [1, "Kai", true];
// userRecord[0] = "string"; // Error: Type 'string' is not assignable to type 'number'.


// ------------------------------------------
// 3. ENUMS
// ------------------------------------------
// Enums allow you to define a set of named constants. This makes the code self-documenting.

// Numeric Enums (By default, the first value is 0, and it increments by 1)
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}
let currentDirection: Direction = Direction.Up;

// String Enums (Often preferred because they are more readable during debugging)
enum Status {
    Success = "SUCCESS",
    Error = "ERROR",
    Pending = "PENDING"
}
let apiStatus: Status = Status.Pending;


// ------------------------------------------
// 4. SPECIAL TYPES
// ------------------------------------------

// 'any': Bypasses type checking entirely. Use sparingly! It defeats the purpose of TypeScript.
let anything: any = 42;
anything = "Now I'm a string";
anything = false;

// 'unknown': The safer version of 'any'. You cannot perform operations on it until you check its type.
let unknownValue: unknown = "Hello";
// unknownValue.toUpperCase(); // Error! Object is of type 'unknown'.
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase()); // Safe! TypeScript knows it's a string inside this block.
}

// 'void': Used for functions that do not return a value.
function logMessage(message: string): void {
    console.log(message);
}

// 'never': Represents values that never occur.
// Used for functions that always throw an error or have an infinite loop.
function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}

// 'null' and 'undefined': Have their own types. Usually used as union types (e.g., string | null).
let uninitialized: undefined = undefined;
let emptyValue: null = null;


// ------------------------------------------
// 5. OBJECT TYPES
// ------------------------------------------
// You can define the exact shape an object must have.

let person: { name: string; age: number; isEmployed: boolean } = {
    name: "Kai",
    age: 30,
    isEmployed: true
};


// ------------------------------------------
// 6. TYPE ALIASES & BASIC INTERFACES
// ------------------------------------------
// Instead of writing object types inline every time, we extract them into reusable names.

// Type Alias: Gives a name to any type (objects, unions, primitives).
type Point = {
    x: number;
    y: number;
};
let p1: Point = { x: 10, y: 20 };

// Interface: Another way to name an object type. (Usually preferred for defining object shapes).
interface Car {
    brand: string;
    year: number;
    model?: string; // The '?' makes this property optional
}

let myCar: Car = {
    brand: "Toyota",
    year: 2022
    // 'model' is omitted, and that's completely fine.
};


// ------------------------------------------
// 7. FUNCTIONS
// ------------------------------------------
// You can strictly type the parameters and the return type of functions.

// Basic typed function
function multiply(a: number, b: number): number {
    return a * b;
}

// Arrow function with types
const divide = (a: number, b: number): number => {
    return a / b;
};

// Optional Parameters (Must come after required parameters)
function greet(firstName: string, lastName?: string): string {
    if (lastName) {
        return `Hello, ${firstName} ${lastName}`;
    }
    return `Hello, ${firstName}`;
}

// Default Parameters (Provides a fallback value if none is passed)
function createGreeting(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}`;
}

// Rest Parameters (For an unknown number of arguments, bundled into an array)
function calculateSum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}


// ------------------------------------------
// 8. TYPE INFERENCE
// ------------------------------------------
// TypeScript is smart. You don't ALWAYS have to explicitly write types.
// If you assign a value immediately, TS infers the type automatically.

let inferredString = "This is a string"; // TS inherently knows this is of type 'string'
// inferredString = 10; // Error! Type 'number' is not assignable to type 'string'.


// Make this file a module to avoid global scope pollution
export {};

