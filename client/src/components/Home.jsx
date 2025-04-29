import React, { useState, useEffect } from 'react';

function Home() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      // Update the bookings list after cancellation
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Bicycle Management App</h1>
      <h2>Current and Past Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Bicycle ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
                <td>{booking._id}</td>
              <td>{booking.bicycleId}</td>
              <td>{booking.date}</td>
              <td>{booking.startTime}</td>
              <td>{booking.userId}</td>
              <td><button onClick={() => handleCancelBooking(booking._id)}>Cancel</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;