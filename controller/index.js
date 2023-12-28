import firebase from "../services/Firebase.js";
import { PrivateKey, SortTableData, _tokenDetails, generateRandomString } from "../services/index.js";
import jsonwebtoken from "jsonwebtoken";
import { doc, setDoc } from "firebase/firestore";
import crypto from "crypto"
import { Query } from "../models/indexV2.js";

export const createDoc = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = req.params?.id || generateRandomString(18);
    let data = req.body
    const queryData = await Query?.query_create(path[2], id, data);
    res.send(200)
    res.end();
  } catch (e) {
    console.log("Firebase", e.message);
    res.sendStatus(500);
    res.end();
  }
};


export const getDocById = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = req.params.id;
    const queryData = await Query?.query_Get_by_id(path[2], id);
    if (queryData.exists()) {
      let _tempData = { ...queryData?.data(), id: id }
      res.send({ msg: "data Found", code: "200", data: _tempData });
    } else {
      console.log(id)
      res.send({ msg: "No data Found", code: "404", data: [] });
    }
    res.end();
  } catch (e) {
    console.log("Firebase", e.message);
    res.sendStatus(500);
    res.end();
  }
};

export const getAllDocsByKey = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let key = req.params.key;
    let value = req.params.value;
    console.log(req.params)
    const queryData = await Query?.query_Get_by_key(path[2], key, value);
    res.send(queryData)
    res.end();
  } catch (e) {
    console.log("Firebase", e.message);
    res.sendStatus(500);
    res.end();
  }
};

export const updateDocById = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = req.params.id;
    let data = req.body;

    const queryData = await Query?.query_update(path[2], id, data);
    const queryGetData = await Query?.query_Get_by_id(path[2], id);
    res.send({
      msg: "data updated.",
      code: 200,
      updated_data: queryGetData?.data(),
    });
    res.end();
  } catch (e) {
    console.log(e.message);
    res.send(500);
    res.end();
  }
};


export const deleteDoc = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = req.params.id;
    const queryData = await Query?.query_delete(path[2], id);
    res.send(200);
    res.end();
  } catch (e) {
    console.log(e.message);
    res.send(500);
    res.end();
  }
};
