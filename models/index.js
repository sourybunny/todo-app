var mongoose=require("mongoose");
mongoose.set("debug",true);
var url=process.env.DATABASEURL  || "mongodb://localhost/todo-api"

mongoose.connect(url,{useMongoClient: true});
mongoose.Promise=Promise;

module.exports.Todo=require("./todo");
module.exports.User=require("./user");