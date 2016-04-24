function arrayToList(array) {
  var newList = null;
  for (var i = array.length-1; i >= 0; i--) {
    newList = {value: array[i], rest: newList};
  }
  return newList;
}

function listToArray(list) {
  var newArray = new Array();
  for (var node = list; node; node = node.rest) {
    newArray.push(node.value);
  }
  return newArray;
}

function prepend(element, list) {
  return {value: element, rest: list};
}

function nth(list, position) {
  var counter = 0;
  for (var node = list; node; node = node.rest) {
    if (counter === position) {
      return node.value;
    } else {
      counter++;
    }
  }
}

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
