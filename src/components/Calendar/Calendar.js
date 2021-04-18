import React from 'react';
import ReactCalendar from 'react-calendar';
// import { Button } from 'reactstrap';

const Calendar = ({events, day, setDay}) => {

    // show which days have events
    // use 'tileContent' prop that points at function that goes through destructured events
    // if i have events on this day, show dot at bottom of tile, otherwise
    // otherwise display null (default calendar tile)

    // JS array function 'some', use this to display if any events have the same day of the tile, show something different

    //wire up dummy delete buttons-- logging id to console of event I want to delete will help make delete button backend ready

    // simple example: put dot on every even day

    // const daysWithEvents = events.filter(event => new Date(event))
    // const addBulletToDaysWithEvents = daysWithEvents.


    // const datesAreOnSameDay = (first, second) =>
    //     first.getFullYear() === second.getFullYear() &&
    //     first.getMonth() === second.getMonth() &&
    //     first.getDate() === second.getDate();



    return (
        // refer to react calendar documentation for the line below
        // runs onClickDay function anytime a day on the calendar is clicked
        // <ReactCalendar onClickDay={(value) => setDay(value)}/>
        <ReactCalendar onClickDay={(value) => setDay(value)} tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>.</p> : <p>&nbsp;&nbsp;</p>}/>
    ); // needs more work. Figure out syntax for tileContent to show '.' on days that have events, not just the current day
}

export default Calendar
