import React, {useState, useEffect, InputHTMLAttributes} from 'react';
import DatePicker from "./Georgian/DatePicker/DatePicker"
import NDate from '@nepo/ndate';


export interface IDateObject {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
type IProps = {
    setTime?: boolean
    calendar?: true;
    headerImage?: string;
}
const Calendar: React.FC<IProps> = (props: IProps) => {

    const [inputValue, setInputValue] = useState<string>("")

    const dateHandler = (data: IDateObject ) => {
        const newDate = new NDate(new Date(data.year, data.month, data.day, data.hour, data.minute, 0, 0));
        console.log(newDate.date)
        if(props.setTime){
            setInputValue(newDate.format("YYYY/MM/DD HH:mm"))
        } else {
            setInputValue(newDate.format("YYYY/MM/DD"))
        }
    }

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        let txt: string = e.target.value
        if(txt.length > inputValue.length && txt.length === 4){
            txt += "/"
        } else if(txt.length > inputValue.length && txt.length === 5 && txt.indexOf("/") < 0){
            txt = txt.slice(0, 4) + "/" + txt[4]
        } else if(txt.length > inputValue.length && txt.length === 7){
            txt += "/"
        } else if(txt.length > inputValue.length && txt.length === 8  && txt.lastIndexOf("/") < 5){
            txt = txt.slice(0, 7) + "/" + txt[7]
        } else if(txt.length > inputValue.length && txt.length === 10){
            txt += " "
        } else if(txt.length > inputValue.length && txt.length === 13){
            txt += ":"
        } else if(txt.length > 16) {
            txt = inputValue
        }

        setInputValue(txt)

    }

    return (
        <div >

           <input type="text" value={inputValue} onChange={onChangeHandler} />
           <DatePicker 
           setTime={props.setTime}
           theDate= {new Date()} headerImage={props.headerImage} 
           sendDate={(newDate) => dateHandler(newDate)} />
        </div>
        )
}

export default Calendar