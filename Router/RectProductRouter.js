import express from "express";
import { addRentProduct, getRentProducts, ImageToBuffer } from "../Controller/RentProductController.js";

const rentProductRouter=express.Router();

rentProductRouter.post("/",addRentProduct);
rentProductRouter.post("/buffer",ImageToBuffer);
rentProductRouter.get("/",getRentProducts);




export default rentProductRouter;