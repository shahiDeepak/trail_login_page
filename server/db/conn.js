const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/mernloginproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => console.log("DB is connected Successfully"))
  .catch((err) => console.log(err));