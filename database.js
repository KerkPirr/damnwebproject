const { Client } = require('pg');
let format = require('pg-format');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '134679',
    port: 5432,
});

client.connect();


const getPosts = async () =>{
    const query = 'SELECT * FROM posts';
    let result = await client.query(query).then(res => {
        return res.rows;
    });
    return result;
}

const getPost = async (id) => {
    const query = 'SELECT * FROM posts WHERE post_id = ' + id;
    let result = await client.query(query).then(res =>{
        var k = res.rows[0];
        return k;
    })
    return result;
}

const getPostsByText = async (text) => {
    const query = `select * from posts where post_content like` + `'%` + text + `%'`;
    let result = await client.query(query).then(res =>{
        return res.rows;
    })
    return result;
}

const getComments = async (post_id) =>{
    const query = 'SELECT * FROM comments WHERE post_id = ' + post_id;
    let result = await client.query(query).then(res =>{
        return res.rows;
    })
    return result;
}

const getUser = async (nickname)=>{
    const query = 'select * from users where login = ' + `'${nickname}'`;
    let result = await client.query(query).then(res=>{
        return res.rows[0];
    })
    return result;
}

function addComment(user, post, comment, date) {
    const query = `INSERT INTO comments ("author", "cmnt_date", "cmnt_txt", "post_id") ` +
        `VALUES ('` + user + `','` + date + `','` + `','` + comment.text + `',` + post + `)`;
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
    });
}

const checkLogin = async (login, password, flag) => {
    let asdf = ``;
    if (flag){
        asdf = `' and password = '` + password;
    }
    const query = `select exists(select * from users where login = '` + login + asdf + `')`;
    let result = await client.query(query).then(res => {
        return res.rows;
    })
    return result[0].exists;
}

const addLogin = async (login, password) => {
    if (await checkLogin(login, password, false)){
        return false;
    } else {
        //TODO сделать проверку на корректность пароля и логина
        let date = new Date();
        let values = [[login, password, date]];
        await client.query(format('INSERT INTO users (login, password, reg_date) VALUES %L', values),[], (err, res) => {
            if (err) {
                console.error(err);
                return false;
            }
        });
        return true;
    }
}

// const getTag = async (tag)=>{
//     const querry =

module.exports = {client, getPost, getComments, getPosts, addComment, checkLogin, addLogin,getUser, getPostsByText}