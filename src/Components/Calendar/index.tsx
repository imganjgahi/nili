import React, {useState, useEffect, useRef} from 'react';
import DatePicker from "./Georgian/DatePicker/DatePicker"
import NDate from '@nepo/ndate';
import MaskedInput from "react-text-mask";


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
    placeholder?: string;
}
const Calendar: React.FC<IProps> = (props: IProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [calendarModal, showCalendar] = useState<boolean>(false);
    
    const dateHandler = (data: IDateObject ) => {
        const newDate = new NDate(new Date(data.year, data.month, data.day, data.hour, data.minute, 0, 0));
        console.log(newDate.date)
        if(props.setTime){
            setInputValue(newDate.format("YYYY/MM/DD HH:mm"))
        } else {
            setInputValue(newDate.format("YYYY/MM/DD"))
        }
        showCalendar(false)
    }

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        let txt: string = e.target.value;
        setInputValue(txt)

    }
    // onChangeHandler = (event) => {
    //     const e = event.target.value;
    //     let stripedval = e.replace(/_/g, "");
    //     if ((!this.props.setTime && stripedval.length === 10) || (this.props.setTime && stripedval.length === 16)) {
    //         const y = event.target.value.substr(0, 4);
    //         const m = event.target.value.substr(5, 2);
    //         const d = event.target.value.substr(8, 2);
    //         const h = event.target.value.substr(11, 2);
    //         const mm = event.target.value.substr(14, 2);

    //         if (this.props.max && new NDate(this.props.max).date < new NDate([+y, +m, +d]).date) {
    //             const newDate = new NDate(this.props.max).getJalali();
    //             this.datepickerHandler({ year: newDate[0], month: newDate[1], day: newDate[2], hour: +h, minute: +mm });
    //         } else {
    //             this.datepickerHandler({ year: +y, month: +m, day: +d, hour: +h, minute: +mm });
    //         }

    //         if (this.props.min && new NDate([+y, +m, +d]).date < new NDate(this.props.min).date) {
    //             const newDate = new NDate(this.props.min).getJalali();
    //             this.datepickerHandler({ year: newDate[0], month: newDate[1], day: newDate[2], hour: +h, minute: +mm });
    //         } else {
    //             this.datepickerHandler({ year: +y, month: +m, day: +d, hour: +h, minute: +mm });
    //         }
    //     }
    // };

    const createAutoCorrectedDatePipe = (dateFormat:any) => (conformedValue:any) => {
        const indexesOfPipedChars: any[] = [];
        const dateFormatArray = dateFormat.split(/[^dmyHMS]+/);
        const maxValue: any = { dd: 31, mm: 12, yy: 99, yyyy: 9999, HH: 23, MM: 59, SS: 59 };
        const minValue: any = { dd: 1, mm: 1, yy: 0, yyyy: 1, HH: 0, MM: 0, SS: 0 };
        const conformedValueArr = conformedValue.split("");
        dateFormatArray.forEach((format: any) => {
            const position = dateFormat.indexOf(format);
            const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

            if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
                conformedValueArr[position + 1] = conformedValueArr[position];
                conformedValueArr[position] = 0;
                indexesOfPipedChars.push(position);
            }
        });

        const isInvalid = dateFormatArray.some((format: any) => {
            const position = dateFormat.indexOf(format);
            const length = format.length;
            const textValue = conformedValue.substr(position, length).replace(/\D/g, "");
            const value = parseInt(textValue, 10);
            return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
        });

        if (isInvalid) {
            return false;
        }

        return {
            indexesOfPipedChars,
            value: conformedValueArr.join(""),
        };
    };
    const autoCorrectedDatePipe = props.setTime
            ? createAutoCorrectedDatePipe("yyyy/mm/dd HH:MM")
            : createAutoCorrectedDatePipe("yyyy/mm/dd");

    return (
        <div className="Main">

           {calendarModal && (
               <React.Fragment>
                   <div className="datePickerCloser" onClick={() => showCalendar(false)}></div>
                   <DatePicker 
               setTime={props.setTime}
               theDate= {new Date()} headerImage={props.headerImage} 
               sendDate={(newDate) => dateHandler(newDate)} />
               </React.Fragment>
           )}
                      
                      <MaskedInput
                    className={"txtInput"}
                    onClick={() => showCalendar(true)}
                    name="date"
                    value={inputValue}
                    keepCharPositions={true}
                    guide={true}
                    pipe={autoCorrectedDatePipe}
                    onChange={onChangeHandler}
                    placeholder={props.placeholder}
                    mask={props.setTime ? [
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                  "/",
                                  /\d/,
                                  /\d/,
                                  "/",
                                  /\d/,
                                  /\d/,
                                  " ",
                                  /\d/,
                                  /\d/,
                                  ":",
                                  /\d/,
                                  /\d/,
                              ]
                            : [/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]
                    }
                />
        </div>
        )
}

export default Calendar