import { nanoid } from "nanoid";
import BookingsData from "./BookingsData.json";

const formatDate = (date) => {
  return date.toISOString().substring(0, 10);
};

const getRandomFutureDate = () => {
  const now = new Date();
  // Generate a random number of days from 1 to 365
  const randomDays = Math.floor(Math.random() * 60) + 1;
  now.setDate(now.getDate() + randomDays);
  return formatDate(now);
};

const formattedData = BookingsData.map((booking) => {
  const checkInDate = getRandomFutureDate();
  let checkOutDate = getRandomFutureDate();

  // Make sure that checkOutDate is after checkInDate
  while (new Date(checkOutDate) <= new Date(checkInDate)) {
    checkOutDate = getRandomFutureDate();
  }

  return {
    ...booking,
    "Order Data": checkInDate,
    "Check In": checkInDate,
    "Check Out": checkOutDate,
    ID: nanoid(),
  };
});

export default formattedData;
