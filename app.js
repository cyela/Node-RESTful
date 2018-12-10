const express=require('express');
const morgan=require('morgan');// used for logging 
const bodyParser=require('body-parser');// Json data handling
const app= express();

// Routes
const contactRoutes=require('./api/routes/contact');

// middlewares
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//handling cors error
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if(req.method==='OPTIONS'){
        res.header(
            "Access-Control-Allow-Methods",
            "PUT,POST,PATCH,DELETE,GET"
        )
        return res.status(200).json();
    }
    next();
}) 

app.use('/contact',contactRoutes);

// handling errors for incoming request call errors
app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});

// for handling the errors that code will throw
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

 module.exports=app;
