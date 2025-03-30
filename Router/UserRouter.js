import express from "express";
import { LoginUser, reqestUser } from "../Controller/UserController.js";

const userRouter=express.Router();

userRouter.post("/",reqestUser);
userRouter.post("/user",LoginUser);


export default userRouter;