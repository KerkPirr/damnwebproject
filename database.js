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
    const query = 'SELECT * FROM Posts WHERE PostId = ' + id;
    let result = await client.query(query).then(res =>{
        var k = res.rows[0];
        return k;
    })
    return result;
}

const getComments = async (postId) =>{
    const query = 'SELECT * FROM Comments WHERE "PostId" = ' + postId;
    let result = await client.query(query).then(res =>{
        return res.rows;
    })
    return result;
}


const getPosts = async (left, right) =>{
    const query = 'SELECT * FROM Posts WHERE post_id >= ' + left + ' AND post_id <= ' + right;
    let result = await client.query(query).then(res => {
        return res.rows;
    });
    return result;
}

const countPosts = async () =>{
    const query = 'SELECT COUNT(*) FROM Posts';
    let result = await client.query(query).then(res =>{
        return res;
    })
    console.log(result.rows[0].count - 1);
    return Number(result.rows[0].count) - 1;
}

function addComment(post, comment){

    const query = `INSERT INTO comments ("Name", "mail", "sait", "Text", "PostId") ` +
        `VALUES ('` + comment.UserName + `','` + comment.Mail + `','` + comment.URL + `','` + comment.Comment_text + `',` + post + `)`;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
    });
}

module.exports = { client, getPost, getComments, getPosts, countPosts, addComment}