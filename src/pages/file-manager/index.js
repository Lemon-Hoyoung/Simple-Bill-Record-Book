import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { FileManagerWrapper } from './style';
import { Input, Select, Checkbox, Popover } from "antd";

import HYMonthCalendar from "../../components/month-calendar"

import HYFileUploader from "../../components/file-upload"

import { compose, CSVFileAnalyze, objectFindInArray, fileReader, buildMap, dataMap, mapRegister, kidnapFilter, dataFilter } from "../../utils/file-analyze"

import { modifyMapSet, modifyDataSet, addDataSet, setCurrentType, setCurrentTime, setTimeFilter } from './store/actionCreators';
const { Option } = Select;

export default memo(function HYFileManager() {
    const [importedData, setImported] = useState([]);
    const [importedInfo, setInfo] = useState([]);
    const [importPolicy, setPolicy] = useState(0);
    const [billTypes, setTypes] = useState([]);

    const dispatch = useDispatch();

    const { keyMap, timeSelect, dataSet } = useSelector((state) => ({
        keyMap: state.getIn(["manager", "keyMap"]),
        timeSelect: state.getIn(["manager", "timeFilter"]),
        dataSet: state.getIn(["manager", "dataSet"])
    }), shallowEqual);

    useEffect(() => {
        mapRegister(dataMap, ["category"], keyMap);
        dataFilter(dataSet, [dataMap, (res) => { dispatch(modifyDataSet(res)); }])
    }, [keyMap, dispatch]);

    const onPanelChange = useCallback((year, month) => {
        dispatch(setCurrentTime(year, month));
    }, [dispatch]);

    const onCheckChange = useCallback((e) => {
        dispatch(setTimeFilter(!e.target.checked));
    }, [dispatch])

    //获取所有type字段
    const getTypes = useCallback((files) => {
        const types = [];
        Array.isArray(files) && files.map((item) => {
            types.push(item.name);
            return item;
        });
        return types;
    }, []);

    //检测导入文件字符串的title中是否完整包含checkArray中的字段，是，则校验成功执行successCb回调，否，则返回undefined并且弹出提示窗口
    const titleCheck = useCallback((checkArray, sucessCb, ...args) => {
        return (fileText) => {
            const textArray = fileText.split('\n');
            const fileTitleArray = textArray[0].trim().split(',');
            let checkSuccess = true;
            checkArray.map((item) => {
                checkSuccess = fileTitleArray.indexOf(item) === -1 ? false : true;
                return item;
            });
            checkSuccess && sucessCb(...args);
            return checkSuccess ? fileText : alert("文件格式错误");
        }
    }, []);

    const handleSetPolicy = useCallback((value) => {
        setPolicy(value === "reImport" ? 0 : 1);
    }, []);

    const handleSetType = useCallback((value) => {
        dispatch(setCurrentType(value));
    }, [dispatch]);

    const importData = useCallback((input) => {
        let file = input.files[0];

        if (importPolicy === 1) { //连续导入
            if (objectFindInArray(importedData, "name", file.name) === -1) {
                fileReader(file, [titleCheck(["category", "amount", "type", "time"], setImported, [...importedData, file]), CSVFileAnalyze, dataMap, (res) => { dispatch(addDataSet(res)); }])
            } else {
                alert("重复导入");
            }
        } else if (importPolicy === 0) { //重新导入
            setImported([])
            fileReader(file, [titleCheck(["category", "amount", "type", "time"], setImported, [file]), CSVFileAnalyze, dataMap, (res) => { dispatch(modifyDataSet(res)); }])
        }
      }, [dispatch, importPolicy, importedData, titleCheck]);

    const importInfo = useCallback((input) => {
        let file = input.files[0];

        setInfo([]);
        fileReader(file, [titleCheck(["id", "name"], setInfo, [file]), CSVFileAnalyze, kidnapFilter(compose(setTypes, getTypes)), buildMap, (res) => { dispatch(modifyMapSet(res)); }])
    }, [dispatch, getTypes, titleCheck]);

    const billContent = useMemo(() => {
        return importedData && importedData.map((item) => {
            return (<div key={item.name} className="file-item">{item.name}</div>);
        })
    }, [importedData])

    const infoContent = useMemo(() => {
        return importedInfo && importedInfo.map((item) => {
            return (<div key={item.name} className="file-item">{item.name}</div>)
        })
    }, [importedInfo])
    return (
        <FileManagerWrapper>
            <div className="mainContent">
                <div className="file-operate">
                    <HYFileUploader uploadCb={importData} className="file-import" >导入账单文件</HYFileUploader>
                    <Input.Group compact className="file-select">
                        <Select defaultValue="reImport"  style={{ width: '100px' }} onChange={handleSetPolicy}>
                            <Option value="reImport">重新导入</Option>
                            <Option value="continueImport">连续导入</Option>
                        </Select>
                    </Input.Group>
                    <Popover placement="rightTop" content={billContent} title="已导入的账单文件：" className="popBill pop">
                        <div className="fileIcon"></div>
                    </Popover>
                    <Popover placement="leftTop" content={infoContent} title="已导入的说明文件：" className="popInfo pop">
                        <div className="fileIcon"></div>
                    </Popover>
                    <HYFileUploader uploadCb={importInfo} className="file-info">导入账单字段说明文件</HYFileUploader>
                </div>
                <div className="file-filter">
                    <span className="file-time">时间：</span>
                        <HYMonthCalendar getTime={onPanelChange} disable={timeSelect}/>
                        <Checkbox onChange={onCheckChange} className="allTimeCheck" defaultChecked>查看所有时间的账单</Checkbox>
                    <span className="file-type">分类：</span>
                    <Input.Group compact className="type-select">
                        <Select defaultValue="所有分类"  style={{ width: '100px' }} onChange={handleSetType}>
                            <Option value="所有分类">所有分类</Option>
                            {
                                billTypes && billTypes.map((item) => {
                                    return (<Option key={item} value={item}>{item}</Option>)
                                })
                            }
                        </Select>
                    </Input.Group>
                </div>
            </div>
        </FileManagerWrapper>
    )
})
