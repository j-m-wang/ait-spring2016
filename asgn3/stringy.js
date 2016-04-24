//stringy.js
//design objects

module.exports.Palindrome = Palindrome;
module.exports.MutableString = MutableString;

function MutableString(s) {
  this.s = s;
}

MutableString.prototype.concat = function(s) {
  var temp = s.split('');
  for (var i = 0; i < temp.length; i++) {
    this.s += temp[i];
  }
}

MutableString.prototype.validIndex = function(i) {
  var posNum = this.s.split('').length - 1;
  var negNum = (this.s.split('').length) * (-1);
  if (i > posNum) {
    return false;
  } else if (i < negNum) {
    return false;
  } else {
    return true;
  }
}

MutableString.prototype.charAt = function(i) {
  var tempArr = this.s.split('');
  var orgLength = tempArr.length;
  if (i > -1) {
    return tempArr[i];
  } else {
    return tempArr[i+orgLength];
  }
}

MutableString.prototype.set = function() {
  var strArr = this.s.split('');
  var orgLength = strArr.length;
  var indexArr = [];
  var charArr = [];
  var posLimit = this.s.split('').length - 1;
  var negLimit = (this.s.split('').length) * (-1);
  var index, char;
  for (var i = 0; i < arguments.length; i++) {
    if ((i % 2 === 0)) {
      indexArr.push(arguments[i]);
    } else {
      charArr.push(arguments[i]);
    }
  }

  if (indexArr.length > charArr.length) {
    indexArr.pop();
  }
  if (charArr.length > indexArr.length) {
    charArr.pop();
  }

  for (var j = 0; j < indexArr.length; j++) {
    if ((indexArr[j] > -1) && (j <= posLimit)) {
      strArr[indexArr[j]] = charArr[j];
    } else if ((indexArr[j] < 0) && (j > negLimit)){
      strArr[indexArr[j]+orgLength] = charArr[j];
    } else {
      //do nothing
    }
  }
  this.s = strArr.join().replace (/,/g, "");
  return this.s;
}

MutableString.prototype.toString = function() {
  return this.s.toString();
}

MutableString.prototype.toCharArray = function() {
  return this.s.split('');
}

function checkPalindrome(pal) {
  var palArr = pal.split('');
  var tempLength, flag;
  var checkArr = [];
  if (palArr.length % 2 === 1) {
    for (var i = 0; i < ((palArr.length-1)/2); i++) {
      checkArr.push(palArr[i]);
    }
    tempLength = palArr.length-1;
  } else {
    for (var i = 0; i < ((palArr.length)/2); i++) {
      checkArr.push(palArr[i]);
    }
    tempLength = palArr.length;
  }
  for (var i = 0; i < checkArr.length; i++) {
    if (checkArr[i] === palArr[tempLength]) {
      tempLength--;
      flag = true;
    } else {
      flag = false;
      break;
    }
  }
  return flag;
}

function Palindrome(str) {
  if (checkPalindrome(str)) {
    MutableString.call(this, str);
  } else {
    throw new Error("Palindrome not symmetric");
  }
}
Palindrome.prototype = Object.create(MutableString.prototype);
Palindrome.constructor.prototype = Palindrome;

Palindrome.prototype.set = function() {
  var strArr = this.s.split('');
  var orgLength = strArr.length;
  var indexArr = [];
  var charArr = [];
  var posLimit = this.s.split('').length - 1;
  var negLimit = (this.s.split('').length) * (-1);
  var index, char;
  var numFlag = true;
  for (var i = 0; i < arguments.length; i++) {
    if ((i % 2 === 0)) {
      indexArr.push(arguments[i]);
    } else {
      charArr.push(arguments[i]);
    }
  }

  if (indexArr.length > charArr.length) {
    indexArr.pop();
  }
  if (charArr.length > indexArr.length) {
    charArr.pop();
  }

  for (var j = 0; j < indexArr.length; j++) {
    if (!isNaN(charArr[j])) {
      numFlag = false;
    }

    if ((indexArr[j] > -1) && (j <= posLimit) && (isNaN(parseFloat(charArr[j])))) {
      strArr[indexArr[j]] = charArr[j];
    } else if ((indexArr[j] < 0) && (j > negLimit)){
      strArr[indexArr[j]+orgLength] = charArr[j];
    } else {
      //do nothing
    }
  }
  this.s = strArr.join().replace (/,/g, "");
  if ((checkPalindrome(this.s)) && numFlag) {
    return this.s;
  } else {
    throw new Error("Result from set is not symmetric");
  }
}

Palindrome.prototype.concat = function(s) {
  var temp = s.split('');
  for (var i = 0; i < temp.length; i++) {
    this.s += temp[i];
  }
  if (checkPalindrome(this.s)) {
    return this.s;
  } else {
    throw new Error("Result from concatentation is not symmetric");
  }
}
