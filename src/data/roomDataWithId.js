import { nanoid } from "nanoid";
import RoomsData from "./roomData.json";

const assignUniqueIds = (data) => {
  return data.map((item) => ({
    ...item,
    ID: nanoid(),
  }));
};

const updatedRoomsData = assignUniqueIds(RoomsData);
export default updatedRoomsData;
