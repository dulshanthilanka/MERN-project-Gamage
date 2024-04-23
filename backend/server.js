const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const DataModel = require('./models/Data')
const cookieSession = require("cookie-session");
const passport = require("passport")
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
require("dotenv").config();

const app = express()
app.use(express.json())
app.use(cookieSession({
    name:"gamage",
    keys:["gamage"],
    maxAge:24*60*60*100,
}));
app.use(passportSetup.initialize());
app.use(passport.session());
app.use(cors({
    origin: "http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,

}))

app.use("/auth",authRoute);

const port = process.env.PORT||8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));

mongoose.connect("mongodb://127.0.0.1:27017/gamage")

app.post('/', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then( user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("password incorrect")
            }
        }else{
            res.json("not registerd")
        }
    })
    .catch(err => res.json(err))
 })

app.post('/register', (req, res) => {
   EmployeeModel.create(req.body)
   .then( employees => res.json(employees))
   .catch(err => res.json(err))
})

app.delete('/data/:id', async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    try {
        const deletedData = await DataModel.findByIdAndDelete({_id: id});
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/home", async (req, res) => {
    try {
        const allData = await DataModel.find();
        res.json(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/home', (req, res) => {
    DataModel.create(req.body)
    .then( data => res.json(data))
    .catch(err => res.json(err))
 })

 app.put('/index/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    try {
        const updateData = await DataModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json(updateData);
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3001, () => {
    console.log("server is running")
})