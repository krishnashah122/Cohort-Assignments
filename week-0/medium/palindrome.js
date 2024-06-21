/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let temp = "";

  for(let i = 0; i < str.length; i++){
    if((str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) || (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122)){
      temp += str[i];
    }
  }

  let n = temp.length;
  temp = temp.toLowerCase();
  
  for(let i = 0; i < n / 2; i++){
    if(temp[i] !== temp[n-i-1]){
      return false;
    }
  }

  return true;
}

module.exports = isPalindrome;
