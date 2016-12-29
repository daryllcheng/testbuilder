// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
	var number = cardNumber.split('').map(Number);
	var dcAePrefix = 30 + number[1];
	var masterPrefix = [51, 52, 53, 54, 55].includes(number[0] * 10 + number[1]);
	var visaPrefix = number[0] === 4;
	var discoverPrefix = (cardNumber.substring(0, 4) === '6011' || ['644', '645', '646', '647', '648', '649'].includes(cardNumber.substring(0, 3)) || cardNumber.substring(0, 2) === '65');
	var maestroPrefix = ['5018', '5020', '5038', '6304'].includes(cardNumber.substring(0, 4)); 
	var chinaPrefix = getRange(622126, 622925).includes(Number(cardNumber.substring(0, 6))) || getRange(624, 626).includes(Number(cardNumber.substring(0, 3))) || getRange(6282, 6288).includes(Number(cardNumber.substring(0, 4)));
	var switchPrefix = ['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759'].some(function(prefix) {
		return cardNumber.startsWith(prefix);
	});

	if (cardNumber.length === 14 && (dcAePrefix === 38 || dcAePrefix === 39)) {
		return "Diner's Club";
	} else if (cardNumber.length === 15 && (dcAePrefix === 34 || dcAePrefix === 37)) {
		return "American Express";
	} else if ([16, 18, 19].includes(cardNumber.length) && switchPrefix) {
		return "Switch";
	} else if ([13, 16, 19].includes(cardNumber.length) && visaPrefix) {
		return "Visa";
	} else if (cardNumber.length === 16 && masterPrefix) {
		return "MasterCard";
	} else if ((cardNumber.length === 16 || cardNumber.length === 19) && discoverPrefix) {
		return "Discover";
	} else if ([12, 13, 14, 15, 16, 17, 18, 19].includes(cardNumber.length) && maestroPrefix) {
		return "Maestro";
	} else if ((getRange(16, 19).includes(cardNumber.length)) && chinaPrefix) {
		return "China UnionPay";
	} else {
		return "Invalid Number";
	}
  // Note: `cardNumber` will always be a string 
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.
};

function getRange(start, end) {
	var range = [];
	for (var i = start; i <= end; i++) {
		range.push(i);
	}
	return range;
}