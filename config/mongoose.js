const mongoose = require('mongoose');

mongoose.connect('',{useNewUrlParser : true, useFindAndModify : true, useCreateIndex : true, useUnifiedTopology : true})
.then(() => console.log("conection successfull..."))
.catch((err) => console.log(err));
