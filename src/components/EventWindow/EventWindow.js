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
                createEventModal()
                getEvents()
            }
        })
    }
    
    const [isCreateEventModalShown, setIsCreateEventModalShown] = React.useState(false);

    const createEventModal = () => setIsCreateEventModalShown(!isCreateEventModalShown);
    
    const updateEvent = (id) => {
        fetch(`${API_ROOT}/events/${id}`, {
            method: "PATCH",
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
                triggerUpdateModal()
                getEvents()
            }
        })
    }

    const [eventUpdateId, setEventUpdateId] = React.useState(null)

    const triggerUpdateModal = () => setEventUpdateId(!eventUpdateId)

    const deleteEvent = (id) => {
        fetch(`${API_ROOT}/events/${id}`, {method: "DELETE"})
        .then(res => {
            if(res.status === 200){
                getEvents()
            }
        })
    }

    const [detailsEventId, setDetailsEventId] = React.useState(null);

    const triggerEventId = (id) => setDetailsEventId(id);


    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();

    const findMatchingDay = events.filter(event => datesAreOnSameDay(day, new Date(event.startDate))) // searches through all events to compare the current 'day' to the day of 'event'

    console.log(day)
    const showOnlyMonthAndDay = () => {
        const currentDate = day.toString();
        const currentDateWithoutTime = currentDate.slice(0,10);
        return currentDateWithoutTime
    }

    const currentEvent = events.find(event => event.id === detailsEventId) || {}

    const updateFromEventDetailsModal = events.find(event => event.id === eventUpdateId) || {}

    return (
        <div className='EventWindow'>
            <h4>{showOnlyMonthAndDay(day)}</h4>
            {findMatchingDay.length !== 0 ? findMatchingDay.map(event => 
                <h4 key={`event${event.id}`}>
                    {event.startTime.toString().slice(11, 16)}{' '} <Button onClick={() => triggerEventId(event.id)} color='link'><h4>{event.name}</h4></Button>{' '}<Button onClick={() => deleteEvent(event.id)} color="danger">{'Delete'}</Button>
                </h4>) : 
                <h4>
                    No events on this day
                </h4> 
            }
            {} 
            
            {/* takes filtered array, and displays each event's description when that day is clicked on */}
            <div className='newEventWrapper'>
                <Button color="primary" onClick={createEventModal} className='newEventButton'>New Event</Button>
                <Modal isOpen={isCreateEventModalShown} createEventModal={createEventModal}>
                    <ModalHeader createEventModal={createEventModal}>New Event</ModalHeader>
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
                        <Button color="secondary" onClick={createEventModal}>Close</Button>
                    </ModalFooter>
                </Modal>

                {/* <Button color="primary" onClick={triggerUpdateModal} className='updateEventButton'>Update Event</Button> */}
                <Modal isOpen={eventUpdateId} triggerUpdateModal={triggerUpdateModal}>
                    <ModalHeader triggerUpdateModal={triggerUpdateModal}>Update Event</ModalHeader>
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
                        <Button color="primary" onClick={updateEvent}>Submit</Button>{' '}
                        <Button color="secondary" onClick={triggerUpdateModal}>Close</Button>
                    </ModalFooter>
                </Modal>
                


                <Modal isOpen={detailsEventId !== null} triggerEventId={triggerEventId}>
                    <ModalHeader triggerEventId={triggerEventId}>Event Details</ModalHeader>
                        <ModalBody>
                            Name: {currentEvent.name}<br></br>
                            Description: {currentEvent.description}<br></br>
                            Start Time: {currentEvent.startTime}<br></br>
                            End Time: {currentEvent.endTime}

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={triggerUpdateModal}>Update</Button>{' '}
                            <Button color="secondary" onClick={() => setDetailsEventId(null)}>Close</Button>

                        </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default EventWindow