const express=require('express');
const router=express.router;
const passport=require('passport');
const userModel=require('../models/Users');

router.post('/register', async(req,res)=>{
    let {username,name,email,age,password}=req.body;
    const user=new User(username,name,email,age);
    const newUser=await userModel.register(user,password);
    res.redirect('/login');
})
router.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),
function(req,res){
    console.log("");
    //console.log(req.user , "new");//req.user humko sari attrinutes dega db ka
    res.redirect('/choose');
});

module.exports=router;