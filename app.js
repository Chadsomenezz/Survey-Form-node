const express = require("express");
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 60000 }}
))

app.use(express.static(path.join(__dirname,'static')))
app.set('views','views');
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    if(!req.session.count){
        req.session.count = 0;
    }
    req.session.count++;
    res.render('index',{count:req.session.count})
})

app.get('/process',(req,res)=>{
    res.redirect('/')
})
app.post('/process',(req,res)=>{
    req.session.result = {
        name:req.body.name,
        favorite:req.body.favorite,
        comment:req.body.comment
    }
    res.redirect('/result');
})
app.get('/result',(req,res)=>{
    if (req.session.result){
        res.render('result',{result:req.session.result})
    }
    else{
        res.redirect('/');
    }
})

app.listen(8080,()=>{
    console.log('Listening at port 8080')
})