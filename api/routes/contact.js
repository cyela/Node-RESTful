const express=require('express');
const sql=require('../models/contactdb');
const router=express.Router();

 sql.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log("SQL is instanstiated.....");
    }
});

// Add Contact
router.post('/add',(req,res,next)=>{
    let contact={
        name:req.body.name,
        address:req.body.address,
        phoneNo:req.body.phone,
        email:req.body.email,
        status:req.body.status
    }

    let myquery='Insert Into contacts SET ?';
    let query=sql.query(myquery,contact,(err,result)=>{
        if(err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
        res.status(200).json({
            message:'Handling Post Requests',
            contact:contact
        });
    });

   
});

// retrieve particular contact by id
router.get('/get/:contactId',(req,res,next)=>{
    const id=req.params.contactId;
    let myquery='Select * from contacts where contactId=?';
    let query=sql.query(myquery,id,(err,result)=>{
        if(err) {
            throw err;
        }
        res.status(200).json({
            message:"You asked contact details",
           contact:result
        })
    })
});

//fetch all contact details
router.get('/getcontacts',(req,res,next)=>{
    const id=req.params.contactId;
    let myquery='Select * from contacts ORDER BY name';
    let query=sql.query(myquery,(err,result)=>{
        if(err) {
            throw err;
        }
        res.status(200).json({
            message:"You asked contact details",
           contact:result
        })
    })
});

// Delete contact 
router.delete('/del/:contactId',(req,res,next)=>{
    const id=req.params.contactId;
    let myquery='DELETE FROM contacts WHERE contactId=?';
    let query=sql.query(myquery,id,(err,result)=>{
        if(err) {
            throw err;
        }
        console.log("Number of records deleted: " + result.affectedRows);
        res.status(200).json({
            message:"Record Deleted",
           affectedRows:result.affectedRows
        })
    })
});

//update particular contact details
// use ? instead of specifying the details in sql query, this prevent sql injection by hackers
router.patch('/update/:contactId',(req,res,next)=>{
    const id=req.params.contactId;
    let contact=[{
        name:req.body.name,
        address:req.body.address,
        phoneNo:req.body.phone,
        email:req.body.email,
        status:req.body.status
    },id];
    
    let myquery='Update contacts SET ? where contactId=?';
    let query=sql.query(myquery,contact,(err,result)=>{
        if(err) {
            console.log(err);
        }
        //console.log(result.affectedRows + " record(s) updated");
        res.status(200).json({
            message:result.message,
        })
    })
});

//setting particular contact as favorite
router.patch('/fav/:contactId',(req,res,next)=>{
    const id=req.params.contactId;
    let contact=[{status:req.body.status},id];
    let myquery='Update contacts SET ? where contactId=?';
    let query=sql.query(myquery,contact,(err,result)=>{
        if(err) {
            throw err;
        }
        console.log(result.affectedRows + " record(s) updated");
        res.status(200).json({
            message:result.message
        })
    })
});

module.exports=router;