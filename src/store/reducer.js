import { combineReducers } from 'redux-immutable';
import { reducer as manager } from '../pages/file-manager/store'

export const cReducer = combineReducers({
    manager
});