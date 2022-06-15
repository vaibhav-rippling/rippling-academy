const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const numberOfDays = new Map([
  ["Jan", 31],
  ["Feb", 28],
  ["Mar", 31],
  ["Apr", 30],
  ["May", 31],
  ["Jun", 30],
  ["Jul", 31],
  ["Aug", 31],
  ["Sep", 30],
  ["Oct", 31],
  ["Nov", 30],
  ["Dec", 31],
]);

let curMonth = "Jun";
let curYear = 2022;

// day   -> Mon, Tue, Wed, Thu, Fri, Sat, Sun
// index ->   0,   1,   2,   3,   4,   5,   6
let firstDayOfMonth = 2;
let lastDayOfMonth = 3;
let startingWeek = 22;
let endingWeek = 26;

function populate_calendar() {
	document.getElementById('heading').innerHTML = curMonth + ' ' + curYear;

	const activeColor = "#00f9f9";
	const inactiveColor = "#BEF4FA";

	let monthStarted = false;
	let currentDate = 1;
	let limit = numberOfDays.get(curMonth);
	for(let i=0; i<6; i++){
		for(let j=0; j<7; j++){
			let selector = i + "-" + j;

			if(currentDate > limit) {
				document.getElementById(selector).innerHTML = '';
				document.getElementById(selector).style.backgroundColor = inactiveColor;
				continue;
			}

			if(!monthStarted){
				if (firstDayOfMonth == j) {
					document.getElementById(selector).innerHTML = currentDate.toString();
					document.getElementById(selector).style.backgroundColor = activeColor;
					monthStarted = true;
					currentDate++;
				}
				else {
					document.getElementById(selector).innerHTML = '';
					document.getElementById(selector).style.backgroundColor = inactiveColor;
				}
			}
			else {
				document.getElementById(selector).innerHTML = currentDate.toString();
				document.getElementById(selector).style.backgroundColor = activeColor;
				currentDate++;
			}
		}
	}
}

window.onload = function() {
	populate_calendar();
	document.getElementById('prev').addEventListener("click", prevMonth);
	document.getElementById('next').addEventListener("click", nextMonth);
};

function prevMonth() {
	let curMonthIndex = months.indexOf(curMonth);
	let prevMonthIndex = (curMonthIndex + 11)%12;
	curMonth = months[prevMonthIndex];
	if(prevMonthIndex == 11) curYear--;

	if(firstDayOfMonth > 0) endingWeek = startingWeek;
	else endingWeek = startingWeek - 1;

	lastDayOfMonth = (firstDayOfMonth + 6)%7;
	
	let numDays = numberOfDays.get(curMonth);
	firstDayOfMonth = (lastDayOfMonth - (numDays - 1) + 35)%7;

	populate_calendar();
}

function nextMonth() {
	let curMonthIndex = months.indexOf(curMonth);
	let nextMonthIndex = (curMonthIndex + 1)%12;
	curMonth = months[nextMonthIndex];
	if(nextMonthIndex == 0) curYear++;

	if(lastDayOfMonth < 6) startingWeek = endingWeek;
	else startingWeek = endingWeek + 1;

	firstDayOfMonth = (lastDayOfMonth + 1)%7;
	
	let numDays = numberOfDays.get(curMonth);
	lastDayOfMonth = (firstDayOfMonth + (numDays - 1))%7;

	populate_calendar();
}






