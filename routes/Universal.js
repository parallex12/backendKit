import express from "express";
import { createDoc, getDocById, updateDocById, deleteDoc, getAllDocsByKey } from "../controller/index.js";
import { ensureToken } from "../services/Secure.js";

const router = express.Router();

//create data
router.post("/", ensureToken, createDoc);

//create with custom id data
router.post("/:id", ensureToken, createDoc);

//Get data
router.get("/:id", ensureToken, getDocById);

//Get all where key==value data
router.get("/:key/:value", ensureToken, getAllDocsByKey);

//Update data
router.put("/:id", ensureToken, updateDocById);

//Delete data
router.delete("/:id",  deleteDoc);


export default router;
