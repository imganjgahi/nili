import React from "react";
import NDate from "@nepo/ndate";

type Iprops = {
    days: NDate[];
    todayActive: boolean;
    year: number;
    month: number;
    max: Date | null;
    min: Date | null;
    today: number[];
    daySelected: (y: number, m: number, d: number) => void;
    selectedDate: NDate;
};
const weekDays = (props: Iprops) => {
    const { year, month, min, max, today, daySelected, selectedDate } = props;
    return (
        <div className="weekDays">
            {props.days.map((dayObject, i) => {
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
                    year === today[0] && dayObject.monthJalali === today[1] && dayObject.dayJalali === today[2];
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
                                daySelected(dayObject.yearJalali, dayObject.monthJalali, dayObject.dayJalali);
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
