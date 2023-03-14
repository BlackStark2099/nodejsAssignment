const express=require('express')
const newsRouter=express.Router()
const axios=require('axios')
newsRouter.get('',async(req,res)=>{

    try {
        console.log("Login Successfully");
        res.render('login')
        
    } catch (err) {
        console.log("Login Failed ");
    }
})


module.exports=newsRouter