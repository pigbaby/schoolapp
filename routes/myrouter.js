var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    res.render('appMain',{appTitle:'it is ok now'});
    //res.sendFile('bootStrap');
});

module.exports=router;