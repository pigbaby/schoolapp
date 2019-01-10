var express=require('express');
var router=express.Router();

// test mongodb
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017";

// main router mainPage-->register
router.get('/',function(req,res,next){
    res.render('mainPage');
});

router.all('/register',function(req,res,next){
    console.log(req.body);
    res.render('register');
});

router.get('/access',function(req,res,next){
    res.render('appMain');
});

// the below routers are for test.
// This is a router for jquery test page.
router.get('/test',function(req,res,next){
    res.render('jquerytest');
});

// This is a router for grade test page.
router.get('/gradetest',function(req,res,next){
    res.render('gradetest');
});

router.all('/mongo',function(req,res,next){
    //console.log(req.body);
    res.render('mongotest');
});

router.post('/testsubmit',function(req,res,next){
    console.log(req.body);

    // test insert mongodb
    // MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
    //     if(err) throw err;
    //     var dbo=db.db('test');
    //     var insertObj={name:'我的小仔仔',age:10};

    //     dbo.collection('users').insertOne(insertObj,function(err,res){
    //         if(err) throw err;
    //         console.log('插入成功');
    //         db.close();
    //     });
    // });
    //console.log(req.query.exampleInputEmail1);
    res.render('jquerytest');
});

module.exports=router;