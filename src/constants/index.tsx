export const DEPARTMENTS = ["CS", "Math", "English"]

//map to present it in right format to be displayed as a list
export const DEPARTMENTS_LIST = DEPARTMENTS.map((dept) => ({
//automatically returns an object with the key and value being the same as the dept string    
//value and label are required for the select component to work properly

    value: dept,
    label: dept
}))

// The .map() method is a built-in JavaScript array function. Its job is to loop through every item in an array, run some code on it, and spit out a brand new array with the results.
//When .map() loops through your DEPARTMENTS array:

// It takes the first item ("CS, Math, English"), which we've named dept in the callback function.

// It wraps it inside a new JavaScript object with two properties: value and label.
//When you write an arrow function (=>), JavaScript sees a curly brace { right after the arrow and automatically assumes you are writing a code block, not an object.