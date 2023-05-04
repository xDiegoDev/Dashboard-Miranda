import { nanoid } from "nanoid";
import ContactData from "./ContactData.json";

const assignUniqueIds = (data) => {
  return data.map((item) => {
    const ID = "ORD" + nanoid();
    return {
      ...item,
      ID: ID,
      "Order ID": ID,
    };
  });
};

const updatedContactData = assignUniqueIds(ContactData);

export default updatedContactData;
