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
    let config = data?.config;

    delete data["config"]
    const queryData = await Query?.query_create(path[1], id?.toString(), data);
    if (config) {
      let queryResult;
      // Check if "return" key exists and has a valid value
      if (config.return && ['table', 'current',"byKey"].includes(config.return)) {
        switch (config.return) {
          case 'table':
            queryResult = await Query?.query_Get_all(path[1]);
            break;
          case 'current':
            queryResult = await Query?.query_Get_by_id(path[1], id?.toString());
            break;
          case 'byKey':
            queryResult = await Query?.query_Get_by_key(path[1], config?.params?.key, config?.params?.value);
            break;
          default:
            queryResult = 'Unexpected "return" value:', config.return
            console.warn('Unexpected "return" value:', config.return);
            break;
        }
        res.send(queryResult);
        res.end()
        return
      }
    }
    res.sendStatus(200)
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
    const queryData = await Query?.query_Get_by_id(path[1], id);
    console.log(queryData)
    if (queryData) {
      let _tempData = { ...queryData, id: id }
      res.send(_tempData);
    } else {
      console.log(id)
      res.send([]);
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
    const queryData = await Query?.query_Get_by_key(path[1], key, value);
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
    let config = data?.config;
    delete data["config"]
    const queryData = await Query?.query_update(path[1], id, data);
    if (config) {
      let queryResult;
      // Check if "return" key exists and has a valid value
      if (config.return && ['table', 'current'].includes(config.return)) {
        switch (config.return) {
          case 'table':
            queryResult = await Query?.query_Get_all(path[1]);
            break;
          case 'current':
            queryResult = await Query?.query_Get_by_id(path[1], id);
            break;
          default:
            console.warn('Unexpected "return" value:', config.return);
            break;
        }
        res.send(queryResult);
        res.end()
        return
      }
    }
    res.sendStatus(200);
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
    let config = req?.body?.config;
    const queryData = await Query?.query_delete(path[1], id);
    console.log(queryData)
    if (config) {
      let queryResult;
      // Check if "return" key exists and has a valid value
      if (config.return) {
        switch (config.return) {
          case 'table':
            queryResult = await Query?.query_Get_all(path[1]);
            break;
          default:
            queryResult = `Unexpected "return" value: ${config.return}`
            break;
        }
        res.send({ delete: "Successfull", queryResult });
        res.end()
        return
      }
    }
    res.sendStatus(200);
    res.end();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    res.end();
  }
};
