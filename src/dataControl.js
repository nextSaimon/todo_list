import { createWebClient } from "./lib/appwriteWeb";
import { cookies } from "next/headers";
import { ID, Permission, Role, Query } from "appwrite";
const getData = {
  toDoList: async ({ limit = 2, offset = 0 } = {}) => {
    const jwtToken = (await cookies()).get("jwt").value;
    try {
      const { tablesDB } = createWebClient(jwtToken);
      const data = await tablesDB.listRows("db1", "todolist", [
        Query.limit(limit),
        Query.offset(offset),
      ]);
      console.log(data.rows);
      // // save data in json
      // const jsonData = JSON.stringify(data.rows, null, 2);
      // fs.writeFileSync("data.json", jsonData);
      return data.rows;
    } catch (error) {
      console.log("error in toDoList..", error);
    }
  },
};
const postData = {};
const putData = {};

const deleteData = {};
export { getData, postData, putData, deleteData };
