# How to use
Just include the module:
```js
const Random = require('path/random.js');
```
Then you just have to generate a new instance of `Random`.

Without the seed, the function uses the `Date.now()` value as the seed.

You can use the `.toRange()` and `.toFloatRange()` methods to get numbers in a specific range.

It's possible to define the number of decimal places with an optional third parameter.

By default it will be 2.

/!\ javascript systematically rounded X.X0 to X.X /!\

For the maximum number after the decimal point, directly use the `.next()` method like `(RandomInstance.next() * (max - min)) + min`.

When the seed is generated automatically (currently with `Date.now()`) you can get it with the `.seed` property.
```js
var MyRandomInstance = new Random();

// a float number in the [0,1[ interval
console.log(MyRandomInstance.next()); // 0.6507438428234309

// a integer number in the [0,5[ interval (0,1,2,3 and 4)
console.log(MyRandomInstance.toRange(0, 5)); // 3

// a Float number in the [0.00, 5.00[ interval... so 4.99 will be found but not 5.00
console.log(MyRandomInstance.toFloatRange(0, 5)); // 2.28

// toFloatRange with custom decimal places ( [0.000, 5.000[ interval )
console.log(MyRandomInstance.toFloatRange(0, 5, 6); // 1.005691

// To find the original seed and save it for re-generate the same random number sequence later :
console.log(MyRandomInstance.seed); // 1601398978040

// And if we create a new instance with this seed, we get the same sequence :
var MyTwoRandInstance = new Random(1601398978040);
console.log(MyTwoRandInstance.next()); // 0.6507438428234309
console.log(MyTwoRandInstance.toRange(0, 5)); // 3
console.log(MyTwoRandInstance.toFloatRange(0, 5)); // 2.28
console.log(MyTwoRandInstance.toFloatRange(0, 5, 6)); // 1.005691
```