import React from 'react';
import Header from './components/Header/Header.js';
import EventWindow from './components/EventWindow/EventWindow.js';
import { Container, Row, Col } from 'reactstrap';
import Calendar from './components/Calendar/Calendar'; 

const MainPage = () => {

    const [events, setEvents] = React.useState([]) // hands back two element array, first is value, 'events', second is setter function, 'setEvents'
    const [day, setDay] = React.useState(null) // start as null just to give a single value.

    React.useEffect(() => fetch("http://localhost:3000/events")// CORRECT
    .then(response => response.json()) // change response to JSON format 
    .then(response => setEvents(response)), []) // we want this to run only if a dependency array changes. in this case we only want it to run once, so by adding an empty array that will never change, we prevent useEffect from re rendering
    
    // fetch("http://localhost:3000/events")  // WRONG
    // .then(response => setEvents(response)) // this will cause infinite loop, when it gets to setEvents(response), it will trigger a re render, run setEvents(response) again, so on and so fourth


    return (
        <Container className='main'>
            <Row>
                <Col xs='8' className='column'>    {/**left*/}
                    <Header />
                    <Calendar events={events} day={day} setDay={setDay}/> {/* day gets set here, not in event window, thus setDay is passed to calendar rather than eventWindow */}
                </Col>
                <Col xs='4' className='column'> {/**right*/}
                    <EventWindow events={events} setEvents={setEvents} day={day}/> {/* event gets set here, not in calendar, thus setEvent is passed to to EventWindow rather than Calendar */}
                </Col>
            </Row>
        </Container>
    )
}

export default MainPage
