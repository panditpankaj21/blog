const express = require("express");
const app = express();
const path = require("path");
const userRouter = require('./routes/user.route.js')
const connectDB = require('./db/index.js')

const PORT = 8000;

app.set('view engine', "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}))


app.get("/", (req, res) => {
    res.render("home");
});



connectDB("mongodb://127.0.0.1:27017/blog")
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(err => {
    console.log("Mongo db connection Failed!!",err)
})




app.use('/user', userRouter)
