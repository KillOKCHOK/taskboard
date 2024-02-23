var db = require('./pgconnection');

const date = new Date();

exports.getAlltasks = function () {
  return new Promise(function(resolve, reject){
    db.query('SELECT * from public.tasks', (error, results) => {
      if (error) {
        reject( error)
      }
      else if(results){
            resolve(results.rows);
          }else{
            resolve(results);
          }
    })
    
  });
};

exports.gettaskById = async function (taskId) {
  return new Promise(function(resolve, reject){
    db.query('SELECT * from public.tasks WHERE id=$1',[taskId], (error, results) => {
          if (error) {
            reject( error)
          }
          else if(results){
            resolve(results.rows);
          }else{
            resolve(results);
          }
        });
      });
    };
    
    exports.gettaskByBoardId = async function (id) {
      return new Promise(function(resolve, reject){
        db.query('SELECT * from public.tasks WHERE "boardId"=$1',[id], (error, results) => {
          if (error) {
            reject( error)
          }
          else if(results){
            resolve(results.rows);
          }else{
            resolve(results);
          }
        });
      });
    };
    

    exports.delettask = async function (val) {
      const id = val;
      return new Promise(function(resolve, reject){
        db.query('DELETE FROM public.tasks WHERE id = $1 RETURNING id',[id], (error, results) => {
          if (error) {
            reject( error);
          }
          else resolve(results.rows[0].id);
        });
      });
    };
    

exports.inserttask = async function (name, boardId, description, active) {
  return new Promise(function(resolve, reject){
        db.query('INSERT INTO public.tasks ( name, "boardId", description, active) VALUES($1,$2,$3, $4) RETURNING id',[name, boardId?boardId:1, description, active], (error, results) => {
          if (error) {
            reject( error);
            }
            else resolve(results.rows[0].id);
          });
        });
      };

exports.updatetask = async function ( name, boardId, description, active, id) {
  return new Promise(function(resolve, reject){
        db.query('UPDATE public.tasks SET name=$1, "boardId"=$2, description=$3, active=$4 WHERE id=$5 RETURNING id',[name, boardId?boardId:1, description?description:null, active, id], (error, results) => {
          if (error) {
            reject( error);
            }
            else resolve(results.rows[0].id);
          });
        });
      };

