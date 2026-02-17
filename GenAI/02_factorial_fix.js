// Simple function to calculate factorial of a number
function factorial(n) {
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// // Test the function
// console.log("Factorial of 5:", factorial(5));    // Output: 120
// console.log("Factorial of 0:", factorial(0));    // Output: 1
// console.log("Factorial of 10:", factorial(10));  // Output: 3628800

// consider an array of numbers and calculate factorial for each number by using a simple for loop.
const numbers = [0, 1, 2, 3, 4, 5];
for (let num of numbers) {
  console.log(`Factorial of ${num}:`, factorial(num));
}
