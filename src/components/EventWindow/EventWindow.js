import React from 'react'
import './EventWindow.css';

const EventWindow = ({events, setEvents, day}) => {
    // console.log(events[6])

    
    if(!day){
        return(
            <>
                Please select a day
            </> 
        ) 
    };

    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();


    const findMatchingDay = events.filter(event => datesAreOnSameDay(day, new Date(event.startDate)))

    return (
        <div className='EventWindow'>
            {`Currently selected day is ${day}`}
            {findMatchingDay.map(event => <h3>{event.description}</h3>)}
        </div>
    )
}

export default EventWindow
