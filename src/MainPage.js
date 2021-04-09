import React from 'react'
import Header from './Header.js'
import Calendar from 'react-calendar';
import EventWindow from './EventWindow.js'

const MainPage = () => {
    return (
        <div>
            <Header />
            <Calendar />
            <EventWindow/>
        </div>
    )
}

export default MainPage
