// Problem 6: Type Aliases
// Define a type alias named 'Coordinates' that represents an object
// with 'latitude' and 'longitude' properties, both of type number.

// TODO: Define the Coordinates type alias

// Create an object 'myLocation' using the 'Coordinates' type alias and assign it valid values.

// TODO: Define the myLocation object and export it


type Coordinates = {
    latitude: number;
    longitude: number;
}

export let myLocation: Coordinates = {latitude: 27, longitude: 29,}

// NOTE: Problem Solved
