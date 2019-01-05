const month_name = ["January", "February", "March",
					"April", "May", "June",
					"July", "August", "September",
					"October", "November", "December"];

// Initiate the page
function init_page() {
	let calendar = get_calendar();
	let today = get_today();
	let first_day = get_first_day(today.getMonth(), today.getFullYear());
	let days_in_month = get_days_in_month(today.getMonth(), today.getFullYear());
	let rows = calculate_number_of_rows(days_in_month, first_day);
	
	set_calendar_title(get_calendar_title(),
			month_name[today.getMonth()] + " " + today.getFullYear());
	clear(calendar);
	set_rows(calendar, rows);
	add_days(calendar, days_in_month);
	set_first_day(calendar, first_day);
	highlight_day(calendar, today.getDate());
}

// Gets the div that contains the days from the DOM
// *returns* a DOM object representing the calendar
function get_calendar() {
	return document.getElementById("calendar-days");
}

// Gets the div that contains the calendar title from the DOM
// *returns* a DOM object representing the calendar title
function get_calendar_title() {
	return document.getElementById("calendar-title");
}

// Gets the date for today
// *returns* a Date object representing today
function get_today() {
	return new Date();
}

// Calculates the weekday of the first day
// of the month, given the month and the year
// *param* month: a 0-based integer representing the month (0-11)
// *param* year: an integer representing the year (eg. 2018)
// *returns* a 0-based integer representing the weekday (0-6)
function get_first_day(month, year) {
	let first_day = new Date(year, month, 1);
	return first_day.getDay();
}

// Returns the number of days in a month,
// given the month and the year
// *param* month: a 0-based integer representing the month (0-11)
// *param* year: an integer representing the year (eg. 2018)
// *returns* a integer representing the number of days in the month
function get_days_in_month(month, year) {
	let last_day = new Date(year, month + 1, -1);
	return last_day.getDate();
}

//Calculates the number of rows necessary for
//a given month
//*param* days_in_month: an integer representing the
//                     number of days in the month
//*param* first_day: a 0-based integer representing
//                 the weekday (0-6)
//*returns* the number of rows necessary for the given month
function calculate_number_of_rows(days_in_month, first_day) {
	return Math.ceil((days_in_month + first_day) / 7);
}

// Clears the inner HTML of the given element
// *param* element: the element to be cleared
function clear(element) {
	element.innerHTML = "";
}

// Sets the title of the calendar
// *param* calendar_title: the DOM element representing
//                         the title of the calendar
// *param* new_title: the new title of the calendar
function set_calendar_title(calendar_title, new_title) {
	calendar_title.innerText = new_title;
}

// Sets the number of rows to the given number
// *param* calendar: the DOM element representing the calendar
// *param* num_rows: the number of rows the calendar should have
function set_rows(calendar, num_rows) {
	calendar.style["grid-template-rows"] = num_rows;
}

// Adds a given number of 'div' boxes into a given calendar
// *param* calendar: the DOM element representing the calendar
// *param* days_in_month: the number of 'day' boxes to add
function add_days(calendar, days_in_month) {
	for (var i = 1; i <= 31; i++) {
		let element = document.createElement("div");
		element.innerText = i;
		element.className += "day";
		calendar.append(element);
	}
}

//Sets the weekday of the first day
//of a given calendar to the given weekday
//*param* calendar: the DOM element representing the calendar
//*param* day_of_week: a 0-based integer representing
//                 the weekday (0-6)
function set_first_day(calendar, day_of_week) {
	day_of_week = (day_of_week % 7) + 1;
	if(calendar.children.length == 0) {
		console.exception("Error: calendar has not been filled yet (set_first_day)");
		return;
	}
	let first_day = calendar.children[0];
	first_day.style["grid-column-start"] = day_of_week;
}

// Highlights the given day
//*param* calendar: the DOM element representing the calendar
//*param* day_of_month: an integer representing the
//                      
function highlight_day(calendar, day_of_month) {
	if(calendar.children.length < day_of_month) {
		console.exception("Error: not enough days (highlight_day)");
		return;
	}
	
	let previous = document.getElementById("highlighted-day");
	if(previous) previous.id = "";
	
	calendar.children[day_of_month - 1].id = "highlighted-day";
}