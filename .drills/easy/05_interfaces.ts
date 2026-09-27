// Problem 5: Interfaces and Objects
// Create an interface 'Book' with the following properties:
// - title (string)
// - author (string)
// - year (number)
// - isBestseller (optional boolean)

// TODO: Define Book interface

// Create an object 'myBook' of type 'Book' and provide valid values for the required properties.

interface Book {
    name: string,
    genre: string,
    author?: string
    year?: number,
    isBestSeller?: any,
}

export let myBook: Book = {
    name: "Lord of the Rings",
    genre: "Fiction",
}


