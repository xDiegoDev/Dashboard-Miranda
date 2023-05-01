import { nanoid } from "nanoid";
import UserData from "./userData.json";

const assignUniqueIds = (data) => {
  return data.map((item) => ({
    ...item,
    ID: nanoid(),
  }));
};

const updatedUsersData = assignUniqueIds(UserData);
export default updatedUsersData;
