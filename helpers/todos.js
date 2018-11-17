var db=require("../models");

exports.getTodos=function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.createTodo=function(req,res){
    // console.log(req.body);
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).JSON(newTodo);
        console.log(newTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.getTodo=function(req,res){
    db.Todo.findById(req.params.todoid)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};


exports.updateTodo=function(req,res){
    db.Todo.findOneAndUpdate({_id:req.params.todoid},req.body,{new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.deleteTodo=function(req,res){
    db.Todo.remove({_id:req.params.todoid})
    .then(function(){
        res.json({message:"todo deleted"});
    })
    .catch(function(err){
        res.send(err);
    });
};



module.exports=exports;