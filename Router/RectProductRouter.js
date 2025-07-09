import express from "express";
import { addRentProduct, deleteRentProduct, getOneRentPruduct, getRentProducts, getRentProductsKids, getRentProductsMen, getRentProductsWomen, ImageToBuffer, updateRentProduct } from "../Controller/RentProductController.js";

const rentProductRouter=express.Router();

rentProductRouter.post("/",addRentProduct);
rentProductRouter.post("/buffer",ImageToBuffer);
rentProductRouter.get("/",getRentProducts);
rentProductRouter.get("/men/:key",getRentProductsMen);
rentProductRouter.get("/women/:key",getRentProductsWomen);
rentProductRouter.get("/kids/:key",getRentProductsKids);
rentProductRouter.put("/:key",updateRentProduct);
rentProductRouter.delete("/:key",deleteRentProduct);
rentProductRouter.get("/:key",getOneRentPruduct);




export default rentProductRouter;