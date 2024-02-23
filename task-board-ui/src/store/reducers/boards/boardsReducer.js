const initState = {
    boards:[],
}


export const boardsReducer = (state=initState, action) => {
    if(action.type==='ListBoards'){
        return{
            ...state,
            boards:action.payload
        }
    }
    else if(action.type==='DeleteBoard'){
        return{
            ...state,
            boards:action.payload
        }
    }
    else if(action.type==='AddBoard'){
        return{
            ...state,
            boards:action.payload
        }
    }
    else if(action.type==='UpdateBoard'){
        return{
            ...state,
            boards:action.payload
        }
    }
    else return {...state};
}

export default boardsReducer;