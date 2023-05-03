import { nanoid } from "nanoid";
import BookingsData from "./BookingsData.json";

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

const formattedData = BookingsData.map((booking) => {
  const now = new Date();
  const orderDate = formatDate(now);
  const checkInDate = formatDate(now);
  const checkOutDate = formatDate(
    new Date(now.getTime() + 24 * 60 * 60 * 1000)
  );

  return {
    ...booking,
    "Order Data": orderDate,
    "Check In": checkInDate,
    "Check Out": checkOutDate,
    ID: nanoid(),
  };
});

export default formattedData;
