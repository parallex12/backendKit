import express from "express";
import { createDoc, getDocById, updateDocById, deleteDoc, getAllDocsByKey } from "../controller/index.js";
import { ensureToken } from "../services/Secure.js";

const router = express.Router();

//create data
router.post("/",  createDoc);

//create with custom id data
router.post("/:id", createDoc);

//Get data
router.get("/:id", getDocById);

//Get all where key==value data
router.get("/:key/:value",  getAllDocsByKey);

//Update data
router.put("/:id",  updateDocById);

//Delete data
router.delete("/:id",  deleteDoc);
 
export default router;
