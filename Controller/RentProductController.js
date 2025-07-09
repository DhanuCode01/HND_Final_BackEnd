import axios from "axios";
import {isToken} from "../Validation/TokenValidation.js"
import {isItAdmin} from "../Validation/UserValidation.js"
import rentproducts from "../Models/RentProduct.js";

export async function  addRentProduct(req,res){     //add new product                                             //To run await, the function is specified as async.
    isToken(req,res);//if you have a token

     if (!isItAdmin(req)){              //check  authorization(is check the user admin )
        res.status(403).json({
            Message:"your are not authorized to perform this acction"   
        })
        return

    }  

    const data=req.body;               //assigning reqest body details 
    const rentproduct=new rentproducts(data); //add new product
    
    try{
            await rentproduct.save();           //save data     //The line below in the try will not run until the product saves.
                res.status(200).json({
                    Message:"product Saved Successfully"})
        
    }catch(error){                                                              //If the lines are not running, it is a connection error.
        res.status(500).json({error:"product Saved Unsuccessfully"})
        console.log(error)
    }

}

export async function ImageToBuffer(req,res) { //uploaded image compair with current image

     //isToken(req,res);//if you have a token

     const imageURL=req.body.URL;
     
     
       if (!imageURL) {     //check if you haven't url
            return res.status(400).json({ error: "Missing image_url in request body" });
        }

        try {    
            const response = await axios.get(imageURL, { responseType: "arraybuffer" });//{ responseType: "arraybuffer" } – මෙය axios ට කියනවා binary data (image) එක buffer format එකෙන් ලබාගන්න.        //response.data – මෙය හරියටම image එකයි (buffer format එකෙන්).
            const base64Image = Buffer.from(response.data, "binary").toString("base64");//Buffer.from(data, "binary") – මේක binary data එක buffer එකකට convert කරනවා.             //.toString("base64") – මෙය Buffer එක Base64 string එකක් බවට පරිවර්තනය කරනවා.

                    // Try to extract image extension
                    const contentType = response.headers["content-type"]; // e.g., "image/png"
                    const extension = contentType.split("/")[1] || "jpeg"; // fallback to jpeg

                    


           res.status(200).json({
                        file_type: contentType,   /* response.headers["content-type"] - server එක image එක return කරන විට කියන MIME type එක, e.g., image/png, image/jpeg, image/webp වගේ. */
                        encoding: "base64",
                        data: base64Image,
                        preview: `data:${contentType};base64,${base64Image}`, // just a short preview
            });


            } catch (error) {
                console.error("Image download error:", error);
                res.status(500).json({ error: "Failed to fetch or convert image" });
            }


    
    
}


export async function getRentProducts(req,res){    //viwe product          //viwe products             //To run await, the function is specified as async.
    
    /* isToken(req,res);//if you have a token
   
     try{

        if(isItAdmin(req)){
        const rentproduct=await rentproducts.find();             //The line below in the try will not run until the user fine.  
        res.status(200).json(rentproduct);                   //The products from "promises", which are one of the "built-in functions" of the mongo DB.

        }else{ 
              const rentproduct=await rentproducts.find({availability:true});             //The line below in the try will not run until the user fine.  
              res.status(200).json(rentproduct);                   //The products from "promises", which are one of the "built-in functions" of the mongo DB. 

        }
     }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    } */

           try {
                const rentproduct=await rentproducts.find();
                res.status(200).json(rentproduct);
           } catch (error) {
                res.status(500).json({
                error:"database connection un successfully"})
           }
} 

export async function getRentProductsMen(req,res){    //viwe product          //viwe products             //To run await, the function is specified as async.
    
    //isToken(req,res);//if you have a token
   
     try{
        const key=req.params.key;
        const rentproduct=await rentproducts.find({customerType:"Men" , category:key });
        
        if (rentproduct.length === 0){
                    res.status(404).json({
                        message:"product not Found"
                    })
                    return;
        }

        res.status(200).json(rentproduct)
        return;
       
     }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
}



export async function getRentProductsWomen(req,res){    //viwe product          //viwe products             //To run await, the function is specified as async.
    
    //isToken(req,res);//if you have a token
   
     try{
        const key=req.params.key;
        const rentproduct=await rentproducts.find({customerType:"Women" , category:key });
        
        if (rentproduct.length === 0){
                    res.status(404).json({
                        message:"product not Found"
                    })
                    return;
        }

        res.status(200).json(rentproduct)
        return;
       
     }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
}


export async function getRentProductsKids(req,res){    //viwe product          //viwe products             //To run await, the function is specified as async.
    
    //isToken(req,res);//if you have a token
   
     try{
        const key=req.params.key;
        const rentproduct=await rentproducts.find({customerType:"Kids" , category:key });
        
        if (rentproduct.length === 0){
                    res.status(404).json({
                        message:"product not Found"
                    })
                    return;
        }

        res.status(200).json(rentproduct)
        return;
       
     }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
}


export async function getOneRentPruduct(req,res) {             //get product used key{parameeter}

    try {
                const key=req.params.key;
                const rentProduct=await rentproducts.findOne({key:key});

                if (rentProduct.length === 0){
                    res.status(404).json({
                        message:"product not Found"
                    })
                    return;
                }

                res.json(rentProduct)
                return;
    } catch (error) {
        res.status(500).json({
            message:"Field get Product"
        })
        return;
    }
              
    
}



export async function updateRentProduct(req,res){   //update product
    try{
        isToken(req,res);//if you have a token
        if(isItAdmin(req)){

            const key=req.params.key;    //The key of the product that needs to be changed            
            const data =req.body;       //The product that needs to be changed
            
            await rentproducts.updateOne({key,key},data) ;  //The 1st key is the product key to be updated, the 2nd key is the parameter key.
                    res.json({
                        message:"product Update Successfullly"
                    })
            return;

        }else{              //check  authorization(is check the user admin )
            res.status(403).json({
                Message:"your are not authorized to perform this acction"   
            })
            return;
        }

    }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
}

export async function deleteRentProduct(req,res){   //Delete product
    try{
        isToken(req,res);//if you have a token
        if(isItAdmin(req)){

            const key=req.params.key;    //The key of the product that needs to be changed

            const data =req.body;       //The product that needs to be changed

            await rentproducts.deleteOne({key,key}) ;  //The 1st key is the product key to be delete, the 2nd key is the parameter key.
                    res.json({
                        message:"product delete Successfullly"
                    })
            return;

        }else{              //check  authorization(is check the user admin )
            res.status(403).json({
                Message:"your are not authorized to perform this acction"   
            })
            return;
        }

    }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
}
