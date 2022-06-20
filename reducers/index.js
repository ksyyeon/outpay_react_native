import {combineReducers} from 'redux';
import DialogReducer from './dialogReducer';

export default combineReducers({
    dialogProps: DialogReducer,
});
