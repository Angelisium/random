// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
// Copyright (C) 2020 ~ Angelisium

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of  this  software and associated  documentation files  (the "Software"), to
// deal in the  Software without restriction,  including without limitation the
// rights to use, copy, modify, merge,  publish, distribute, sublicense, and/or
// sell copies of the Software,  and to  permit persons to whom the Software is
// furnished to do so, subject to the following conditions: The above copyright
// notice  and  this  permission  notice shall  be  included  in  all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY  OF ANY KIND, EXPRESS OR
// IMPLIED,  INCLUDING  BUT  NOT  LIMITED TO THE WARRANTIES  OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE  AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS  OR  COPYRIGHT  HOLDERS BE LIABLE  FOR  ANY CLAIM,  DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN  CONNECTION WITH  THE SOFTWARE  OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const Random = (function() {
    function isSeed(seed) {
        if(["number", "bigint", "string"].indexOf(typeof seed) < 0) {
            return false;
        } return true;
    }

    class Mash {
        constructor() {
            this.n = 0xefc8249d;
        }
        next(data) {
            let string_data = String(data).split(''),
                n = this.n;
            for(let char of string_data) {
                let h = 0.02519603282416938 * (n + char.charCodeAt());
                n = h >>> 0;
                h = (h - n) * n;
                n = h >>> 0;
                n = n + ((h - n) * 0x100000000); // 2^32
            }
            this.n = n;
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        }
    }

    class Random {
        constructor(seed) {
            let mash = new Mash(),
                seeds = [];
    
            // Apply the seeding algorithm from Baagoe.
            // Rewritten by Angelisium.
            for(let i=0; i<3; i++) {
                seeds.push(mash.next(' '));
            }
    
            seeds = seeds.map(function(seed_x) {
                let new_seed_x = seed_x - mash.next(seed);
                if(new_seed_x<0) {
                    new_seed_x++;
                } return new_seed_x;
            });

            // c for ? ... TODO: find a better name
            this.c = 1;
            this.seeds = seeds;
        }
        next() {
            let first_seed = this.seeds.shift(),
                result = 2091639 * first_seed + this.c * 2.3283064365386963e-10; // 2^-32
            this.c = result | 0;
            result -= this.c;

            this.seeds.push(result);
            return result;
        }
        toRange(min, max) {
            if(Number.isInteger(min) && Number.isInteger(max)) {
                if(min < max) {
                    return ((this.next() * (max - min)) | 0) + min;
                } else {
                    throw new RangeError("min must be strictly less than max");
                }
            } else {
                throw new RangeError("min and max must be an integer");
            }
        }
        toFloatRange(min, max, d) {
            if(typeof min === "number" && typeof max === "number") {
                if(min < max) {
                    let decimal = d ? parseInt(d) : 0;
                    if(isNaN(decimal) || decimal < -1 || decimal === 0) {
                        let dmin = min.toString().split('.'),
                            dmax = max.toString().split('.')[1].length;

                        dmin = dmin[1] ? dmin[1].length : 0;
                        dmax = dmax[1] ? dmax[1].length : 0;

                        decimal = (dmin >= dmax) ? dmin : dmax;
                    }

                    decimal = decimal === 0 ? 2 : decimal;

                    let result = this.next() * (max - min);
                        result = result * (10 ** decimal);
                        result = result | 0;
                        result = result / (10 ** decimal);
                    return result + min;
                } else {
                    throw new RangeError("min must be strictly less than max");
                }
            } else {
                throw new RangeError("min and max must be an integer");
            }
        }
    }

    return Random;
})();

if(typeof module !== 'undefined' && module.exports) {
    module.exports = random;
}
