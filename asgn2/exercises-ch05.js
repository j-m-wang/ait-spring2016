// exercises-ch05.js

//flattening
var arrays = [[2, 4, 6], [8], [10, 12]];

function flatten(arrays) {
  return arrays.reduce(function concatHelper(x, y) {
    return x.concat(y);
  }, []);
}

console.log(flatten(arrays));

//every and then some
function every(array, predicateFunc) {
  console.log("Running every...");
  for (var i = 0; i < array.length; i++) {
    //if any are false..
    if (!predicateFunc(array[i])) {
      return false;
    }
    //otherwise..
    return true;
  }
}

function some(array, predicateFunc) {
  console.log("Running some...");
  for (var i = 0; i < array.length; i++) {
    //if any are true..
    if (predicateFunc(array[i])) {
      return true;
    }
    //otherwise..
    return false;
  }
}

console.log(every([9, 48, 204, 528942], function everyHelper(x) {
  if (x % 3 == 0) {
    return true;
  }
}));

console.log(some(['aardvark', 'abbreviate', 'abacuses', 'abandoners', 'abalones'], function someHelper(x) {
  if (x.length === 9) {
    return true;
  }
}));
