var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    res.render('test',{appTitle:'it is ok now'});
});

module.exports=router;