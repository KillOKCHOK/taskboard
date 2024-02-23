var express = require('express');
var router = express.Router();
var  tasksdao = require('../db/tasksdao');;

/* GET tasks listing. */
router.get('/', function(req, res, next) {
  var id = req.query.boardId;
  if(id){
    console.log("boardId: "+id);
    tasksdao.gettaskByBoardId(id)
    .then(result=>{
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }else{
    tasksdao.getAlltasks()
    .then(result=>{
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }
});

/* GET tasks by id */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  tasksdao.gettaskById(id)
  .then(result=>{
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

/* GET tasks by boardId */
// router.get('/', function(req, res, next) {
//   var id = req.params.boardId;
//   tasksdao.gettaskByBoardId(id)
//   .then(result=>{
//     res.send(result);
//   })
//   .catch(err => {
//     console.log(err);
//     res.send(err);
//   })
// });

/* Post a new task */
router.post('/', function(req, res, next) {
  if (req.body.name){
    tasksdao.inserttask(req.body.name, req.body.boardId, req.body.description, req.body.active)
    .then(result=>{
      res.status(200).send(new String(result));
      // res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }else{
    res.send("Please enter valid task name");
  }
  
});

/* Update the task */
router.put('/', function(req, res, next) {
  console.log("--------------------------------")
  console.log(req.body)
  console.log("--------------------------------")
  if (req.body.name){
    tasksdao.updatetask(req.body.name, req.body.boardId, req.body.description, req.body.active, req.body.id)
    .then(result=>{
      res.status(200).send(new String(result));
      // res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }else{
    res.send("Please enter valid task name");
  }
  
});

/* Delete the task */
router.delete('/:id', function(req, res, next) {
  if (req.params.id){
    tasksdao.delettask(req.params.id)
    .then(result=>{
      res.status(200).send(new String(result));
      // res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }else{
    res.send("Was not able to remove element with id: "+req.params.id);
  }
  
});

module.exports = router;
