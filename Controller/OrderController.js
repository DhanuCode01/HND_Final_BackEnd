import Orders from "../Models/Order.js";
import products from "../Models/Products.js";
import { isToken } from "../Validation/TokenValidation.js";

export async function createOrder(req,res) {
    const data=req.body;
    const orderInfo={               //create variable manage all data
        orderedItems:[]              //first Asaing empty array

    }
    isToken(req,res);//if you have a token

    orderInfo.email=req.user.email;//assigning  token  details



    const lastOrder=await Orders.find().sort({orderId:-1}).limit(1);//find last order used orderId //Sort in ascending order //limited the order  one 
                if (lastOrder.length == 0){
                                orderInfo.orderId="ORD0001"
                }else{
                                const lastOrderId=lastOrder[0].orderId; //ORD0065
                                const lastOrderNumberInString=lastOrderId.replace("ORD","");//"0065"  (String)
                                const lastOrderNumber=parseInt(lastOrderNumberInString);//65   (Integer)
                                const currentOrderNumber=lastOrderNumber+1;    //65+1 (66)

                                const formattedNumber=String(currentOrderNumber).padStart(4, '0');//"0066"     // Convert currentOrderNumber to a string and ensure it has at least 4 digits.
                                                                                                            // If it has fewer than 4 digits, add leading zeros to make it 4 digits long.
                                                                                                                // Example: If currentOrderNumber is 66, the result will be "0066".


                                orderInfo.orderId="ORD"+formattedNumber;    // Example: If formattedNumber is "0066", the result will be "ORD0066"


                }
    let oneDayCost=0;// Initialize total cost for one day

    // Loop through each item in the orderedItem array received from the frontend
    for(let i=0;  i<data.orderedItems.length;  i++){       //data  "orderedItem" array get front end
                    try {
                                    const product=await products.findOne({key: data.orderedItems[i].key});// "products"   //database  ".findOne" //find   "({key: data.orderedItem[i].key});" //The 1st key is the product "key" to be find, The" data.orderedItem[i].key" is the front end sent order item key.

                                                if(product ==null){
                                                    res.status(404).json({
                                                        message:"product with key "+data.orderedItems[i].key+" not Found"
                                                    })
                                                    return;
                                                }
                                                if (product.availability == false){
                                                    res.status(400).json({
                                                        message:"Product Width key"+ data.orderedItems[i].key+"is not available",
                                                    })
                                                    return;
                                                }


                                                orderInfo.orderedItems.push({        //order orderedItem array details assign order information details
                                                    product:{
                                                        key:product.key,
                                                        name:product.name,
                                                        image:product.Image[0],     // Use the first image from the product
                                                        price:product.price
                                                    },
                                                    quantity:data.orderedItems[i].quantity
                                                })
                                                oneDayCost += product.price*data.orderedItems[i].quantity;        // Calculate total cost by multiplying product price by the ordered quantity


                        } catch (error) {
                                res.status(500).json({
                                    message:"Failed to create order"
                                }) 
                                
                                return
                        }
        
    }


            // Assign order details from the received data
            orderInfo.days=data.days;
            orderInfo.startingDate=data.startingDate;
            orderInfo.endingDate=data.endingDate;
            orderInfo.totalAmount=oneDayCost*data.days;// Calculate the total order amount by multiplying the one-day cost with the total days

                        try {
                                        const newOrder=new Orders(orderInfo);
                                        const result=await newOrder.save();// Save the new order to the database
                                        res.status(200).json({
                                            message:"Order Created Successfully",
                                            order:result
                                        }) 
                            
                        } catch (e) {
                                        res.status(500).json({
                                            message:"Field to Create order"
                                        }) 
                        }


    
}


export async function getQuote(req,res) {
        const data=req.body;
        const orderInfo={               //create variable manage all data
            orderedItems:[]              //first Asaing empty array

        }
    
    let oneDayCost=0;// Initialize total cost for one day
    // Loop through each item in the orderedItem array received from the frontend
    for(let i=0;  i<data.orderedItems.length;  i++){       //data  "orderedItem" array get front end
                    try {
                                    const product=await products.findOne({key: data.orderedItems[i].key});// "products"   //database  ".findOne" //find   "({key: data.orderedItem[i].key});" //The 1st key is the product "key" to be find, The" data.orderedItem[i].key" is the front end sent order item key.

                                                if(product ==null){
                                                    res.status(404).json({
                                                        message:"product with key "+data.orderedItems[i].key+" not Found"
                                                    })
                                                    return
                                                }
                                                if (product.availability == false){
                                                    res.status(400).json({
                                                        message:"Product Width key"+ data.orderedItems[i].key+"is not available",
                                                    })
                                                    return;
                                                }


                                                orderInfo.orderedItems.push({        //order orderedItem array details assign order information details
                                                    product:{
                                                        key:product.key,
                                                        name:product.name,
                                                        image:product.Image[0],     // Use the first image from the product
                                                        price:product.price
                                                    },
                                                    quantity:data.orderedItems[i].quantity
                                                })
                                                oneDayCost += product.price*data.orderedItems[i].quantity;        // Calculate total cost by multiplying product price by the ordered quantity


                        } catch (error) {
                                res.status(500).json({
                                    message:"Failed to create order"
                                }) 
                                
                                return
                        }
        
    }


            // Assign order details from the received data
            orderInfo.days=data.days;
            orderInfo.startingDate=data.startingDate;
            orderInfo.endingDate=data.endingDate;
            orderInfo.totalAmount=oneDayCost*data.days;// Calculate the total order amount by multiplying the one-day cost with the total days

                        try {           
                                        res.status(200).json({
                                            message:"Order Quatation",
                                            total:orderInfo.totalAmount
                                        }) 
                            
                        } catch (e) {
                                        res.status(500).json({
                                            message:"Field to Create order"
                                        }) 
                        }


    
    
}