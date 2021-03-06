import React from 'react'
import './EventWindow.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

const EventWindow = ({events, setEvents, day, getEvents}) => {
    //  add 'Is loading' message to lock out UI while delete process is finishing

    // const API_ROOT = 'http://localhost:3000'
    const API_ROOT = 'https://chingu-calendar-backend.herokuapp.com'

    const [eventName, setEventName] = React.useState('');
    const [eventDescription, setEventDescription] = React.useState('');
    const [eventStartDate, setEventStartDate] = React.useState('');
    const [eventEndDate, setEventEndDate] = React.useState('');

    

    const submitEvent = () => {
        console.log(eventStartDate)
        fetch(`${API_ROOT}/events`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: eventName,
                description: eventDescription,
                startDate: eventStartDate,
                endDate: eventEndDate,                
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
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: eventName,
                description: eventDescription,
                startDate: eventStartDate === '' ? currentEvent.eventStartDate : eventStartDate,
                endDate: eventEndDate === '' ? currentEvent.eventEndDate : eventEndDate
                // ternary statement required because upon opening the update modal, assigning it the default value is not setting an actual value
            })
        }
        )
        .then(res => {
            if(res.status === 200){
                triggerUpdateModal()
                getEvents()
                setDetailsEventId(null)
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

    
    const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
    
    const findMatchingDay = events.filter(event => datesAreOnSameDay(day, new Date(event.startDate))) // searches through all events to compare the current 'day' to the day of 'event'
    
    const showOnlyMonthAndDay = () => {
        const currentDate = day.toString();
        const currentDateWithoutTime = currentDate.slice(0,10);
        return currentDateWithoutTime
    }
    
    const [detailsEventId, setDetailsEventId] = React.useState(null);

    const triggerEventId = (id) => setDetailsEventId(id);

    const currentEvent = events.find(event => event.id === detailsEventId) || {
        startDate: '',
        endDate: '',
        name: '',
        description: ''
    }


    return (
        <div className='EventWindow'>
            <h4>{showOnlyMonthAndDay(day)}</h4>
            {findMatchingDay.length !== 0 ? findMatchingDay.map(event => 
                <h4 key={`event${event.id}`}>
                    {event.startDate.toString().slice(11, 16)}{' '} <Button onClick={() => triggerEventId(event.id)} color='link'><h4>{event.name}</h4></Button>{' '}
                </h4>) : 
                <h4>
                    No events on this day
                </h4> 
            }
            {/* takes filtered array, and displays each event's name when that day is clicked on */}

            <div className='newEventWrapper'>
                <Button color="primary" onClick={createEventModal} className='newEventButton'>Add Event</Button>
                <Modal isOpen={isCreateEventModalShown} >
                    <ModalHeader>New Event</ModalHeader>
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
                                    <Input type="datetime-local" name="startDate" id="eventStartTime" onChange={(e) => setEventStartDate(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventEndTime">End Time</Label>
                                    <Input type="datetime-local" name="startDate" id="eventEndTime" onChange={(e) => setEventEndDate(e.target.value)}/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={submitEvent}>Submit</Button>{' '}
                        <Button color="secondary" onClick={createEventModal}>Close</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={eventUpdateId} >
                    <ModalHeader>Update Event</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="eventName">Event</Label>
                                    <Input defaultValue={currentEvent.name} type="text" name="event" id="eventName" onChange={(e) => setEventName(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventDescription">Description</Label>
                                    <Input defaultValue={currentEvent.description}type="text" name="description" id="eventDescription" onChange={(e) => setEventDescription(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventStartTime">Start Time</Label>
                                    <Input defaultValue={currentEvent.startDate.slice(0,16)} type="datetime-local" name="startTime" id="eventStartDate" onChange={(e) => setEventStartDate(e.target.value)}/>{console.log(currentEvent.startDate)}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventEndDTime">End Time</Label>
                                    <Input defaultValue={currentEvent.endDate.slice(0,16)}type="datetime-local" name="endTime" id="eventEndDate" onChange={(e) => setEventEndDate(e.target.value)}/>
                                </FormGroup>                         
                            </Form>
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {updateEvent(currentEvent.id)}}>Submit</Button>{' '}
                        <Button color="secondary" onClick={triggerUpdateModal}>Close</Button>
                    </ModalFooter>
                </Modal>
                


                <Modal isOpen={detailsEventId !== null } >
                    <ModalHeader>Event Details</ModalHeader>
                        <ModalBody>
                            <div>
                                <span className='eventLabel'>Name: </span><span>{currentEvent.name}</span>
                            </div>
                            <div>
                                <span className='eventLabel'>Description: </span><span>{currentEvent.description}</span>
                            </div>
                            <div>
                                <span className='eventLabel'>Start Time: </span><span>{currentEvent.startDate.slice(11, 16)}</span>
                            </div>
                            <div>
                                <span className='eventLabel'>End Time: </span><span>{currentEvent.endDate.slice(11, 16)}</span>
                            </div>
                            <div>
                                <span className='eventLabel'>Start Date: </span><span>{currentEvent.startDate.slice(0, 10)}</span>
                            </div>
                            <div>
                                <span className='eventLabel'>End Date: </span><span>{currentEvent.endDate.slice(0, 10)}</span>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                        <Button color="danger" onClick={() => {
                            if(window.confirm('Are you sure you want to delete this event?')){deleteEvent(currentEvent.id); setDetailsEventId(null) }
                        } }>Delete</Button> 
                            <Button color="primary" onClick={triggerUpdateModal}>Edit</Button>{' '}
                            <Button color="secondary" onClick={() => setDetailsEventId(null)}>Close</Button>

                        </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default EventWindow