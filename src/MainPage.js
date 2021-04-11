import React from 'react';
import Header from './components/Header/Header.js';
import EventWindow from './components/EventWindow/EventWindow.js';
import { Container, Row, Col } from 'reactstrap';
import Calendar from './components/Calendar/Calendar'; 

const MainPage = () => {

    return (
        <Container className='main'>
            <Row>
                <Col xs='8' className='column'>    {/**left*/}
                    <Header />
                    <Calendar />
                </Col>
                <Col xs='4' className='column'> {/**right*/}
                    <EventWindow/>
                </Col>
            </Row>
        </Container>
    )
}

export default MainPage
