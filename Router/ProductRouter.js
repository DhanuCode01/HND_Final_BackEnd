import express from "express";
import { addProduct, deleteProduct, getOnePruduct, getProducts, updateProduct } from "../Controller/ProductController.js";

const productRouter=express.Router();

productRouter.post("/add",addProduct);
productRouter.get("/",getProducts);
productRouter.put("/:key",updateProduct);
productRouter.delete("/:key",deleteProduct);
productRouter.get("/:key",getOnePruduct);

export default productRouter;