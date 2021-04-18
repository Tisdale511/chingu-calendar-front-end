import React from 'react'
import './EventWindow.css';

const EventWindow = ({events, setEvents, day}) => {
    // console.log(events[6])

    
    if(!day){
        return(
            // incase no day is selected, displays this as default
            <>
                Please select a day
            </> 
        ) 
    };

    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();


    const findMatchingDay = events.filter(event => datesAreOnSameDay(day, new Date(event.startDate))) // searches through all events to compare the current 'day' to the day of 'event'

    return (
        <div className='EventWindow'>
            {`Currently selected day is ${day}`}
            {findMatchingDay.map(event => <h3>{event.description}</h3>)}
            {/* takes filtered array, and displays each event's description when that day is clicked on */}
        </div>
    )
}

export default EventWindow
