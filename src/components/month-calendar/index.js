import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import { Select, Input } from 'antd';

import { MonthCalendarWrapper } from "./style";
import { beforeAfterTenYears } from "../../utils/time-operate";

const { Option } = Select;

export default memo(function HYMonthCalendar(props) {
    const { getTime, disable } = props;
    const [yearRange, setYear] = useState(beforeAfterTenYears(new Date().getFullYear()));
    const [curYear, setCurYear] = useState(new Date().getFullYear());
    const [curMonth, setCurMonth] = useState(new Date().getMonth());
    const monthOptions = useRef(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

    const handleChangeCurYear = useCallback((value) => {
        setYear(beforeAfterTenYears(value));
        setCurYear(value);
    }, []);

    const handleChangeCurMonth = useCallback((value) => {
        setCurMonth(value)
    }, []);

    useEffect(() => {
        getTime(curYear, curMonth);
    }, [curMonth, curYear, getTime]);
    return (
        <MonthCalendarWrapper>
            <Input.Group compact className="year-select">
                <Select defaultValue={yearRange[10]}  style={{ width: '100px' }} onChange={handleChangeCurYear} disabled={!disable}>
                    {
                        yearRange && yearRange.map((item) => {
                            return (<Option value={item} key={item}>{item}</Option>)
                        })
                    }
                </Select>
            </Input.Group>
            <Input.Group compact className="month-select">
                <Select defaultValue={new Date().getMonth()}  style={{ width: '100px' }} onChange={handleChangeCurMonth} disabled={!disable}>
                    {
                        monthOptions?.current?.map((item, index) => {
                            return (<Option value={index} key={item}>{item}</Option>)
                        })
                    }
                </Select>
            </Input.Group>
        </MonthCalendarWrapper>
    )
})
