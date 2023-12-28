import { Query } from "../models/index.js";
import { _tokenDetails } from "../services/index.js";

export const getDocById = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = _tokenDetails(req.token)?.user_id;
    const queryData = await Query?.query_Get_by_id("users", id);
    if (queryData.exists()) {
      let _tempData = { ...queryData?.data(), id: id }
      res.send(_tempData);
    } else {
      console.log(id)
      res.send({ msg: "No data Found", code: "404" });
    }
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
    let id = _tokenDetails(req.token)?.user_id;
    let data = req.body;
    if (
      Object.keys(data).length === 0 ||
      data?.email ||
      data?.provider ||
      data?.password
    ) {
      res.sendStatus(400);
      return;
    }

    const queryData = await Query?.query_update_by_id("users", id, data);
    const queryGetData = await Query?.query_Get_by_id("users", id);
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
