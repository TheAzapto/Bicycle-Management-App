import React, { useState, useEffect } from 'react';

function Booking() {
  const [availableSmall, setAvailableSmall] = useState(0);
  const [availableLarge, setAvailableLarge] = useState(0);
  const [bookingData, setBookingData] = useState({
    size: 'small',
    date: '',
    startTime: '',
  });

  useEffect(() => {
    const fetchAvailableBicycles = async () => {
      try {
        const response = await fetch('/api/bicycles');
        const data = await response.json();

        const smallCount = data.filter(bike => bike.size === 'small' && bike.available).length;
        const largeCount = data.filter(bike => bike.size === 'large' && bike.available).length;

        setAvailableSmall(smallCount);
        setAvailableLarge(largeCount);
      } catch (error) {
        console.error('Error fetching available bicycles:', error);
      }
    };

    fetchAvailableBicycles();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert('Booking created successfully!');
      } else {
        alert('Failed to create booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div>
      <h1>Booking Page</h1>
      <p>Available Small Bicycles: {availableSmall}</p>
      <p>Available Large Bicycles: {availableLarge}</p>
      <form onSubmit={handleSubmit}>
        <select name="size" value={bookingData.size} onChange={handleInputChange}>
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
        <input type="date" name="date" value={bookingData.date} onChange={handleInputChange} />
        <input type="time" name="startTime" value={bookingData.startTime} onChange={handleInputChange} />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default Booking;