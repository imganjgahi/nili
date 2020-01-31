import React from "react";

type IProps = {
    years: number[];
    opacity: number;
    yearSelected: (val: number) => void;
    today: number[];
};
const YearModal = (props: IProps) => {
    const { years, opacity, yearSelected, today } = props;
    return (
        <div className="yearModal" style={{ opacity: opacity }}>
            {years.map((y, i) => {
                return (
                    <div
                        className={y === today[0] ? "years yearActive" : "years"}
                        key={i}
                        onClick={() => yearSelected(y)}>
                        <span> {y} </span>
                    </div>
                );
            })}
        </div>
    );
};

export default YearModal;
