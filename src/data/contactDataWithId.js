import { nanoid } from "nanoid";
import ContactData from "./ContactData.json";

const assignUniqueIds = (data) => {
  return data.map((item) => ({
    ...item,
    "Order ID": "ORD" + nanoid(),
  }));
};

const updatedContactData = assignUniqueIds(ContactData);

export default updatedContactData;
