var express = require('express');
const Console = require("console");
var router = express.Router();


const {client, getPost, getComments, getPosts, addComment , checkLogin, addLogin, getUser} = require("../database");

function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

router.get('/',async (req,res)=>{
    let login = req.body['login'];
    let user = await getUser(login);

    getPosts().then( async (p) => {
        if (isEmptyObject(p)){
            console.log("Not found page in table " + index_page + " " + p);
            res.sendFile( __dirname +"\\404.html");
            return;
        }
        res.render('homepage', {
            posts:p,
        });
    })
})

router.get("/article/:index_page", async (req, res) => {
    var index_page = req.params.index_page;
    if (isNaN(index_page)) {
        res.sendFile(__dirname + "\\404.html");
        return
    }
    let post = await getPost(index_page);
    if (isEmptyObject(post)) {
        console.log("Not found page in table " + index_page + " " + post);
        res.sendFile(__dirname + "\\404.html");
        return;
    }
    let comments = await getComments(index_page);
    console.log(comments)
    res.render('article', {
        posts: post,
        comments: comments,
    });
})

router.get('/registration', (req, res) => {
    res.render('registration');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', async (req, res) => {
    let login = req.cookies['login'];
    let user = await getUser(login);
    if (login !== undefined){
        res.render('profile', {
            Nickname: login,
            user : user,
        })
    } else {
        res.redirect("/login");
    }
})

router.post('/login', async(req, res) => {
    let login = req.body['login'];
    let password = req.body['password'];

    let flag = await checkLogin(login, password);

    if (flag){
        res.cookie('login', login);
        res.redirect("/profile");
    } else {
        res.render('login');
    }
})

router.post('/registration', async(req, res) => {
    let login = req.body['login'];
    let password = req.body['password'];

    let flag = await addLogin(login, password);

    if (flag){
        res.cookie('login', login);
        res.redirect("/profile");
    } else {
        res.render('registration');
    }
})

router.get('/sections', (req, res) => {
    res.render('section');
})


module.exports = router;
