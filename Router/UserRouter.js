import express from "express";
import { findUser, LoginUser, reqestUser } from "../Controller/UserController.js";

const userRouter=express.Router();

userRouter.post("/",reqestUser);
userRouter.post("/user",LoginUser);
userRouter.get("/",findUser);


export default userRouter;