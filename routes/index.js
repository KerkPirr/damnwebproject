var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
  res.render('homepage', {
    posts: {}
  })
})

router.get('/test', (req, res) => {
  res.render('article', {
      posts: {}
  })
})

module.exports = router;
