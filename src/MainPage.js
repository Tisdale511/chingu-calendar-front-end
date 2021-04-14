import React from 'react';
import Header from './components/Header/Header.js';
import EventWindow from './components/EventWindow/EventWindow.js';
import { Container, Row, Col } from 'reactstrap';
import Calendar from './components/Calendar/Calendar'; 

const MainPage = () => {

    const [events, setEvents] = React.useState([])
    const [day, setDay] = React.useState(null)

    React.useEffect(() => fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then(response => setEvents(response)), [])
    
    // fetch("http://localhost:3000/events")
    // .then(response => setEvents(response))


    return (
        <Container className='main'>
            <Row>
                <Col xs='8' className='column'>    {/**left*/}
                    <Header />
                    <Calendar events={events} day={day} setDay={setDay}/>
                </Col>
                <Col xs='4' className='column'> {/**right*/}
                    <EventWindow events={events} setEvents={setEvents} day={day}/>
                </Col>
            </Row>
        </Container>
    )
}

export default MainPage
