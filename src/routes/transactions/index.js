const { Router } = require('express')
const router = Router()

router.get('/', function(req, res){
    res.send('GET route on transactions.');
 });
 router.post('/', function(req, res){
    res.send('POST route on transactions.');
 });

 module.exports = router;