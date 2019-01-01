var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    res.render('appMain',{appTitle:'it is ok now'});
    //res.sendFile('bootStrap');
});

// This is a router for jquery test page.
router.get('/test',function(req,res,next){
    res.render('jquerytest');
});

// This is a router for grade test page.
router.get('/gradetest',function(req,res,next){
    res.render('gradetest');
});
module.exports=router;