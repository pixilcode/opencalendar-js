const month_name = ["January", "February", "March",
					"April", "May", "June",
					"July", "August", "September",
					"October", "November", "December"];

// Create a calendar object (including a DOM
// element)
// *returns* an object representing a calendar
function create_calendar(year, month) {
	// Build the necessary divs
	// div#calendar
	// |--div#calendar-title
	// L--div#calendar-days
	let calendar = document.createElement("div");
	calendar.id = "calendar";
	
	let calendar_title = document.createElement("div");
	calendar_title.id = "calendar-title";
	
	let calendar_days = document.createElement("div");
	calendar_days.id = "calendar-days";
	
	calendar.append(calendar_title);
	calendar.append(calendar_days);
	
	let first_day = get_first_day(month, year);
	let days_in_month = get_days_in_month(month, year);
	let rows = calculate_number_of_rows(days_in_month, first_day);
	
	set_calendar_title(month_name[month] + " " + year);
	set_rows(rows);
	add_days(days_in_month);
	set_first_day(first_day);
	
	// Gets the div that contains the days from the DOM
	// *returns* a DOM object representing the calendar
	function get_calendar() {
		return calendar;
	}

	// Gets the div that contains the calendar title from the DOM
	// *returns* a DOM object representing the calendar title
	function get_calendar_title() {
		return calendar_title;
	}
	
	// Gets the div that contains the calendar days from the DOM
	// *returns* a DOM object representing the calendar title
	function get_calendar_days() {
		return calendar_days;
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
	//	                     number of days in the month
	//*param* first_day: a 0-based integer representing
	//	                 the weekday (0-6)
	//*returns* the number of rows necessary for the given month
	function calculate_number_of_rows(days_in_month, first_day) {
		return Math.ceil((days_in_month + first_day) / 7);
	}

	// Sets the title of the calendar
	// *param* calendar_title: the DOM element representing
	//	                       the title of the calendar
	// *param* new_title: the new title of the calendar
	function set_calendar_title(new_title) {
		get_calendar_title().innerText = new_title;
	}

	// Sets the number of rows to the given number
	// *param* calendar: the DOM element representing the calendar
	// *param* num_rows: the number of rows the calendar should have
	function set_rows(num_rows) {
		get_calendar_days().style["grid-template-rows"] = num_rows;
	}

	// Adds a given number of 'div' boxes into a given calendar
	// *param* calendar: the DOM element representing the calendar
	// *param* days_in_month: the number of 'day' boxes to add
	function add_days(days_in_month) {
		for (var i = 1; i <= 31; i++) {
			let element = document.createElement("div");
			element.innerText = i;
			element.className += "day";
			get_calendar_days().append(element);
		}
	}

	//Sets the weekday of the first day
	//of a given calendar to the given weekday
	//*param* calendar: the DOM element representing the calendar
	//*param* day_of_week: a 0-based integer representing
	//	                   the weekday (0-6)
	function set_first_day(day_of_week) {
		day_of_week = (day_of_week % 7) + 1;
		if(get_calendar_days().children.length == 0) {
			console.exception("Error: calendar has not been filled yet (set_first_day)");
			return;
		}
		let first_day = get_calendar_days().children[0];
		first_day.style["grid-column-start"] = day_of_week;
	}

	// Highlights the given day
	//*param* calendar: the DOM element representing the calendar
	//*param* day_of_month: an integer representing the day of
    //	                    the month
	function highlight_day(day_of_month) {
		if(get_calendar_days().children.length < day_of_month) {
			console.exception("Error: not enough days (highlight_day)");
			return;
		}
		
		let previous = document.getElementById("highlighted-day");
		if(previous) previous.id = "";
		
		get_calendar_days().children[day_of_month - 1].id = "highlighted-day";
	}
	
	return {
		get_calendar: get_calendar,
		set_calendar_title: set_calendar_title,
		highlight_day: highlight_day
	}
}