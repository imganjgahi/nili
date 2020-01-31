import React, { Component } from "react";
import WeekHeader from "./datePicker/weekHeader";
import CalendarHeader from "./datePicker/calendarHeader";
import WeekDays from "./datePicker/weekDays";
import MonthModal from "./datePicker/monthModal";
import YearModal from "./datePicker/yearModal";
import HourModal from "./datePicker/hourModal";
import MinuteModal from "./datePicker/minuteModal";
import * as utils from "./utils";
import NDate from "@nepo/ndate";

class JalaaliPicker extends Component {
    state = {
        date: "",
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        opacity: 1,
        monthIndex: 0,
        daysOfMonth: utils.MONTH_DAYS,
        monthName: utils.MONTH_NAMES,
        hours: utils.HOURS,
        secoundHours: utils.SECOUND_HOURS,
        minutes: [],
        years: [],
        showCalendar: false,
        showYears: false,
        showMonths: false,
        showDays: false,
        showHour: false,
        showMinute: false,
        todayActive: false,
        days: [],
        timeFormat: "am",
        selectedDate: [],
    };

    componentDidMount() {
        let mainDate = new NDate(this.props.date || new Date());
        let mainYear = mainDate.yearJalali;
        const monthIndex = mainDate.monthJalali;
        const mainDay = mainDate.dayJalali;
        this.setState(
            {
                ...this.state,
                date: mainDate,
                year: mainYear,
                month: monthIndex,
                monthIndex: monthIndex,
                day: mainDay,
                showDays: true,
                showCalendar: true,
                years: utils.YEARS(mainYear),
                minutes: utils.MINUTES(),
                hour: mainDate.hour,
                minute: mainDate.minute,
                timeFormat: mainDate.hour > 12 || mainDate.hour === 0 ? "pm" : "am",
            },
            () => {
                const days = this.createMonth(mainDate, mainYear, monthIndex, mainDay);
                this.setState({ days: days });
            },
        );
    }

    createMonth = (cal, year, monthIndex, currentDay) => {
        let ny = year;
        let y = year;
        let by = year;

        let monthBeforeIndex = monthIndex - 1;
        if (monthBeforeIndex === 0) {
            monthBeforeIndex = 12;
            by--;
        }

        let monthNextIndex = monthIndex + 1;
        if (monthNextIndex === 13) {
            monthNextIndex = 1;
            ny = year + 1;
        }
        let daysOfBeforMonth = this.state.daysOfMonth[monthBeforeIndex - 1];
        if (daysOfBeforMonth < 30) {
            if (NDate.isLeapYearJalali(year - 1)) {
                daysOfBeforMonth = 30;
            }
        }
        let dayOfWeekNextMonth = 7 - new NDate([ny, monthNextIndex, 1]).dayOfWeekJalali();
        if (dayOfWeekNextMonth === 7) {
            dayOfWeekNextMonth = 0;
        }

        let daysOfMonth = this.state.daysOfMonth[monthIndex - 1];
        let dayOfWeek = cal.dayOfWeekJalali();
        if (daysOfMonth < 30) {
            if (NDate.isLeapYearJalali(year)) {
                daysOfMonth = 30;
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
        const days = daysOfMonth + dayOfWeek + dayOfWeekNextMonth;
        const daysArray = [];
        let day = 1;
        let dayBefore = daysOfBeforMonth + 1 - dayOfWeek;
        let dayAfter = 1;
        for (let i = 0; i < days; i++) {
            if (i >= dayOfWeek && i - dayOfWeek < daysOfMonth) {
                daysArray.push(new NDate([y, monthIndex, day]));
                day++;
            }

            if (i < dayOfWeek) {
                daysArray.push(new NDate([by, monthBeforeIndex, dayBefore]));
                dayBefore++;
            }
            if (i - dayOfWeek >= daysOfMonth) {
                daysArray.push(new NDate([ny, monthNextIndex, dayAfter]));
                dayAfter++;
            }
        }
        return daysArray;
    };

    nextMonth = (currentMonth) => {
        let mainYear = this.state.year;
        if (currentMonth === 12) {
            mainYear++;
            currentMonth = 0;
        }
        const newDate = new NDate([mainYear, currentMonth + 1, 1]);
        const days = this.createMonth(newDate, mainYear, currentMonth + 1, 1);
        this.setState({
            ...this.state,
            date: newDate,
            month: currentMonth + 1,
            opacity: 0,
            year: mainYear,
            days: days,
            todayActive: true,
            showDays: true,
            showYears: false,
            showHour: false,
            showMinute: false,
            showMonths: false,
        });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };

    pervMonth = (currentMonth) => {
        let mainYear = this.state.year;
        if (currentMonth === 1) {
            mainYear--;
            currentMonth = 13;
        }
        const newDate = new NDate([mainYear, currentMonth - 1, 1]);
        const days = this.createMonth(newDate, mainYear, currentMonth - 1, 1);
        this.setState({
            ...this.state,
            date: newDate,
            month: currentMonth - 1,
            opacity: 0,
            year: mainYear,
            days: days,
            todayActive: true,
            showDays: true,
            showYears: false,
            showHour: false,
            showMinute: false,
            showMonths: false,
        });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };

    monthModal = () =>
        this.setState({ showYears: false, showMonths: true, showDays: false, showHour: false, showMinute: false });

    yearModal = () =>
        this.setState({ showYears: true, showMonths: false, showDays: false, showHour: false, showMinute: false });

    yearSelected = (y) => {
        this.setState({ year: y, showYears: false, showMonths: true, opacity: 0 });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };

    monthSelected = (monthSelected) => {
        const newDate = new NDate([this.state.year, monthSelected, 1]);
        const days = this.createMonth(newDate, this.state.year, monthSelected, 1);
        this.setState({
            month: monthSelected,
            showYears: false,
            showMonths: false,
            showDays: true,
            days: days,
            opacity: 0,
            todayActive: true,
        });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };

    daySelected = (year, month, daySelected) => {
        const newDate = new NDate([year, month, daySelected, this.state.hour, this.setState.minute]);
        if (!this.props.setTime) {
            this.setState({
                ...this.state,
                day: daySelected,
                todayActive: false,
                date: newDate,
                selectedDate: newDate,
            });
            this.props.sendDate({ year: year, month: month, day: daySelected });
            return;
        }
        this.setState({
            ...this.state,
            year: year,
            month: month,
            day: daySelected,
            todayActive: false,
            opacity: 0,
            hour: this.state.hour,
            minute: this.state.minute,
            showDays: false,
            showHour: true,
            selectedDate: newDate,
        });

        setTimeout(() => {
            this.changeView();
        }, 100);
    };

    hourSelected = (h) => {
        this.setState({ hour: h, showMinute: true, showHour: false, opacity: 0 });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };
    minuteSelected = (m) => {
        const newDate = new NDate([this.state.year, this.state.month, this.state.day]);
        const days = this.createMonth(newDate, this.state.year, this.state.month, this.state.day);
        this.setState({ selectedDate: newDate, minute: m, days: days, showDays: true, showMinute: false, opacity: 0 });
        this.props.sendDate({
            year: this.state.year,
            month: this.state.month,
            day: this.state.day,
            hour: this.state.hour,
            minute: m,
        });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };
    dayTime = (type) => {
        if (type === "h") {
            this.setState({ opacity: 0, showMinute: false, showHour: true });
            setTimeout(() => {
                this.changeView();
            }, 100);
        } else {
            this.setState({ opacity: 0, showMinute: true, showHour: false });
            setTimeout(() => {
                this.changeView();
            }, 100);
        }
    };

    goToday = () => {
        const today = new NDate().getJalali();
        const days = this.createMonth(new NDate(), today[0], today[1], today[2]);
        this.setState({
            ...this.state,
            days: days,
            opacity: 0,
            year: today[0],
            month: today[1],
            day: today[2],
            date: new NDate(),
            showDays: true,
            showYears: false,
            showMonths: false,
            showHour: false,
            showMinute: false,
            todayActive: true,
        });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };
    goClock = () => {
        this.setState({
            ...this.state,
            showDays: false,
            showYears: false,
            showMonths: false,
            showHour: true,
            showMinute: false,
            todayActive: false,
        });
        setTimeout(() => {
            this.changeView();
        }, 100);
    };
    onClose = () => {
        const selectedDate = this.state.selectedDate;
        this.props.sendDate({
            year: selectedDate.yearJalali,
            month: selectedDate.monthJalali,
            day: selectedDate.dayJalali,
            hour: this.state.hour,
            minute: this.state.minute,
        });
    };

    changeView = () => {
        this.setState({ ...this.state, opacity: 1 });
    };

    timeFormatHandler(format) {
        let hour = this.state.hour;
        if (format === "pm" && hour <= 12 && hour !== 0) {
            hour += 12;
        }
        if (format === "am" && hour >= 12) {
            hour -= 12;
        }
        if (hour === 24) {
            hour = 0;
        }
        if (format === "am" && hour === 0) {
            hour = 12;
        }

        this.setState({ timeFormat: format, hour: hour, clockHand: 180 });
    }

    render() {
        const today = new NDate().getJalali();
        const max = this.props.max ? new NDate(this.props.max).date : null;
        const min = this.props.min ? new NDate(this.props.min).date : null;
        if (!this.state.showCalendar) {
            return null;
        }
        return (
            <div className="niliCalendar">
                <CalendarHeader
                    year={this.state.year}
                    month={this.state.month}
                    day={this.state.day}
                    monthName={this.state.monthName}
                    showHour={this.state.showHour}
                    hour={this.state.hour}
                    minute={this.state.minute}
                    showMinute={this.state.showMinute}
                    header={this.props.header}
                    dayTime={(val) => this.dayTime(val)}
                    nextMonth={(val) => this.nextMonth(val)}
                    pervMonth={(val) => this.pervMonth(val)}
                    monthModal={this.monthModal}
                    yearModal={this.yearModal}
                    // model="datePicker"
                />
                {this.state.showDays ? (
                    <bdo dir="rtl">
                        <div className="week" style={{ opacity: this.state.opacity }}>
                            <WeekHeader />
                            <WeekDays
                                days={this.state.days}
                                todayActive={this.state.todayActive}
                                year={this.state.year}
                                month={this.state.month}
                                day={this.state.day}
                                max={max}
                                min={min}
                                today={today}
                                selectedDate={this.state.selectedDate}
                                daySelected={(y, m, d) => this.daySelected(y, m, d)}
                            />
                        </div>
                    </bdo>
                ) : null}

                {this.state.showMonths ? (
                    <MonthModal
                        monthName={this.state.monthName}
                        opacity={this.state.opacity}
                        monthSelected={(month) => this.monthSelected(month)}
                    />
                ) : null}

                {this.state.showYears ? (
                    <YearModal
                        years={this.state.years}
                        opacity={this.state.opacity}
                        yearSelected={(year) => this.yearSelected(year)}
                        today={today}
                    />
                ) : null}

                {this.state.showHour || this.state.showMinute ? (
                    <div style={{ position: "relative" }}>
                        {this.state.showHour ? (
                            <HourModal
                                hour={this.state.hour}
                                opacity={this.state.opacity}
                                showHour={this.state.showHour}
                                hours={this.state.hours}
                                secoundHours={this.state.secoundHours}
                                timeFormat={this.state.timeFormat}
                                hourSelected={(hour) => this.hourSelected(hour)}
                            />
                        ) : null}
                        {this.state.showMinute ? (
                            <MinuteModal
                                minute={this.state.minute}
                                opacity={this.state.opacity}
                                minutes={this.state.minutes}
                                minuteSelected={(min) => this.minuteSelected(min)}
                            />
                        ) : null}
                        <div className="ampm">
                            <div
                                className={this.state.timeFormat === "am" ? "am active" : "am"}
                                onClick={() => this.timeFormatHandler("am")}>
                                AM
                            </div>
                            <div
                                className={this.state.timeFormat === "pm" ? "pm active" : "pm"}
                                onClick={() => this.timeFormatHandler("pm")}>
                                PM
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="calendarBtns">
                    <button className="niliactioButton" onClick={this.goToday}>
                        امروز
                    </button>
                    {this.props.setTime && (
                        <button className="niliactioButton" onClick={this.goClock}>
                            ساعت
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default JalaaliPicker;
