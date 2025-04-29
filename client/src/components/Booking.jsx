import React, { useState, useEffect } from 'react';
import '../styles.css'
 
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
    <div className="booking-container">
      <h1 className="booking-heading">Booking Page</h1>
      <div className="availability-info">
        <p>Available Small Bicycles: <span className="count">{availableSmall}</span></p>
        <p>Available Large Bicycles: <span className="count">{availableLarge}</span></p>
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="size">Size:</label>
          <select className="form-input" name="size" id="size" value={bookingData.size} onChange={handleInputChange}>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input className="form-input" type="date" name="date" id="date" value={bookingData.date} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input className="form-input" type="time" name="startTime" id="startTime" value={bookingData.startTime} onChange={handleInputChange} />
        </div>
        <button className="book-button" type="submit">Book</button>
      </form>
    </div>
  );
}

export default Booking;