import { createWebClient } from "./lib/appwriteWeb";
import { cookies } from "next/headers";
import fs from "fs";
import { ID, Permission, Role, Query } from "appwrite";
const getData = {
  toDoList: async () => {
    const jwtToken = (await cookies()).get("jwt").value;
    try {
      const { tablesDB } = createWebClient(jwtToken);
      const data = await tablesDB.listRows("db1", "todolist");
      console.log(data);
      // // save data in json
      const jsonData = JSON.stringify(data.rows, null, 2);
      return data;
    } catch (error) {
      console.log("error in toDoList..", error);
    }
  },
};
const postData = {};
const putData = {};

const deleteData = {};
export { getData, postData, putData, deleteData };
