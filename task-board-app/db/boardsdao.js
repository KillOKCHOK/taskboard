var db = require('./pgconnection');

const date = new Date();

exports.getAllboards = function () {
  return new Promise(function(resolve, reject){
    db.query('SELECT * from public.boards', (error, results) => {
      if (error) {
        reject( error)
      }
      resolve(results.rows);
    })
    
  });
};

exports.getboardById = async function (boardId) {
  return new Promise(function(resolve, reject){
    db.query('SELECT * from public.boards WHERE id=$1',[boardId], (error, results) => {
          if (error) {
            reject( error)
          }
          resolve(results.rows);
        });
      });
    };
    
    // exports.getboardByUserId = async function (applicationLogin) {
    //   return new Promise(function(resolve, reject){
    //     db.query('SELECT * from public.boards WHERE login=$1',[applicationLogin], (error, results) => {
    //       if (error) {
    //         reject( error)
    //       }
    //       resolve(results.rows);
    //     });
    //   });
    // };
    

    exports.deletBoard = async function (val) {
      const id = val;
      return new Promise(function(resolve, reject){
        try {
          db.query('DELETE FROM public.boards WHERE id = $1 RETURNING id',[id], (error, results) => {
            if (error) {
              reject( error);
            }
            else resolve(results.rows[0]);
          });
        } catch (error) {
          resolve(error);
        }
        
      });
    };
    

exports.insertBoard = async function (name, userId) {
  return new Promise(function(resolve, reject){
        db.query('INSERT INTO public.boards ( name, "userId", date) VALUES($1,$2,$3) RETURNING id',[name, userId?userId:1, new Date()], (error, results) => {
          if (error) {
            reject( error);
            }
            else resolve(results.rows[0].id);
          });
        });
      };

exports.updateBoard = async function ( name, userId, date, id) {
  return new Promise(function(resolve, reject){
        db.query('UPDATE public.boards SET name=$1, "userId"=$2, date=$3 WHERE id=$4 RETURNING id',[name, userId?userId:1, date?date:new Date(), id], (error, results) => {
          if (error) {
            reject( error);
            }
            else resolve(results.rows[0].id);
          });
        });
      };

