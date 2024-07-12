const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();

app.use(express.json());
app.use(cors());

const User = require("./modals/Employee"); 

mongoose.connect("mongodb://localhost:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.post("/Login", (req, res)=>{
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user=>{
        if(user){
            if(password === user.password){
                res.json("success")
        }else{
            res.json("password incorrect");
        }
    }else{
        res.json("user not found");
    }
    })
    .catch(err=>{
        res.status(500).json("server error");
        console.error(err);
    })
})

app.post("/register", (req, res) => {
    User.create(req.body)
        .then(employee => res.json(employee)) // Changed req.json to res.json
        .catch(err => res.json(err));
});

app.listen(3003, () => {
    console.log("Server started on port 3003");
});
