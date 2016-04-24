function range(a, b, c) {
  if ((a !== undefined) && (b !== undefined) && (c !== undefined)) {
    //third case
    var thirdCase = new Array();
    if (c > 0) {
      while (a < b) {
      thirdCase.push(a);
      a += c;
      }
    } else {
      //catch impossible cases
      if ((c < 0) && (a < b)) {
        return thirdCase;
      }
      //decrement
      while (b < a) {
        thirdCase.push(a);
        a +=c;
      }
    }
    return thirdCase;
  } else if ((a !== undefined) && (b !== undefined)) {
    //second case
    var secondCase = new Array();
    while (a < b) {
      secondCase.push(a);
      a++;
    }
    return secondCase;
  } else if (a !== undefined) {
    //first case
    var firstCase = new Array();
    var counter = 0;
    while (counter < a) {
      firstCase.push(counter);
      counter++;
    }
    return firstCase;
  }
}

console.log(range(5));
console.log(range(2, 5));
console.log(range(2, 9, 2));
console.log(range(5, 0, -1));
console.log(range(6, -1, -2));
console.log(range(6, -1, 1));
