import React from 'react';
import DatePicker from "./Georgian/DatePicker/DatePicker"

const Calendar: React.FC<any> = (props: any) => {

    return (
        <div >

           <input type="date" />
           <DatePicker 
           setTime={true}
           theDate= {new Date()} headerImage={"./images/calendar/bahman.jpg"} 
           sendDate={(newDate) => console.log("sendDate", newDate)} />
        </div>
        )
}

export default Calendar