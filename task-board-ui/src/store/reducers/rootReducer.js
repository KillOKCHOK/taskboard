
import boardsReducer from './boards/boardsReducer';
import taskReducer from './boards/taskReducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    boardsReducer:boardsReducer,
    taskReducer:taskReducer,
})


export default rootReducer;