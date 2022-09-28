function reverseStr(str) {
  return str.split("").reverse().join("");
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

function isPalindrome(str) {
  var reversedStr = reverseStr(str);
  if (reversedStr === str) {
    return true;
  } else {
    return false;
  }
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

function getPreviousDate(date) {
  var previousDate = {
    day: date.day - 1,
    month: date.month,
    year: date.year,
  };
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //If it is march
  if (previousDate.month === 3) {
    //If it was 1st of March
    if (previousDate.day === 0) {
      //If it is leap year
      if (isLeapYear(previousDate.year)) {
        previousDate.day = 29;
      }
      //If it is not leap year
      else {
        previousDate.day = 28;
      }
      previousDate.month--;
    }
  }
  //If it is not March
  else {
    if (previousDate.day === 0) {
      previousDate.month--;
      //Only when the month value is not zero.Month should be december
      if (previousDate.month != 0) {
        previousDate.day = daysInMonth[previousDate.month - 1];
      }
    }
  }
  //If it is first day of the year
  if (previousDate.month === 0) {
    previousDate.day = 31;
    previousDate.month = 12;
    previousDate.year--;
  }
  return previousDate;
}

function previousPalindromicDate(date) {
  var counter = 0;
  while (1) {
    counter++;
    date = getPreviousDate(date);
    var isThisPalindrome = checkPalindromeForAllFormats(date);
    if (isThisPalindrome) {
      break;
    }
  }
  return [counter, date];
}

function isYourBirthdayPalindrome(date) {
  if (checkPalindromeForAllFormats(date)) {
    console.log("Yay, your birthday is palindrome");
  } else {
    var previousPalindrome = previousPalindromicDate(date);
    var nextPalindrome = nextPalindromicDate(date);
    var noOfDays = 0;
    var newDate;
    if (previousPalindrome[0] < nextPalindrome[0]) {
      noOfDays = previousPalindrome[0];
      newDate = previousPalindrome[1];
    } else {
      noOfDays = nextPalindrome[0];
      newDate = nextPalindrome[1];
    }
    console.log(noOfDays, newDate);
  }
}

var date = {
  day: 1,
  month: 3,
  year: 2001,
};

isYourBirthdayPalindrome(date);
