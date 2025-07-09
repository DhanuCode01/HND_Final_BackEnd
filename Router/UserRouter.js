import express from "express";
import { findUser, getAllUser, LoginUser, reqestUser } from "../Controller/UserController.js";

const userRouter=express.Router();

userRouter.post("/",reqestUser);
userRouter.post("/user",LoginUser);
userRouter.get("/all",getAllUser);
userRouter.get("/",findUser);


export default userRouter;