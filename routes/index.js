var express = require('express');
const Console = require("console");
var router = express.Router();


const {client, getPost, getComments, getPosts, addComment } = require("../database");

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

router.get('/registration', (req, res) => {
    res.render('registration');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', (req, res) => {
    let login = req.cookies['login'];
    if (login === undefined){
        res.render('profile', {
            Nickname: login
        })
    } else {
        res.redirect("/registration");
    }
})


module.exports = router;
