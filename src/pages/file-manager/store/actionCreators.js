import * as actionTypes from './constants';

import { getTimeStamp } from "../../../utils/time-operate";

const modifyMapSetAction = (map) => ({
    type: actionTypes.MODIFY_KEY_MAP,
    keyMap: map
});

const modifyDataSetAction = (data) => ({
    type: actionTypes.MODIFY_DATA_SET,
    dataSet: data
});

const setCurrentTypeAction = (currentType) => ({
    type: actionTypes.SET_CURRENT_TYPE,
    currentType
});

const setCurrentTimeAction = (currentTime) => ({
    type: actionTypes.SET_CURRENT_TIME,
    currentTime
});

const setTimeFilterAction = (bool) => ({
    type: actionTypes.SET_TIME_FILTER,
    timeFilter: bool
})

export const modifyMapSet = (map) => {
    return dispatch => {
        dispatch(modifyMapSetAction(map));
    }
}

export const modifyDataSet = (data) => {
    return dispatch => {
        typeof data === "undefined" ? dispatch(modifyDataSetAction([])) : dispatch(modifyDataSetAction(data));
    }
}

export const addDataSet = (data) => {
    return (dispatch, getState) => {
        dispatch(modifyDataSetAction(data ? data.concat(getState().getIn(["manager", "dataSet"])) : getState().getIn(["manager", "dataSet"])));
    }
}

export const setCurrentType = (currentType) => {
    return (dispatch) => {
        dispatch(setCurrentTypeAction(currentType));
    }
}

export const setCurrentTime = (year, month) => {
    return dispatch => {
        const startTime = getTimeStamp(year, month);
        const endTime = getTimeStamp(year, month + 1);
        dispatch(setCurrentTimeAction([startTime, endTime]));
    }
}

export const setTimeFilter = (bool) => {
    return dispatch => {
        dispatch(setTimeFilterAction(bool));
    }
}