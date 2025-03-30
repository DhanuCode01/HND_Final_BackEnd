import mongoose from "mongoose";


const userSchema=new  mongoose.Schema({
    email:{    //email Data Structure
        type:String,//Data Type
        required:true,//All users Definetly has email
        unique:true//uniqe value(Like NIC Number)
    },
    password:{  //password Data Structure
        type:String,
        required:true
    },
    type:{    //type Data Structure
        type:String,
        required:true,
        default:"Customer"//If no value is given default Value is "Customer"
    },
    firstName:{   //firstName Data Structure
        type:String,
        required:true
    },
    lastName:{   //lastName Data Structure
        type:String,
        required:true
    },
    address:{   //address Data Structure
        type:String,
        required:true
    },
    phone:{    //Phone Number Data Structure
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:true,
        default:"https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"
    }
})

const users=mongoose.model("User",userSchema)
export default users;