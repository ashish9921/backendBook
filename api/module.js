import mongoose from "mongoose";


const bookSchima=mongoose.Schema({
    Title:{
        type:String,
        requird:true,
        unique:true,
        
    },
 
    Author:{
        type:String,
        requird:true,

    },
    Summary:{
        type:String,
        requird:true,

    }



},
{timestamps:true})

const Book =mongoose.model('book',bookSchima);
export default Book
