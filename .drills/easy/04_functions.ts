// Problem 4: Functions
// Add the correct types to the parameters and return type of this function.
// It should take two numbers and return their sum.

export function addNumbers(a: any, b: any): any {
    return a + b;
}

// Add the correct types to the parameters and return type of this function.
// 'name' is required (string) 
// 'greeting' is optional (string). 
// The function should return a string.

export function greet(name: any, greeting?: any): any {
    if (greeting) {
        return `${greeting}, ${name}`;
    }
    return `Hello, ${name}`;
}
