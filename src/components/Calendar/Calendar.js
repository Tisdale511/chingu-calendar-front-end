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

    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();

    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [nLabel, setNLabel] = React.useState(months[(new Date().getMonth() + 1) % 12])
    const [pLabel, setPLabel] = React.useState(months[(new Date().getMonth() + 11) % 12])
    // these two lines are required in order for the next and previous month to render correctly on load
    

    const updateMonthLabels = (date) => {
        setNLabel(months[(date.getMonth() + 1) % 12]) 
        setPLabel(months[(date.getMonth() + 11) % 12])
    }

    return (
        // refer to react calendar documentation for the line below
        // runs onClickDay function anytime a day on the calendar is clicked
        // <ReactCalendar onClickDay={(value) => setDay(value)}/>
        <ReactCalendar 
            onActiveStartDateChange={({ activeStartDate }) => {updateMonthLabels(activeStartDate)}} 
            prevLabel={`‹ ${pLabel}`} 
            nextLabel={`${nLabel} ›`} 
            prev2Label={null} 
            next2Label={null} 
            calendarType={'US'}
            onClickDay={(value) => setDay(value)} 
            tileContent={({ date, view }) => view === 'month' && events.some(event => datesAreOnSameDay(date, new Date(event.startDate))) ? <p>•</p> : <p>&nbsp;</p>
        }/>
    ); 
}

export default Calendar
