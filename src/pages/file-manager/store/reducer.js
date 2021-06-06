import * as actionTypes from "./constants";
import { Map } from "immutable";
import { getTimeStamp } from "../../../utils/time-operate";

const defaultState = Map({
    keyMap: new Map(),
    dataSet: [],
    currentType: "所有分类",
    currentTime:[getTimeStamp(new Date().getFullYear(), new Date().getMonth()), getTimeStamp(new Date().getFullYear(), (new Date().getMonth() + 1))],
    timeFilter: false
})

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.MODIFY_KEY_MAP:
            return state.set("keyMap", action.keyMap);
        case actionTypes.MODIFY_DATA_SET:
            return state.set("dataSet", action.dataSet);
        case actionTypes.SET_CURRENT_TYPE:
            return state.set("currentType", action.currentType);
        case actionTypes.SET_CURRENT_TIME:
            return state.set("currentTime", action.currentTime);
        case actionTypes.SET_TIME_FILTER:
            return state.set("timeFilter", action.timeFilter);
        default:
            return state;
    }
}

export default reducer;