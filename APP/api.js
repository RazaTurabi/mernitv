/**Database connection [start] */
const mongoose = require("mongoose");
const conn_str = "mongodb+srv://mern:mern@cluster0.lknenqp.mongodb.net/ums?retryWrites=true&w=majority"


mongoose.connect(conn_str)
.then(() => console.log("Connected successfully..."))
.catch( (error) => console.log(error));
/**Database connection [end] */

const express = require("express");
const app = express();
const PORT = 8989;

const cors = require("cors")
app.use(cors());

const userSchema = new mongoose.Schema({
       name:String,
       age:Number,
       city:String
});

const user = new mongoose.model("users", userSchema);

app.get("/users", async (req, res) => {
    let data = await user.find();
    res.send(data)
})



app.get("/users/:id", async (req, res) => {
    let data = await user.find({_id: req.params.id});
    res.send(data[0]);
})

app.use(express.json())

app.post("/users", async (req, res) => {
    doc = req.body;
    let u = await user(doc);
    let result = u.save();
    res.send(doc);
})

app.delete("/users", async (req, res) => {
    let data = await user.deleteOne({_id: req.query['id']});
    res.send(data);
})

app.put("/users", async (req, res) => {
    let result = await user.updateOne({"_id": req.body.id},
   {
     "$set": {
        "name": req.body.name,
        "age": req.body.age,
        "city": req.body.city
     }
   });

   res.send(result)

});













app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})








