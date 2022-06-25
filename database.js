const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '134679',
    port: 5432,
});

client.connect();

const getPost = async (id) => {
    const query = 'SELECT * FROM posts WHERE post_id = ' + id;
    let result = await client.query(query).then(res =>{
        var k = res.rows[0];
        return k;
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


const getPosts = async () =>{
    const query = 'SELECT * FROM posts';
    let result = await client.query(query).then(res => {
        return res.rows;
    });
    return result;
}


function addComment(post, comment){

    const query = `INSERT INTO comments ("author", "cmnt_date", "cmnt_txt", "post_id") ` +
        `VALUES ('` + comment.author + `','` + comment.date + `','` + `','` + comment.comment_text + `',` + post + `)`;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
    });
}

module.exports = { client, getPost, getComments, getPosts, addComment}