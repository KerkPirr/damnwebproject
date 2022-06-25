var express = require('express');
const Console = require("console");
var router = express.Router();


const {client, getPost, getComments, getPosts, addComment , checkLogin} = require("../database");

function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

router.get('/',(req,res)=>{
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

router.get("/article/:index_page", (req, res) => {
    var index_page = req.params.index_page;
    if (isNaN(index_page)){
        res.sendFile( __dirname +"\\404.html");
        return
    }

    getPost(index_page).then(async (p) => {

        if (isEmptyObject(p)){
            console.log("Not found page in table " + index_page + " " + p);
            res.sendFile( __dirname +"\\404.html");
            return;
        }

        let comments = [];
        const comment = await getComments(index_page).then((result) =>{
            return result;
        })
        comments.push(comment);

        res.render('article', {
            posts:p,
            comments: comments,
        });
    });
})

router.get('/test', (req, res) => {
  res.render('error', {
      Nickname : "denis"
  })
})

router.get('/registration', (req, res) => {
    res.render('registration');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', (req, res) => {
    let login = req.cookies['login'];
    if (login !== undefined){
        res.render('profile', {
            Nickname: login
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

router.get('/sections', (req, res) => {
    res.render('section');
})


module.exports = router;
