const mongoose = require("mongoose");

const URI = process.env.URI;

if (!URI) {
  console.error("Erro in the URI");
}

const ConnectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Invalid server error", error);
    process.exit(1);
  }
};

module.exports = ConnectDB;
