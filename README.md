# Calendar.js
Have you ever needed to add a calendar to your web page, but didn't want to implement your own?
This widget is for you. With a simple interface to customize your calendar,
this can be easily added to any project. The calendar is implemented in JavaScript, with some
CSS added for basic structure.

## Customization
There is customization available through both CSS and JavaScript

### CSS
In your CSS, you can customize the look of the calendar using the following selectors:
  * `#calendar`
  * `#calendar-title`
  * `#calendar-days`
  * `.day`
  * `#highlighted-day`

However, when customizing, do not use the following attributes:
  * `display`
  * `grid-template-columns`
  * `grid-template-rows`
  * `grid-auto-flow`
  * `grid-column`
  * `grid-row`

### JavaScript
To create a calendar, simply call `create_calendar(year, month)`,
where `year` and `month` are integer values representing the year and the month.
The month is 0-based, which means that January is `0`, February is `1`, and December is `11`.

`create_calendar` returns an object with the following functions:
  * `get_calendar()`: returns a DOM object that can be inserted into the HTML
  * `set_calendar_title(new_title)`: sets the title of the calendar
  * `highlight_day(day_of_month)`: highlights the given day of the month

## Issues
Find an issue? Feel free to report it! I'll fix it as soon as I can.

## Contributing
Pull requests are welcome. Feel free to fix bugs, respond to issues,
or add your own improvements. Just make sure that you explain what
you did in your request.
