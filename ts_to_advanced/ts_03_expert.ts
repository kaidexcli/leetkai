// ==========================================
// TYPESCRIPT 03: EXPERT LEVEL
// ==========================================
// This file covers type transformations, utility types, and structural wizardry.
// Mastering these will make you a TypeScript expert and help immensely with
// strongly-typing complex architectures and writing dynamic utility functions.

// ------------------------------------------
// 1. KEYOF TYPE OPERATOR
// ------------------------------------------
// 'keyof' takes an object type and produces a string or numeric literal union
// of its keys.

interface User {
    id: number;
    name: string;
    email: string;
}
type UserKeys = keyof User; // Type resolves to: "id" | "name" | "email"

// Extremely useful for ensuring a function can only request valid properties of an object.
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let user: User = { id: 1, name: "Kai", email: "kai@test.com" };
let nameResult = getProperty(user, "name"); // OK
// let ageResult = getProperty(user, "age"); // Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name" | "email"'.


// ------------------------------------------
// 2. TYPEOF TYPE OPERATOR
// ------------------------------------------
// 'typeof' in the type context extracts the type from an existing runtime variable or function.

let defaultSettings = { theme: "dark", notifications: true, timeout: 5000 };

// Creates a type based entirely on the shape of the 'defaultSettings' object.
type Settings = typeof defaultSettings;


// ------------------------------------------
// 3. UTILITY TYPES (Built-in)
// ------------------------------------------
// Built-in global types that facilitate common type transformations.

interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// Partial<T>: Makes all properties in T optional. Useful for HTTP PATCH requests.
type UpdateTodo = Partial<Todo>;

// Required<T>: Makes all properties in T required (removes '?' modifiers).
type CompleteTodo = Required<UpdateTodo>;

// Readonly<T>: Makes all properties in T immutable (cannot be reassigned).
type ReadonlyTodo = Readonly<Todo>;

// Record<Keys, Type>: Constructs an object type. Excellent for Hash Maps!
// In LeetCode, if you need a frequency map or adjacency list:
type FreqMap = Record<string, number>;
const characterCounts: FreqMap = { "a": 1, "b": 2 };
const graph: Record<number, number[]> = { 1: [2, 3], 2: [4] };

// Pick<Type, Keys>: Extracts only the specified properties from an interface.
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit<Type, Keys>: Removes the specified properties from an interface.
type TodoWithoutDesc = Omit<Todo, "description">;

// Exclude<UnionType, ExcludedMembers>: Removes types from a union.
type AvailableDrinks = "Coffee" | "Tea" | "Juice" | "Water";
type DrinksWithoutCaffeine = Exclude<AvailableDrinks, "Coffee" | "Tea">; // Resolves to: "Juice" | "Water"

// Extract<Type, Union>: Keeps only the types present in both.
type Extracted = Extract<"a" | "b" | "c", "a" | "f">; // Resolves to: "a"

// ReturnType<Type>: Extracts the return type of a function signature.
function createPoint() { return { x: 10, y: 20 }; }
type Point = ReturnType<typeof createPoint>; // Resolves to: { x: number, y: number }


// ------------------------------------------
// 4. MAPPED TYPES
// ------------------------------------------
// Mapped types build on the syntax of index signatures to iterate through keys to create a new type.

type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
};

// [Property in keyof Type] iterates over the keys of the provided type.
// We are mapping every property in the original type to be a 'boolean'.
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// Resolves to:
// {
//    darkMode: boolean;
//    newUserProfile: boolean;
// }


// ------------------------------------------
// 5. CONDITIONAL TYPES
// ------------------------------------------
// Logic at the type level: SomeType extends OtherType ? TrueType : FalseType;

type IsString<T> = T extends string ? true : false;
type A = IsString<"Hello">; // Type is true
type B = IsString<123>;     // Type is false

// Real world usage: Flattening an array type
// If T is an array, extract the element type T[number]. Otherwise, return T itself.
type Flatten<T> = T extends any[] ? T[number] : T;
type Str = Flatten<string[]>; // Type is string
type Num = Flatten<number>;   // Type is number


// ------------------------------------------
// 6. TEMPLATE LITERAL TYPES
// ------------------------------------------
// Building string types via template literal syntax, exactly like JS template strings.

type World = "world";
type Greeting = `hello ${World}`; // Type is exactly "hello world"

type Color = "red" | "blue";
type Size = "small" | "large";
type CSSClass = `${Color}-${Size}`;
// Type resolves to the cross-product: "red-small" | "red-large" | "blue-small" | "blue-large"


// ------------------------------------------
// 7. RECURSIVE TYPES (Crucial for Trees/Graphs in LeetCode)
// ------------------------------------------
// Types that reference themselves. This is essential for recursive Data Structures.

// A type definition for an arbitrarily nested JSON object
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

// A generic type for a Binary Tree Node
interface TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

// A generic type for a Linked List Node
interface ListNode<T> {
    val: T;
    next: ListNode<T> | null;
}


// Make this file a module to avoid global scope pollution
export {};

