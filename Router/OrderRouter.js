import express from "express";
import { createOrder, getQuote } from "../Controller/OrderController.js";


const OrderRouter=express.Router();

OrderRouter.post("/",createOrder);
OrderRouter.post("/quote",getQuote);




export default OrderRouter;