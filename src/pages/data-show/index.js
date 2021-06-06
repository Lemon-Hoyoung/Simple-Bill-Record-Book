import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, shallowEqual } from "react-redux"
import { DataShowWrapper } from './style';

import { dataFilter, kidnapFilter, incomeCalculate, itemizeSort } from "../../utils/file-analyze";

import VirtualList from "../../components/virtual-list"

export default memo(function HYDataShow() {
    const [currentBill, setCurBill] = useState([]);

    const totalHeight = useMemo(() => {
        return currentBill.length > 16 ? 800 : currentBill.length < 6 ? 300 : currentBill.length * 50;
    }, [currentBill]);

    const { dataSet, currentTime, currentType, timeSelect } = useSelector(state => ({
        dataSet: state.getIn(["manager", "dataSet"]),
        currentTime: state.getIn(["manager", "currentTime"]),
        currentType: state.getIn(["manager", "currentType"]),
        timeSelect: state.getIn(["manager", "timeFilter"])
    }), shallowEqual);

    const timeFilter = useCallback((objArr) => {
        return objArr.filter((item) => {
            return Number(item.time) >= currentTime[0] && Number(item.time) < currentTime[1];
        })
    }, [currentTime]);

    const typeFilter = useCallback((objArr) => {
        return currentType === "所有分类" ? objArr : objArr.filter((item) => {
            return item.category === currentType;
        });
    }, [currentType])

    useEffect(() => {
        //timeSelect为true表示选择了某个月份
        setCurBill(dataFilter(dataSet, [timeSelect ? timeFilter : kidnapFilter, timeSelect ? itemizeSort("amount") : itemizeSort("time"), typeFilter]))
    }, [currentType, currentTime, dataSet, timeFilter, typeFilter, timeSelect]);
    return (
        <DataShowWrapper>
            <div className="bill-show">
                <div className="mainContent">
                    <div className="head">
                        <span className="time">时间</span>
                        <span className="type">类型</span>
                        <span className="category">分类</span>
                        <span className="amount">金额</span>
                    </div>
                    <div className="content" style={{ height: totalHeight + "px"}}>
                        <VirtualList appearH={totalHeight} itemH={50} >
                            {
                                currentBill && currentBill.map((item, index) => {
                                    return (<div key={item.time + item.amount + item.category} className="item">
                                        <span className="time">{new Date(Number(item.time)).toISOString()}</span>
                                        <span className="type">{Number(item.type) ? "收入":"支出"}</span>
                                        <span className="category">{item.category}</span>
                                        <span className="amount">{item.amount}</span>
                                    </div>)
                                })
                            }
                        </VirtualList>
                            {
                                currentBill.length === 0 ? <p className="tips">当前无账单信息</p> : null
                            }
                    </div>
                    <div className="statistics">
                        <span className="expenses">支出：
                            <b>
                                {
                                    incomeCalculate(currentBill, "0")
                                }
                            </b>
                        </span>
                        <span className="receipts">收入：
                            <b>
                                {
                                    incomeCalculate(currentBill, "1")
                                }
                            </b>
                        </span>
                        <span className="netIncome">净收益：
                            <b>
                                {
                                    incomeCalculate(currentBill, "1") - incomeCalculate(currentBill, "0")
                                }
                            </b>
                        </span>
                    </div>
                </div>
            </div>
        </DataShowWrapper>
    )
})
