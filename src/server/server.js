(function() {
    var app, config, serveStatic;
    var express=require('express');
    var bodyParser = require('body-parser');
    var feedback = require('./feedback');
    app=express();
    serveStatic=require('serve-static');


    config=require('./config');
    app.use(serveStatic(config.rootPath));
    app.use(serveStatic(config.bowerPath));

    app.use(bodyParser.json());

    app.post(config.apiver + '/feedback', function(req,res){
       feedback.storeFeedback(req.body);
        res.sendStatus(201);
    });

    app.listen(process.env.PORT || 3000);
    console.log("Listening on http://localhost:" + (process.env.PORT || '3000') );


}).call(this);


