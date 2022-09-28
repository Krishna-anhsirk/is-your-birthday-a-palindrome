function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  var reversedStr = reverseStr(str);
  if (reversedStr === str) {
    return true;
  } else {
    return false;
  }
}

function convertDateToStr(date) {
  var dateStr = {
    day: date.day.toString(),
    month: date.month.toString(),
    year: date.year.toString(),
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  }
  return dateStr;
}

function getAllDateVariations(date) {
  //Convert date into string
  var dateStr = convertDateToStr(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  //Finding all variations in string format
  var allVariations = getAllDateVariations(date);
  for (let i = 0; i < allVariations.length; i++) {
    if (isPalindrome(allVariations[i])) {
      return true;
    }
  }
  return false;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return true;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var nextDate = {
    day: date.day + 1,
    month: date.month,
    year: date.year,
  };

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //If it is feb
  if (nextDate.month === 2) {
    //Only if it is 28th day
    if (nextDate.day > 28) {
      //If it is leap year
      if (isLeapYear(nextDate.year)) {
        nextDate.day = 29;
      }
      //If it is not a leap year
      else {
        nextDate.day = 1;
        nextDate.month++;
      }
    }
  }
  //If it is not feb
  else {
    if (nextDate.day > daysInMonth[nextDate.month - 1]) {
      nextDate.day = 1;
      nextDate.month++;
    }
  }

  //If it crosses DEC
  if (nextDate.month > 12) {
    nextDate.month = 1;
    nextDate.year++;
  }

  return nextDate;
}

function nextPalindromicDate(date) {
  var counter = 0;
  while (1) {
    counter++;
    date = getNextDate(date);
    var isThisPalindrome = checkPalindromeForAllFormats(date);
    if (isThisPalindrome) {
      break;
    }
  }
  return [counter, date];
}

var date = {
  day: 15,
  month: 11,
  year: 2000,
};

console.log(nextPalindromicDate(date));
