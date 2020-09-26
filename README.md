# random
Alea.js is the original seeded random function by Johannes Baagøe.

random.js is the function I've rewrote 😊

## How to use
To use the function, you just need to integrate the script into your page and then call the "random" function:
```js
var MyRandomInt = random("seed");
console.log(MyRandomInt()); // 0.03475257847458124
console.log(MyRandomInt()); // 0.5790662220679224
```
Without the seed, the function uses the Date.now() value as the seed.

To free the name from the global space, you can modify the script at the line 21 to extend the Math object :
```js
//before :
const random = (function() {
  //...
})();

//after :
Math.MyCustomRandom = (function() {
  //...
})();
```
Then you can use it like:
```js
var MyRandomInt = Math.MyCustomRandom("seed");
console.log(MyRandomInt()); // 0.03475257847458124
console.log(MyRandomInt()); // 0.5790662220679224
```

## Soon
 - int32 method
 - double method
 - npm package
 - custom min - max (works with positive and negative numbers) (the only condition : type of min/max === numbers and min < max)
 - custom number type (integer, float)

... what else ?
