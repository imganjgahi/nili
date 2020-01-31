import React from 'react'
import NiliCalendar from './'


const CalendarPage: React.FC<any> = (props: any) => {

    return (
        <div >

            <NiliCalendar calendar={true} header={"./images/calendar/winter.jpg"}/>
        </div>
        )
}

export default CalendarPage