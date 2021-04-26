import React from 'react'
import './EventWindow.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
const EventWindow = ({events, setEvents, day, getEvents}) => {
    //  add 'Is loading' message to lock out UI while delete process is finishing

    const API_ROOT = 'http://localhost:3000'


    const [eventName, setEventName] = React.useState('');
    const [eventDescription, setEventDescription] = React.useState('');
    const [eventStartTime, setEventStartTime] = React.useState('');
    const [eventEndTime, setEventEndTime] = React.useState('')
    // const [eventStartDate, setEventStartDate] = React.useState('')


    const submitEvent = () => {
        console.log(eventName)
        console.log(eventStartTime)
        fetch(`${API_ROOT}/events`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: eventName,
                description: eventDescription,
                startTime: `${day.toISOString().slice(0, 10)}T${eventStartTime}:00.000Z`,
                endTime: `${day.toISOString().slice(0, 10)}T${eventEndTime}:00.000Z`,
                startDate: day
            })
        }
        )
        .then(res => {
            if(res.status === 200){
                toggle()
                getEvents()
            }
        })
    }

    // const updateEvent = (id) => {
    //     console.log(eventName)
    //     console.log(eventStartTime)
    //     fetch(`${API_ROOT}/events/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: eventName,
    //             description: eventDescription,
    //             startTime: `${day.toISOString().slice(0, 10)}T${eventStartTime}:00.000Z`,
    //             endTime: `${day.toISOString().slice(0, 10)}T${eventEndTime}:00.000Z`,
    //             startDate: day
    //         })
    //     }
    //     )
    //     .then(res => {
    //         if(res.status === 200){
    //             toggle()
    //             getEvents()
    //         }
    //     })
    // }

    const deleteEvent = (id) => {
        fetch(`${API_ROOT}/events/${id}`, {method: "DELETE"})
        .then(res => {
            if(res.status === 200){
                getEvents()
            }
        })
    }

    const [isEventModalShown, setIsEventModalShown] = React.useState(false);

    const toggle = () => setIsEventModalShown(!isEventModalShown);




    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();

    const findMatchingDay = events.filter(event => datesAreOnSameDay(day, new Date(event.startDate))) // searches through all events to compare the current 'day' to the day of 'event'

    return (
        <div className='EventWindow'>
            {`Currently selected day is ${day}`}
            {findMatchingDay.length !== 0 ? findMatchingDay.map(event => 
                <h3 key={`event${event.id}`}>
                    {event.name} <Button onClick={() => deleteEvent(event.id)} color="danger">{'X'}</Button>
                </h3>) : 
                <h5>
                    No events on this day
                </h5> 
            }
            {} 
            
            {/* takes filtered array, and displays each event's description when that day is clicked on */}
            <div className='newEventWrapper'>
                <Button color="danger" onClick={toggle} className='newEventButton'>New Event</Button>
                <Modal isOpen={isEventModalShown} toggle={toggle}>
                    <ModalHeader toggle={toggle}>New Event</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="eventName">Event</Label>
                                    <Input type="text" name="event" id="eventName" onChange={(e) => setEventName(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventDescription">Description</Label>
                                    <Input type="text" name="description" id="eventDescription" onChange={(e) => setEventDescription(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventStartTime">Start Time</Label>
                                    <Input type="time" name="startTime" id="eventStartTime" onChange={(e) => setEventStartTime(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventEndTime">End Time</Label>
                                    <Input type="time" name="endTime" id="eventEndTime" onChange={(e) => setEventEndTime(e.target.value)}/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={submitEvent}>Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default EventWindow