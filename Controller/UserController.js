import users from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken"; //get http reqest (json wep token eka amunamma)
import dotenv from "dotenv"

dotenv.config();

export async  function reqestUser(req,res){     //To run await, the function is specified as async.
    const data=req.body;

    data.password=bcrypt.hashSync(data.password,10)//"10"is soluting Routs

    const user=new users(data)

    try{
            await user.save();                          //The line below in the try will not run until the user saves.
            res.status(200).json({
            Message:"User Saved Successfully"
             })
    }
    catch(error){                                                       //If the lines are not running, it is a connection error.
             res.status(500).json({
                error:"User Saved Unsuccessfully"})

    }

}





export async function LoginUser(req,res){                    //To run await, the function is specified as async
    const data =req.body;

    try{
        const user =await users.findOne({email:data.email}) ;       //The line below in the try will not run until the user fine.  
                                                                    //The user comes from "promises", which are one of the "built-in functions" of the mongo DB.
        
            if(user==null){
                res.status(404).json({error:"User is not Found"})           
            }else{
            const ispasswordCorrect=bcrypt.compareSync(data.password,user.password);
        
            if (ispasswordCorrect){
    
                    const token=jwt.sign({                  //login user Data encripted and  send it frontend 
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,                   
                        type:user.type,
                        profilePicture:user.profilePicture,
                        phone:user.phone
                    },process.env.jwt_SECRET)
    
                    res.json({success:"Login Successfuly",token:token,
                        user:user 
                        
                    })
            }else{
                res.status(401).json({error:"Login Field"}) 
            }
           } 
        
    }
    catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})



    }
}

