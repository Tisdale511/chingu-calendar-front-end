import React from 'react';
import ReactCalendar from 'react-calendar';

const Calendar = ({events, day, setDay}) => {

    // show which days have events
    // use 'tileContent' prop that points at function that goes through destructured events
    // if i have events on this day, show dot at bottom of tile, otherwise// otherwise display null (default calendar tile)

    // JS array function 'some', look up documentation, use this to display if any events have the same day of the tile, show something different

    //wire up dummy delete buttons-- logging id to console of event I want to delete will help make delete button backend ready

    // simple example: put dot on every even day

        const datesAreOnSameDay = (first, second) =>
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate();



    return (
        // refer to react calendar documentation for the line below
        // runs onClickDay function anytime a day on the calendar is clicked
        <ReactCalendar/>
        // <ReactCalendar onClickDay={(value) => setDay(value)} tileContent={tile => tile.date}/>
    );
}

export default Calendar
