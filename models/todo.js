var mongoose=require("mongoose");
var todoSchema= new mongoose.Schema({
     name:{
         type:String,
         required:'name cannot be blank'
     },
     completed:{
         type:Boolean,
         default:false
     },
     created_date:{
         type:Date,
         default:Date.now()
     },
     author:{
        id:{ type:mongoose.Schema.Types.ObjectId,
             ref: "User"
            
        },
        username: String
    }
 })
 
 var Todo=mongoose.model('Todo',todoSchema);
 
 module.exports=Todo;