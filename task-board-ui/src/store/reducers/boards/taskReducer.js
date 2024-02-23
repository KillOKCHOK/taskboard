const initState = {
    tasks:[],
}


export const boardsReducer = (state=initState, action) => {
    if(action.type==='ListTasksByBoardId'){
        return{
            ...state,
            tasks:action.payload
        }
    }
    else if(action.type==='DeleteTask'){
        return{
            ...state,
            tasks:action.payload
        }
    }
    else if(action.type==='AddTask'){
        return{
            ...state,
            tasks:action.payload
        }
    }
    else if(action.type==='UpdateTask'){
        return{
            ...state,
            tasks:action.payload
        }
    }
    else return {...state};
}

export default boardsReducer;