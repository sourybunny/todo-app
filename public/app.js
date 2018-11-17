// alert("connected");
/* global $ */
$(document).ready(function(){
   
    
    $.getJSON('/api/todos')
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    });
    
    $("#todoInput").keypress(function(event){
    if(event.which==13){
        console.log(event);
        createTodo();
    }
    });
    $("#add-task").on("click",function(event){
        console.log(event);
        createTodo();
    });
    
    $(".list").on("click",'span',function(e){
        e.stopPropagation();
      removeTodo($(this).parent());
    });
    
    $(".list").on("click",'li',function(){
       updateTodo($(this));
    })
});

function addTodos(todos){
    todos.forEach(function(todo){
        // console.log(todo.name);
        addTodo(todo);
    });
}
function addTodo(todo){
        // console.log(todo);
        var newTodo= $('<li class="task">'+ todo.name +'<span>X</span></li>');
        newTodo.data('id',todo._id);
        newTodo.data('completed',todo.completed);
        if(todo.completed){
            newTodo.addClass("done");
        }
        $('.list').append(newTodo);
        
}

function createTodo(){
    var userInput=$("#todoInput").val();
    console.log("userinput "+ userInput);
    console.log(typeof(userInput))
    $(".list").empty();
    $("#todoInput").val("");
    $.post('/api/todos',{name: userInput})
    .then( $.getJSON('/api/todos')
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    }))
    // .then(function(newTodo){
    //     console.log(newTodo); failing here
    //     $("#todoInput").val("");
        
    //     addTodo(newTodo);
        
    // })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todo){
      var clickedId=todo.data('id');
        var deleteUrl='/api/todos/'+clickedId;
        
        $.ajax({
            method:'DELETE',
            url:deleteUrl
        })
        .then(function(data){
            // console.log(data);
            todo.remove();
        })
        .catch(function(err){
            console.log(err);
        });
}


function updateTodo(todo){
    // console.log(todo.data('completed'));
    var updateUrl='/api/todos/'+todo.data('id');
    var isDone=!todo.data('completed');
    var updateData= {completed:isDone}// changing isDone but not actually the database's 'completed' key's value,
    //so instead change the database's value to opposite
    $.ajax({
        method:'PUT',
        url:updateUrl,
        data:updateData
    })
    .then(function(updatedTodo){
        // console.log(updatedTodo);
        todo.toggleClass('done');
        todo.data('completed',isDone);//change to opposite of previous directly in the database key 
        
    })
    .catch(function(err){
        console.log(err);
    });
}