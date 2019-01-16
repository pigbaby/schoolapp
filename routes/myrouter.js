var express=require('express');
var router=express.Router();

// test mongodb
var MongoClient=require('mongodb').MongoClient;
var dbUrl="mongodb://localhost:27017";
var homeUrl="mongodb://192.168.3.67:27017";
// the database name in Mongodb
var testDboName='test';
var homeDboName='students';
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
    // console.log(req.query.gradeid);
    res.render('register');
    // MongoClient.connect(homeUrl,{useNewUrlParser:true},function(err,db){
    //     if(err) throw err;
    //     var dbo=db.db(homeDboName);
    //     dbo.collection(homeCol).find({class:req.query.gradeid,name:req.query.name}).toArray(function(err,result){
    //         if(err) throw err;

    //         // console.log(result);
    //         if(result.length==0){
    //             res.end('0');
    //         }else{
    //             res.render('register',result);
    //         }
    //         db.close();
    //     });
    // });
});

router.post('/insertData',function(req,res,next){
    // console.log(req.body);
    let reqData=req.body;

    var insertObj={class:reqData.grade,name:reqData.name};
    var searchObj={class:reqData.grade,name:reqData.name};
    var classInfo=reqData.insertData.split('&');
    // var objectStr=JSON.stringify(insertObj);
    for(let item in classInfo){
        // console.log(classInfo);
        let subClassInfo = classInfo[item].split('=');
        // insertObj.newParam=subClassInfo[0];
        insertObj[subClassInfo[0]]=subClassInfo[1];
    }
    console.log(insertObj);
    console.log(searchObj);
    MongoClient.connect(homeUrl,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        var dbo=db.db(homeDboName);
        
        dbo.collection(homeCol).updateOne(searchObj,{$set:insertObj},function(err,res){
            if(err) throw err;
            console.log('插入成功');
            db.close();
        });
    });
    res.end('1');
});

// check the submit person data
router.post('/checkgrade',function(req,res,next){
    //console.log(req.body);

    MongoClient.connect(homeUrl,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        var dbo=db.db(homeDboName);
        dbo.collection(homeCol).find({class:req.body.grade,name:req.body.name}).toArray(function(err,result){
            if(err) throw err;
            // if no record then return bcak with a erro. otherwise to another page.
            // console.log(result.length);
            if(result.length==0){
                res.end('0');
            }else{
                console.log(result);
                res.send(result[0]);
                // res.end('1');
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