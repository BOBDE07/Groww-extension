import express from "express";
import fundController from "../controllers/fund.controller.js";

const fundRouter = express.Router() ; 

fundRouter.post('/explain', fundController) ; 

export default fundRouter ; 