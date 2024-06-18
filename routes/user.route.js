const {Router} = require('express')
const User = require('../models/user.model.js')

const router = Router();

router.get('/signin', (req, res)=>{
    return res.render('signin')
})

router.get('/signup', (req, res)=>{
    return res.render('signup')
})

router.post('/signin', async (req, res)=>{
    const {email, password} = req.body

    const user = await User.matchPassword(email, password);
    if(!user){
        console.log("Invalid Password");
        res.status(400).json({message: "invalid password"})
    }else{
        console.log("Successfully Logged in", user)
        res.redirect('/')
    }
})

router.post('/signup', async (req, res)=>{
    const {fullName, email, password, role} = req.body
    console.log(fullName, email);

    const result = await User.create({
        fullName, 
        email, 
        password, 
        role
    })
    

    return res.redirect('/')
})

module.exports = router