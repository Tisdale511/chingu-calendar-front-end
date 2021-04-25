import React from 'react'
import './EventWindow.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
const EventWindow = ({events, setEvents, day, getEvents}) => {
    //  add 'Is loading' message to lock out UI while delete process is finishing




    const createEvent = () => {
        console.log('Make event here')
    }

    const deleteEvent = (id) => {
        fetch(`http://localhost:3000/events/${id}`, {method: "DELETE"})
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
                    {event.description} <Button onClick={() => deleteEvent(event.id)} color="danger">{'X'}</Button>
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
                                    <Input type="text" name="event" id="eventName"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventDescription">Description</Label>
                                    <Input type="text" name="description" id="eventDescription"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventStartTime">Start Time</Label>
                                    <Input type="time" name="startTime" id="eventStartTime" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventEndTime">End Time</Label>
                                    <Input type="time" name="endTime" id="eventEndTime" />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default EventWindow