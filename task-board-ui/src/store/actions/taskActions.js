import axios from 'axios';
import {store} from '../../index'

let domain = "localhost:4000";
export const fetchTasksByBoardId=(boardId)=>{
    return async(dispatch, getState)=>{
        axios
        .get('http://'+domain+'/tasks?boardId='+boardId)
        .then(async response => {
            await dispatch({type:"ListTasksByBoardId", payload:response.data});
        })
        .catch(err=>{
            console.log({err:err});
        });
        
    }
}

export const addTask=(param, handleClose)=>{
    return async(dispatch, getState)=>{
        let tasks = store.getState().taskReducer.tasks;
        let newarr1 = [];
        axios.post('http://'+domain+'/tasks',{
            name:param.name,
            boardId:param.boardId, 
            description:param.description, 
            active:param.active
          })
        .then(async response => {
            newarr1 = [...tasks];
            newarr1.push({
                id:parseInt(response.data), 
                name:param.name,
                boardId:param.boardId, 
                description:param.description, 
                active:param.active
            });
        })
        .then(async response => {
            await dispatch({type:"AddTask", payload:newarr1});
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

export const updateTask=(param, handleClose)=>{
    return async(dispatch, getState)=>{
        let tasks = store.getState().taskReducer.tasks;
        let newarr1 = [];
        let updateObj = {
            id:param.id,
            name:param.name,
            boardId:param.boardId, 
            description:param.description, 
            active:param.active
          };
          console.log(updateObj);
        axios.put('http://'+domain+'/tasks',updateObj)
        .then(async response => {
            newarr1 = [...tasks];
            let index = tasks.findIndex((obj) => obj.id === param.id);
            newarr1.splice(index,1,updateObj);
        })
        .then(async response => {
            await dispatch({type:"UpdateTask", payload:newarr1});
        })
        .then(async response => {;
            handleClose?handleClose():console.log("nothing to close");
        })
        .catch(err=>{
            console.log({err:err,param:param});
            handleClose?handleClose():console.log("nothing to close");
        });
        
    }
}

export const deleteTask=(param)=>{
    return async(dispatch)=>{
        let tasks = store.getState().taskReducer.tasks;
        let newarr = [...tasks];
        axios.delete('http://'+domain+'/tasks/'+param)
        .then(async response => {
            let index = tasks.findIndex((obj) => obj.id === param);
            newarr.splice(index,1);
        })
        .then(async response => {
            await dispatch({type:"DeleteTask", payload:newarr});
        })
        .catch(err=>{
            console.log({err:err,param:param});
        });
        
    }
}