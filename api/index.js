import express from 'express'
import mongoose from 'mongoose';
import Book from './module.js';
// Start App

const app=express()
app.use(express.json())
const port=3000;
// listen on port 300
app.listen(port,()=>{
    console.log("app is running")
})
// connect mongodb books database
mongoose.connect("mongodb://127.0.0.1:27017/books",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("mongodb connection done")
}).catch((e)=>{
    console.log(e)
})

app.get("/",(req,res)=>{
    res.status(200).json("working!!")
})


app.post("/api/book",async(req,res)=>{
    const{Title,Author,Summary}=req.body
    try {
    const bookdata=new Book({Title,Author,Summary})
    await bookdata.save()
   
        res.status(201).json("book  is added")
    } catch (error) {
        res.status(401).json(error.message)
    }

}
)


app.get("/api/books",async(req,res)=>{
   
    const getbookdata=await Book.find();
    if(!getbookdata){
        res.status(404).json('books not found')
    }
    else{
        res.status(200).json(getbookdata)
    }
 
})

app.get("/api/books/:id",async(req,res)=>{
   
    
    try {
        const getbookdata = await Book.findById(req.params.id);
        if(!getbookdata){
            res.status(404).json('Book not found')
        }
        else{
            res.status(200).json(getbookdata)
        }
        
    } catch (error) {
        res.status(200).json(error.message)
    }
  
 
})

app.put("/api/books/:id",async(req,res)=>{
   
 const {Title,Summary}=req.body;

 const newchange={
    Title:Title,
    Summary:Summary
 }
 try {
    await Book.findByIdAndUpdate(req.params.id,newchange,{new:true})
    res.status(200).json(newchange)
 } catch (error) {
    res.status(401).json(error.message)
 }
 
})


app.delete("/api/books/:id",async(req,res)=>{
   
    try {
     const del=await Book.findByIdAndRemove(req.params.id);
     res.status(202).json("book is deleted")
    } catch (error) {
       console.log(error)
    }
    
   })

   