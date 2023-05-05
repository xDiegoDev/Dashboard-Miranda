import { nanoid } from "nanoid";
import RoomsData from "./roomData.json";

const roomMap = {
  "Deluxe A-": { "Bed Type": "Single Bed", Price: 100 },
  "Deluxe B-": { "Bed Type": "Double Bed", Price: 200 },
  "Deluxe C-": { "Bed Type": "Double Deluxe", Price: 300 },
  "Deluxe D-": { "Bed Type": "Suite", Price: 400 },
};

const assignUniqueIds = (data) => {
  return data.map((item) => {
    const ID = "ORD" + nanoid();
    const roomInfo = roomMap[item["Room Name"]] || {};
    return {
      ...item,
      ID: ID,
      "Bed Type": roomInfo["Bed Type"],
    };
  });
};
const updatedRoomsData = assignUniqueIds(RoomsData);

export default updatedRoomsData;
