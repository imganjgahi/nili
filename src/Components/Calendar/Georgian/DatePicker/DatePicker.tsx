import React, { useState, useEffect } from 'react';
import * as utils from '../utils';
import NDate from '@nepo/ndate';
import Header from './Header';
import WeekDays from './WeekDays';
import WeekHeader from './weekHeader';


type IProps = {
    theDate: Date;
    showTime?: boolean;
    max?: Date;
    min?: Date;
}

const CalendarPage: React.FC<IProps> = (props: IProps) => {

    const [mainDate, setDate] = useState<NDate>(new NDate(props.theDate) || new NDate())
    const [mainYear, setYear] = useState<number>(new NDate().year);
    const [mainMonth, setMonth] = useState<number>(0);
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const [mainday, setday] = useState<number>(0);
    const [mainDays, setDays] = useState<any>([])
    const [mainHour, setHour] = useState<number>(0);
    const [mainMinute, setMinute] = useState<number>(0);
    const [calendarModal, showCalendarModal] = useState<boolean>(false);
    const [yearModal, showYearsModal] = useState<boolean>(false);
    const [monthModal, showMonthsModal] = useState<boolean>(false);
    const [daysModal, showDaysModal] = useState<boolean>(false);
    const [hoursModal, showHoursModal] = useState<boolean>(false);
    const [minutesModal, showMinutesModal] = useState<boolean>(false);
    const [modalsOpacity, setOpacity] = useState<number>(1);
    const [timeFormat, setTimeFormat] = useState<"am" | "pm">("am");
    const [years, setyears] = useState<number[]>([]);
    const monthName = utils.MONTH_NAMES;
    const daysOfMonth = utils.MONTH_DAYS;
    const hours = utils.HOURS;
    const secoundHours = utils.SECOUND_HOURS;
    const minutes = utils.MINUTES()
    // const years = utils.YEARS(mainYear)

    useEffect(() => {
        let selectDate = new NDate(props.theDate || new NDate());
        let year = selectDate.year;
        const theMonthIndex = selectDate.month;
        const selectDay = selectDate.day;
        console.log("monthIndex", theMonthIndex)
        setDate(selectDate)
        setYear(year)
        setMonthIndex(theMonthIndex)
        setMonth(theMonthIndex + 1)
        setday(selectDay)
        setyears(utils.YEARS(mainYear))
        setHour(selectDate.hour)
        setMinute(selectDate.minute)
        setTimeFormat(selectDate.hour > 12 || selectDate.hour === 0 ? "pm" : "am")
        setDays(createMonth(year, theMonthIndex))
    }, [])

    const createMonth = (year: number, monthIndex: number) => {
        const cal = new NDate(new Date(year, monthIndex, 1))
        let currentSelectYear = year;
        let theDaysOfMonth = daysOfMonth[monthIndex];
        let dayOfWeek = cal.dayOfWeek();
        if (theDaysOfMonth < 29) {
            if (NDate.isLeapYear(year)) {
                theDaysOfMonth = 29;
            }
        }
        
        console.log("cal: ", cal.format("YYYY-MM-DD"))
        console.log("createMonth: ", monthIndex)
        if (dayOfWeek < 0) {
            dayOfWeek = 6;
        }
        const totalDays = theDaysOfMonth + dayOfWeek;
        const daysArray = [];
        let day = 1;
        for (let i = 0; i < totalDays; i++) {
            if (i < dayOfWeek) {
                daysArray.push(null)
            } else if (i - dayOfWeek < theDaysOfMonth) {
                daysArray.push(new NDate(new Date(currentSelectYear, monthIndex + 1, day)));
                day++;
            }
        }
        return daysArray;
    };

    const resetModals = () => {
        setOpacity(0)
        showYearsModal(false);
        showMonthsModal(false);
        showDaysModal(false)
        showHoursModal(false);
        showMinutesModal(false);
    }
    const changeView = () => {
        setTimeout(() => {
            setOpacity(1)
        }, 100);
    };
    const dayTime = (type: string) => {
        if (type === "h") {
            resetModals()
            showHoursModal(true)
            changeView();
        } else {
            resetModals()
            showMinutesModal(true)
            changeView();
        }
    };
    const pervMonth = (currentMonth: number) => {
        let theMainYear = mainYear;
        currentMonth--;
        if (currentMonth === 0) {
            theMainYear--;
            currentMonth = 12;
        }
        console.log("pervMonth: ", currentMonth)
        const newDate = new NDate(new Date(theMainYear, currentMonth, 1));
        setDays(createMonth(theMainYear, currentMonth - 1));
        setYear(theMainYear)
        setDate(newDate)
        setMonth(currentMonth)
        resetModals()
        showDaysModal(true)
        changeView();
    };
    const nextMonth = (currentMonth: number) => {
        let theMainYear = mainYear;
        currentMonth++;
        if (currentMonth === 13) {
            theMainYear++;
            currentMonth = 1;
        }
        console.log("nextMonth: ", currentMonth)
        const newDate = new NDate(new Date(theMainYear, currentMonth, 1));
        setDays(createMonth(theMainYear, currentMonth - 1));
        setYear(theMainYear)
        setDate(newDate)
        setMonth(currentMonth)
        resetModals()
        showDaysModal(true)
        changeView();

    };

    const daySelected = (y: number, m: number, d: number) => {
        console.log(y, m, d)
    }

    const max = props.max ? new NDate(props.max).date : null;
    const min = props.min ? new NDate(props.min).date : null;

    return (
        <div className="niliDatePicker">
            <Header
                year={mainYear}
                month={mainMonth}
                day={mainday}
                monthName={monthName}
                showHour={hoursModal}
                hour={mainHour}
                minute={mainMinute}
                showMinute={minutesModal}
                header={""}
                dayTime={(val) => dayTime(val)}
                nextMonth={(val) => nextMonth(val)}
                pervMonth={(val) => pervMonth(val)}
                monthModal={() => {
                    resetModals()
                    showMonthsModal(true)
                }}
                yearModal={() => {
                    resetModals()
                    showYearsModal(true)
                }}
                showTime={props.showTime ? true : false}
                model={"DatePicke"} />
                <WeekHeader />
            <WeekDays
                days={mainDays}
                year={mainYear}
                month={mainMonth}
                max={max}
                min={min}
                selectedDate={mainDate}
                daySelected={(y, m, d) => daySelected(y, m, d)}
            />
        </div>
    )
}

export default CalendarPage