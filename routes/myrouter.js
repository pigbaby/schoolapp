var express=require('express');
var router=express.Router();

// test mongodb
var MongoClient=require('mongodb').MongoClient;
var dbUrl="mongodb://localhost:27017";
var homeUrl="mongodb://192.168.3.67:27017";
// the database name in Mongodb
var testDboName='test';
var homtDboName='students';
// the collection name in mongodb
var testCol='users';
var homeCol='student';

// main router mainPage-->register
router.get('/',function(req,res,next){
    res.render('mainPage');
});

router.get('/access',function(req,res,next){
    res.render('appMain');
});

router.get('/register',function(req,res,next){
    // console.log(req.params);
    // // console.log(req.url);
    // var reqUrl=req.url;
    // var params=new Array();

    // params=reqUrl.split(/[?&=]/);
    // // var paramsObj=[
    // //     {params[1]:params[2]}
    // // ];
    
    // // if(params.length==7){
    // //     //console.log(params[1]+params[2]);

    // // }
    // // console.log(paramsObj);
    res.render('register');
});

// check the submit data
router.post('/checkgrade',function(req,res,next){
    //console.log(req.body);

    MongoClient.connect(homeUrl,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        var dbo=db.db(homtDboName);
        dbo.collection(homeCol).find({class:req.body.grade,name:req.body.name}).toArray(function(err,result){
            if(err) throw err;
            // if no record then return bcak with a erro. otherwise to another page.
            // console.log(result.length);
            if(result.length==0){
                res.end('0');
            }else{
                res.end('1');
            }
            db.close();
        });
    });
    
    // get the information from mongo DB
    // try{
    //     MongoClient.connect(dbUrl,{useNewUrlParser:true},function(err,db){
    //         if(err) throw err;
    //         var dbo=db.db(testDboName);
    //         dbo.collection(testCol).find({role:req.body.grade,name:req.body.name}).toArray(function(err,result){
    //             if(err) throw err;
    //             console.log(result);
    //             res.end('end');
    //             db.close();
    //             // console.log('databas close');
    //         });
    //     });
    // }catch(err){
    //     res.status(404).end('database error!');
    // }
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