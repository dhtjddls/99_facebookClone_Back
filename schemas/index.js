const mongoose = require("mongoose");

const mongoDB = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://sparta:test@cluster0.xzw0iic.mongodb.net/?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("mongo connected");
  } catch (error) {
    console.log(error);
    console.log("mongo connect error");
  }
};
module.exports = mongoDB;
