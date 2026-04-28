const mongoose = require('mongoose');

const uri = "mongodb://indramohan:onetwothree@ac-dpiu5vr-shard-00-00.v6swwcq.mongodb.net:27017,ac-dpiu5vr-shard-00-01.v6swwcq.mongodb.net:27017,ac-dpiu5vr-shard-00-02.v6swwcq.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=MERN";

console.log("Connecting using direct nodes...");
mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully using direct nodes!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
    process.exit(1);
  });
