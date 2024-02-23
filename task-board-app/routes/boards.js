var express = require('express');
var router = express.Router();
var  boardsdao = require('../db/boardsdao');;

/* GET boards listing. */
router.get('/', function(req, res, next) {
  boardsdao.getAllboards()
  .then(result=>{
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

/* GET boards by id */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  boardsdao.getboardById(id)
  .then(result=>{
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

/* Post a new board */
router.post('/', function(req, res, next) {
  if (req.body.name){
    boardsdao.insertBoard(req.body.name, req.body.userId)
    .then(result=>{
      res.status(200).send(new String(result));
      // res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }else{
    res.send("Please enter valid board name");
  }
  
});

/* Update the board */
router.put('/', function(req, res, next) {
  if (req.body.name){
    boardsdao.updateBoard(req.body.name, req.body.userId,req.body.date ,req.body.id)
    .then(result=>{
      res.status(200).send(new String(result));
      // res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }else{
    res.send("Please enter valid board name");
  }
  
});

/* Delete the board */
router.delete('/:id', function(req, res, next) {
  if (req.params.id){
    boardsdao.deletBoard(req.params.id)
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
