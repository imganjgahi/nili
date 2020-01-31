import React from "react";
import JalaaliPicker from "./JalaaliPicker";
import MaskedInput from "react-text-mask";
import NDate from "@nepo/ndate";
import NiliCalendar from "./NiliCalendar";

class Calendar extends React.Component {
    myCalRef;
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: "",
            selectedDateTime: "",
            inputValue: "",
            showNili: false,
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
        };
        this.myCalRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value && !nextProps.value) {
            this.setState({ inputValue: "", selectedDate: "", selectedDateTime: "" });
        }
    }

    handleClickOutside = (e) => {
        if (this.myCalRef.current && !this.myCalRef.current.contains(e.target)) {
            this.setState({ showNili: false });
        }
    };
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        const showNili = this.props.datePicker ? true : false;
        let inputValue = "";
        if (this.props.value) {
            inputValue = !this.props.setTime
                ? new NDate(this.props.value).formatJalali("YYYY/MM/DD")
                : new NDate(this.props.value).formatJalali("YYYY/MM/DD HH:mm");
        }
        this.setState({ showNili, inputValue });
    }
    createAutoCorrectedDatePipe = (dateFormat) => (conformedValue) => {
        const indexesOfPipedChars = [];
        const dateFormatArray = dateFormat.split(/[^dmyHMS]+/);
        const maxValue = { dd: 31, mm: 12, yy: 99, yyyy: 9999, HH: 23, MM: 59, SS: 59 };
        const minValue = { dd: 1, mm: 1, yy: 0, yyyy: 1, HH: 0, MM: 0, SS: 0 };
        const conformedValueArr = conformedValue.split("");
        dateFormatArray.forEach((format) => {
            const position = dateFormat.indexOf(format);
            const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

            if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
                conformedValueArr[position + 1] = conformedValueArr[position];
                conformedValueArr[position] = 0;
                indexesOfPipedChars.push(position);
            }
        });

        const isInvalid = dateFormatArray.some((format) => {
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

    datepickerHandler = (value) => {
        const year = value.year;
        const month = value.month;
        const day = value.day;
        const hour = value.hour ? value.hour : 0;
        const minute = value.minute ? value.minute : 0;
        const showNili = this.props.datePicker ? true : false;
        const convertDate = new NDate([year, month, day, hour, minute]);
        const selectedDate = `${year}/${month > 9 ? month : "0" + month}/${day > 9 ? day : "0" + day}`;
        const selectedDateTime = `${year}/${month > 9 ? month : "0" + month}/${day > 9 ? day : "0" + day} ${
            hour > 9 ? hour : "0" + hour
        }:${minute > 9 ? minute : "0" + minute}`;
        this.setState({
            selectedDate: selectedDate,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            selectedDateTime: selectedDateTime,
            showNili: showNili,
        });
        const selectedConvertDate = `${convertDate.year}-${
            convertDate.month + 1 > 9 ? convertDate.month + 1 : "0" + (convertDate.month + 1)
        }-${convertDate.day > 9 ? convertDate.day : "0" + convertDate.day}`;
        const selectedConvertDateTime = `${convertDate.year}-${
            convertDate.month + 1 > 9 ? convertDate.month + 1 : "0" + (convertDate.month + 1)
        }-${convertDate.day > 9 ? convertDate.day : "0" + convertDate.day} ${hour > 9 ? hour : "0" + hour}:${
            minute > 9 ? minute : "0" + minute
        }`;

        this.onChange(this.props.setTime ? selectedConvertDateTime : selectedConvertDate);
    };
    onChange = (value) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    onChangeHandler = (event) => {
        const e = event.target.value;
        let stripedval = e.replace(/_/g, "");
        if ((!this.props.setTime && stripedval.length === 10) || (this.props.setTime && stripedval.length === 16)) {
            const y = event.target.value.substr(0, 4);
            const m = event.target.value.substr(5, 2);
            const d = event.target.value.substr(8, 2);
            const h = event.target.value.substr(11, 2);
            const mm = event.target.value.substr(14, 2);

            if (this.props.max && new NDate(this.props.max).date < new NDate([+y, +m, +d]).date) {
                const newDate = new NDate(this.props.max).getJalali();
                this.datepickerHandler({ year: newDate[0], month: newDate[1], day: newDate[2], hour: +h, minute: +mm });
            } else {
                this.datepickerHandler({ year: +y, month: +m, day: +d, hour: +h, minute: +mm });
            }

            if (this.props.min && new NDate([+y, +m, +d]).date < new NDate(this.props.min).date) {
                const newDate = new NDate(this.props.min).getJalali();
                this.datepickerHandler({ year: newDate[0], month: newDate[1], day: newDate[2], hour: +h, minute: +mm });
            } else {
                this.datepickerHandler({ year: +y, month: +m, day: +d, hour: +h, minute: +mm });
            }
        }
    };

    render() {
        const autoCorrectedDatePipe = this.props.setTime
            ? this.createAutoCorrectedDatePipe("yyyy/mm/dd HH:MM")
            : this.createAutoCorrectedDatePipe("yyyy/mm/dd");
        const inputDate =
            this.state.selectedDate === ""
                ? this.state.inputValue
                : this.props.setTime
                ? this.state.selectedDateTime
                : this.state.selectedDate;
        let propsDate = new NDate().date;
        if (!this.props.value) {
            if (this.props.min && new NDate(this.props.min).date > new NDate().date) {
                propsDate = this.props.min;
            } else if (this.props.max && new NDate(this.props.max).date < new NDate().date) {
                propsDate = this.props.max;
            } else if (this.props.mainDate) {
                propsDate = this.props.mainDate;
            } else {
                propsDate = new NDate().date;
            }
        } else {
            propsDate = this.props.value;
        }
        return (
            <div className="Main" ref={this.myCalRef}>
                {this.props.calendar ? (
                    <NiliCalendar
                        max={this.props.max}
                        header={this.props.header}
                        min={this.props.min}
                        date={propsDate}
                        setTime={this.props.setTime}
                        sendDate={(value) => this.datepickerHandler(value)}
                        changeType={(value) => this.setState({ type: value })}
                    />
                ) : null}
                {!this.props.calendar && this.state.showNili ? (
                    <JalaaliPicker
                        max={this.props.max}
                        header={this.props.header}
                        min={this.props.min}
                        date={
                            this.state.selectedDate === ""
                                ? propsDate
                                : new NDate([
                                      this.state.year,
                                      this.state.month,
                                      this.state.day,
                                      this.state.hour,
                                      this.state.minute,
                                  ]).date
                        }
                        setTime={this.props.setTime}
                        showTime={this.props.showTime}
                        sendDate={(value) => this.datepickerHandler(value)}
                        changeType={(value) => this.setState({ type: value })}
                    />
                ) : null}

                <MaskedInput
                    className={this.props.calendar ? "txtInput hidden" : "txtInput"}
                    onClick={() => this.setState({ showNili: true })}
                    name="date"
                    value={inputDate}
                    keepCharPositions={true}
                    guide={true}
                    pipe={autoCorrectedDatePipe}
                    onChange={this.onChangeHandler}
                    placeholder={this.props.placeholder}
                    mask={
                        this.props.setTime
                            ? [
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
        );
    }
}
export default Calendar;
