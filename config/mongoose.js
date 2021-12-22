const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongouser:InxFWhVcYPooxGJs@mongodbnode.bhdcc.mongodb.net/MongodbNode',{useNewUrlParser : true, useFindAndModify : true, useCreateIndex : true, useUnifiedTopology : true})
.then(() => console.log("conection successfull..."))
.catch((err) => console.log(err));