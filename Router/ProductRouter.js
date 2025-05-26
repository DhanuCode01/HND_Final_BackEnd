import express from "express";
import { addProduct, deleteProduct, getOnePruduct, getProducts, getProductsKids, getProductsMen, getProductsWomen, updateProduct } from "../Controller/ProductController.js";

const productRouter=express.Router();

productRouter.post("/add",addProduct);
productRouter.get("/men/:key",getProductsMen);
productRouter.get("/women/:key",getProductsWomen);
productRouter.get("/kids/:key",getProductsKids);
productRouter.get("/",getProducts);
productRouter.put("/:key",updateProduct);
productRouter.delete("/:key",deleteProduct);
productRouter.get("/:key",getOnePruduct);

export default productRouter;