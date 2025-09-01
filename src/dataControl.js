import { client, tablesDB, account } from "@/lib/appwriteWeb";
import { cookies } from "next/headers";
import { ID, Permission, Role, Query } from "appwrite";

const getData = {
  toDoList: async () => {
    const jwtToken = (await cookies()).get("jwt").value;
    const allData = [];
    const limit = 25;
    let offset = 0; // use let so we can increment it

    try {
      // const { tablesDB } = createWebClient(jwtToken);
      client.setJWT(jwtToken);
      while (true) {
        const data = await tablesDB.listRows("db1", "todolist", [
          Query.limit(limit),
          Query.offset(offset),
        ]);

        allData.push(...data.rows);

        // Stop if we've fetched all rows
        if (data.total <= offset + data.rows.length) {
          break;
        }

        // Increment offset for next batch
        offset += data.rows.length;
      }

      console.log(allData.length); // logs all rows
      return allData; // return all rows
    } catch (error) {
      console.log("error in toDoList..", error);
    }
  },
};

const postData = {
  getUser: async (jwtToken) => {

    try {
      // const { account } = createWebClient(jwtToken);
      client.setJWT(jwtToken);
      const user = await account.get();

      return user;
    } catch (error) {
      console.log("error in getUserID..", error);
      // return null;
    }
  },
  toDoList: async (task) => {
    "use server";
    console.log(task);

    const jwtToken = (await cookies()).get("jwt").value;
    const id = (await postData.getUser(jwtToken)).$id;
    // console.log("user id is: ", id);

    try {
      // const { tablesDB, account } = createWebClient(jwtToken);
      // console.log(await account.get());
      // console.log(tablesDB);
      client.setJWT(jwtToken);
      const promise = await tablesDB.createRow(
        "db1",
        "todolist",
        ID.unique(),
        {
          task: task,
        }
        // [
        //   Permission.read(Role.user(id)),
        //   Permission.update(Role.user(id)),
        //   Permission.delete(Role.user(id)),
        // ]
      );
      console.log(promise);
      return promise;
    } catch (error) {
      console.log("error in toDoList..", error);
    }
  },
};
const putData = {};

const deleteData = {
  toDoList: async (id) => {
    "use server";
    const jwtToken = (await cookies()).get("jwt").value;
    try {
      // const { tablesDB } = createWebClient(jwtToken);
      client.setJWT(jwtToken);
      await tablesDB.deleteRow("db1", "todolist", id);

      // return 1;
    } catch (error) {
      console.log("error in toDoList..", error);
    }
  },
};
export { getData, postData, putData, deleteData };
