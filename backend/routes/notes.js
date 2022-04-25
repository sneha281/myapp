
const express = require('express');
const router  = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const nodemon = require('nodemon');
router.get('/fetchallnotes' ,fetchuser,async (req,res)=>{
    try{
         const notes = await Note.find({user : req.user.id});
   res.json(notes);
    }catch(error){
        console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
    
})


router.post('/addnotes' ,fetchuser,[

  body('title','Enter a valid title').isLength({ min: 3}),
    body('description','must be 5 character').isLength({ min :5 }),],async (req,res)=>{
   
        try {
            
        

    const {title , description ,tag} =  req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   const note  = new Note ({
      title , description , tag  : req.user.id
   })
  const savednote = await note.save();
    
   res.json(savednote);
}
catch(error){
console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})




router.put('/updatenote/:id' ,fetchuser,async (req,res)=>{
  const {title,description,tag} = req.body;
  const newNote = {};
  if(title){newNote.title  = title};
  if(description){newNote.description  = description};
  if(tag){newNote.tag  = tag};
 let note = await Note.findById(req.params.id);
 if(!note){return res.status(404).send("Not Found")}
 if(note.user.tostring () !== req.user.id){
    return res.status(401).send("Not Allowed");
 }


note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{ new:true});
res.json({note});

})
module.exports = router