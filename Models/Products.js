import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    key:{               //product can uniquely identify
        type:String,
        required:true,//All product Definetly has key
        unique:true  //All product Definetly has key
    },

    name:{    //product name Data Structure
        type:String,//Data Type
        required:true,//All product Definetly has name
    },
    quantity:{//Quantity
        type:String,
        required:true
    },
    customerType:{//Men,Women,Kids
        type:String,
        required:true
    },
    price:{    //product Price Data Structure
        type:String,//Data Type
        required:true,//All product Definetly has price
    },
    category:{      ///product category Data Structure eg:casual shirts,formal shirts,T-Shirts,Trousers,Inner waear,pants,Tops,sarees,school uniform
        type:String,
        required:true,
        default:"uncategorized" //If no value is given default Value is "uncategorized"
    },
    dimension:{          //product dimension Data Structure
        type:String,
        required:true 
    },
    description:{    //product description Data Structure
        type:String,//Data Type
        required:true,//All product Definetly has discription
    },
    availability:{   //Is the product available or not?
        type:Boolean,
        required:true,
        default:true

    },
    Image:{
        type:[String],
        required:true,
        default:"https://example.com/default.jpg"
    }

})
const products=mongoose.model("product",productSchema)
export default products;