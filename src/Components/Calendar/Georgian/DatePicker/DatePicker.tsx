import React, {useState, useEffect} from 'react';
import * as utils from '../utils';
import NDate from '@nepo/ndate';
import Header from './Header';
import WeekDays from './WeekDays';


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
    const [mainDays, setDays] = useState<NDate[]>([])
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
        const monthIndex = selectDate.month;
        const selectDay = selectDate.day;
        setDate(selectDate)
        setYear(year)
        setMonthIndex(monthIndex)
        setMonth(monthIndex + 1)
        setday(selectDay)
        setyears(utils.YEARS(mainYear))
        setHour(selectDate.hour)
        setMinute(selectDate.minute)
        setTimeFormat(selectDate.hour > 12 || selectDate.hour === 0 ? "pm" : "am")
        setDays(createMonth(selectDate, year, monthIndex, selectDay))
    }, [])


    // console.log(mainDate.date, mainYear, mainMonth, monthIndex, mainday, mainHour, mainMinute, years, timeFormat)
    // state = {
    //     date: "",
    //     year: 0,
    //     month: 0,
    //     day: 0,
    //     hour: 0,
    //     minute: 0,
    //     opacity: 1,
    //     monthIndex: 0,
    //     daysOfMonth: utils.MONTH_DAYS,
    //     monthName: utils.MONTH_NAMES,
    //     hours: utils.HOURS,
    //     secoundHours: utils.SECOUND_HOURS,
    //     minutes: [],
    //     years: [],
    //     showCalendar: false,
    //     showYears: false,
    //     showMonths: false,
    //     showDays: false,
    //     showHour: false,
    //     showMinute: false,
    //     todayActive: false,
    //     days: [],
    //     timeFormat: "am",
    //     selectedDate: [],
    // };

    const createMonth = (cal: NDate, year: number, monthIndex: number, currentDay: number) => {
        
        let ny = year;
        let currentSelectYear = year;
        let by = year;

        let monthBeforeIndex = monthIndex - 1;
        if (monthBeforeIndex === -1) {
            monthBeforeIndex = 12;
            by--;
        }

        let monthNextIndex = monthIndex + 1;
        if (monthNextIndex === 12) {
            monthNextIndex = 1;
            ny = year + 1;
        }
        let daysOfBeforMonth = daysOfMonth[monthBeforeIndex];
        if (daysOfBeforMonth < 29) {
            if (NDate.isLeapYear(year - 1)) {
                daysOfBeforMonth = 29;
            }
        }
        let dayOfWeekNextMonth = 7 - new NDate([ny, monthNextIndex, 1]).dayOfWeek();
        if (dayOfWeekNextMonth === 7) {
            dayOfWeekNextMonth = 0;
        }

        let theDaysOfMonth = daysOfMonth[monthIndex];
        let dayOfWeek = cal.dayOfWeek();
        if (theDaysOfMonth < 29) {
            if (NDate.isLeapYear(year)) {
                theDaysOfMonth = 29;
            }
        }

        if (currentDay > 1) {
            for (let i = 1; i < currentDay; i++) {
                dayOfWeek--;
                if (dayOfWeek < 0) {
                    dayOfWeek = 6;
                }
            }
        }
        const days = theDaysOfMonth + dayOfWeek + dayOfWeekNextMonth;
        const daysArray = [];
        let day = 1;
        let dayBefore = daysOfBeforMonth + 1 - dayOfWeek;
        let dayAfter = 1;
        for (let i = 0; i < days; i++) {
            if (i >= dayOfWeek && i - dayOfWeek < theDaysOfMonth) {
                console.log(" currentSelectYear: ", currentSelectYear, monthIndex + 1, day)
                daysArray.push(new NDate(new Date(currentSelectYear, monthIndex + 1, day)));
                day++;
            }

            if (i < dayOfWeek) {
                console.log(" monthBeforeIndex: ", by, monthBeforeIndex + 1, dayBefore)
                daysArray.push(new NDate(new Date(by, monthBeforeIndex + 1, dayBefore)));
                dayBefore++;
            }
            if (i - dayOfWeek >= theDaysOfMonth) {
                console.log(" monthNextIndex: ", ny, monthNextIndex + 1, dayAfter)
                daysArray.push(new NDate(new Date(ny, monthNextIndex + 1, dayAfter)));
                dayAfter++;
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
   const  dayTime = (type: string) => {
        if (type === "h") {
            resetModals()
            showHoursModal(true)
            changeView();
        } else {
            resetModals()
            showMinutesModal(true)
            changeView();
            // this.setState({ opacity: 0, showMinute: true, showHour: false });
            // setTimeout(() => {
            //     this.changeView();
            // }, 100);
        }
    };
    const pervMonth = (currentMonth: number) => {
        let theMainYear = mainYear;
        if (currentMonth === 1) {
            theMainYear--;
            currentMonth = 13;
        }
        const newDate = new NDate([theMainYear, currentMonth - 1, 1]);
        setYear(theMainYear)
        setDays(createMonth(newDate, theMainYear, currentMonth - 1, 1));
        setDate(newDate)
        setMonth(currentMonth - 1)
        resetModals()
        showDaysModal(true)
        changeView();
        // this.setState({
        //     ...this.state,
        //     date: newDate,
        //     month: currentMonth - 1,
        //     opacity: 0,
        //     year: mainYear,
        //     days: days,
        //     todayActive: true,
        //     showDays: true,
        //     showYears: false,
        //     showHour: false,
        //     showMinute: false,
        //     showMonths: false,
        // });
        // setTimeout(() => {
        //     this.changeView();
        // }, 100);
    };
    const nextMonth = (currentMonth: number) => {
        let theMainYear = mainYear;
        if (currentMonth === 12) {
            theMainYear++;
            currentMonth = 0;
        }
        const newDate = new NDate([theMainYear, currentMonth + 1, 1]);
        setYear(theMainYear)
        setDays(createMonth(newDate, theMainYear, currentMonth + 1, 1));
        setDate(newDate)
        setMonth(currentMonth + 1)
        resetModals()
        showDaysModal(true)
        changeView();
        
    };

    const daySelected = (y: number, m: number, d: number) => {
        console.log( y, m, d)
    }

    const max = props.max ? new NDate(props.max).date : null;
    const min = props.min ? new NDate(props.min).date : null;

    return (
        <div>
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
            model={"DatePicke"}  />
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