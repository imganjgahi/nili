import React from "react";
import NDate from "@nepo/ndate";

type Iprops = {
    days: NDate[];
    year: number;
    month: number;
    max: Date | null;
    min: Date | null;
    daySelected: (y: number, m: number, d: number) => void;
    selectedDate: NDate;
};
const weekDays = (props: Iprops) => {
    const { year, month, min, max, daySelected, selectedDate, days } = props;
    // console.log(year, month, days)
    const today = new Date()
    return (
        <div className="weekDays">
            {days.map((dayObject, i) => {
                if (!dayObject) {
                    return null;
                }
                let disable = false;
                if (max && max < dayObject.date) {
                    disable = true;
                }
                if (min && dayObject.date < min) {
                    disable = true;
                }
                const activeTodayDate =
                    year === today.getFullYear() && dayObject.date.getMonth() === today.getMonth() && dayObject.date.getDate() === today.getDate();
                const activeDate =
                    dayObject.dayJalali === selectedDate.dayJalali &&
                    dayObject.monthJalali === selectedDate.monthJalali &&
                    dayObject.yearJalali === year;
                const classNames: string[] = ["niliDays"];
                if (disable) {
                    classNames.push("disablead");
                }
                if (!disable && activeDate) {
                    classNames.push("activeTodayDate");
                }
                if (activeTodayDate) {
                    classNames.push("daysActive");
                }
                if (!disable && dayObject.monthJalali !== month) {
                    classNames.push("notCurrent");
                }
                return (
                    <p
                        key={i}
                        className={classNames.join(" ")}
                        onClick={() => {
                            if (!disable) {
                                daySelected(dayObject.year, dayObject.month, dayObject.day);
                            }
                        }}>
                        {dayObject.dayJalali}
                    </p>
                );
            })}
        </div>
    );
};

export default weekDays;
