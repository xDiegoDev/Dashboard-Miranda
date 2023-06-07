function CalendarComponent() {
  const dispatch = useDispatch();
  const bookingsData = useSelector((state) => state.bookings.bookings);
  const bookingsStatus = useSelector((state) => state.bookings.status);
  const [recentBooking, setRecentBookings] = useState();

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookingsAsync());
    }
  }, [bookingsData, bookingsStatus, dispatch]);

  return (
    <CalendarRow>
      <BookingCalendar>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          themeSystem="unthemed"
          customButtons={{
            titleCustom: {
              text: "Recent Booking Schedule",
            },
          }}
          headerToolbar={{
            left: "titleCustom",
            center: "today",
            right: "prev,title,next",
          }}
          events={bookingsData?.map((booking) => {
            return {
              title: booking.ID,
              start: booking["Check In"],
              end: booking["Check Out"],
            };
          })}
        />
      </BookingCalendar>
    </CalendarRow>
  );
}
