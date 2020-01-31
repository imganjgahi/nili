import React from 'react';
//@ts-ignore
import next from "../../bg/next.png";
//@ts-ignore
import previus from "../../bg/perv.png";

type IProps = {
    day: number;
    month: number;
    year: number;
    showHour: boolean;
    showMinute: boolean;
    monthModal: () => void;
    yearModal: () => void;
    header: string;
    showTime: boolean;
    monthName: string[];
    hour: number;
    minute: number;
    dayTime: (value: string) => void;
    nextMonth: (value: number) => void;
    pervMonth: (value: number) => void;
    model: string;
};

const Header: React.FC<IProps> = (props: IProps) => {

    const {
        year,
        month,
        day,
        monthName,
        showHour,
        hour,
        minute,
        showMinute,
        header,
        dayTime,
        nextMonth,
        pervMonth,
        monthModal,
        yearModal,
        model,
    } = props;
    return (
        <div
            className={model === "DatePicke" ? "pickerHeader" : "header"}
            style={{ backgroundImage: `url(${header})` }}>
            <div className={model === "DatePicke" ? "pickerCurrentDate" : "jallaliCurrentDate"}>
                <p> {`${day > 0 ? day : ""} ${monthName[month - 1]} ${year > 0 ? year : ""}`}</p>
                {showHour || showMinute ? (
                    <p className="jallaliCurrentTime">
                        <span onClick={() => dayTime("h")}>{hour > 9 ? hour : "0" + hour}</span>
                        <span>:</span>
                        <span onClick={() => dayTime("m")}>{minute > 9 ? minute : "0" + minute}</span>
                    </p>
                ) : null}
            </div>
            {!props.showTime && (
                <div className="calendarAction">
                    <button className="NiliCalbtn pervBtn" onClick={() => nextMonth(month)}>
                        {" "}
                        <img alt="" src={previus} style={{ width: "20px" }} />{" "}
                    </button>
                    <div>
                        <span onClick={monthModal}> ماه </span> {" / "}
                        <span onClick={yearModal}> سال </span>
                    </div>
                    <button className="NiliCalbtn nextBtn" onClick={() => pervMonth(month)}>
                        {" "}
                        <img alt="" src={next} style={{ width: "20px" }} />{" "}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header