import axios from 'axios';
import {store} from '../../index'

let domain = "localhost:4000";
export const fetchBoards=(param)=>{
    return async(dispatch, getState)=>{
        axios
        .get('http://'+domain+'/boards')
        .then(async response => {
            await dispatch({type:"ListBoards", payload:response.data});
        })
        .catch(err=>{
            console.log({err:err,param:param});
        });
        
    }
}

export const addBoard=(param, handleClose)=>{
    return async(dispatch, getState)=>{
        let boards = store.getState().boardsReducer.boards;
        let newarr1 = [];
        axios.post('http://'+domain+'/boards',{
            name:param.name
          })
        .then(async response => {
            newarr1 = [...boards];
            newarr1.push({
                id:parseInt(response.data), name:param.name, userId:1
            });
        })
        .then(async response => {
            await dispatch({type:"AddBoard", payload:newarr1});
        })
        .then(async response => {;
            handleClose();
        })
        .catch(err=>{
            console.log({err:err,param:param});
            handleClose();
        });
        
    }
}

export const updateBoard=(param, handleClose)=>{
    return async(dispatch, getState)=>{
        let boards = store.getState().boardsReducer.boards;
        let newarr1 = [];
        let updateObj = {
            id:param.id,
            name:param.name,
            userId:param.userId
          };
        axios.put('http://'+domain+'/boards',updateObj)
        .then(async response => {
            newarr1 = [...boards];
            let index = boards.findIndex((obj) => obj.id === param.id);
            newarr1.splice(index,1,updateObj);
        })
        .then(async response => {
            await dispatch({type:"UpdateBoard", payload:newarr1});
        })
        .then(async response => {;
            handleClose();
        })
        .catch(err=>{
            console.log({err:err,param:param});
            handleClose();
        });
        
    }
}

export const deleteBoard=(param)=>{
    return async(dispatch)=>{
        let boards = store.getState().boardsReducer.boards;
        let newarr = [...boards];
        axios.delete('http://'+domain+'/boards/'+param)
        .then(async response => {
            let index = boards.findIndex((obj) => obj.id === param);
            newarr.splice(index,1);
        })
        .then(async response => {
            await dispatch({type:"DeleteBoard", payload:newarr});
        })
        .catch(err=>{
            console.log({err:err,param:param});
        });
        
    }
}