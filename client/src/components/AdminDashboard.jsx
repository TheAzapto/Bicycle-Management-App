import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [bicycles, setBicycles] = useState([]);

  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        const response = await fetch('/api/bicycles');
        if (!response.ok) {
          throw new Error('Failed to fetch bicycles');
        }
        const data = await response.json();
        setBicycles(data);
      } catch (error) {
        console.error('Error fetching bicycles:', error);
      }
    };

    fetchBicycles();
  }, []);

  const handleStatusChange = async (bicycleId, newStatus) => {
    try {
      const response = await fetch(`/api/bicycles/${bicycleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bicycle status');
      }

      setBicycles(bicycles.map(bicycle => {
        if (bicycle._id === bicycleId) {
          return { ...bicycle, status: newStatus };
        }
        return bicycle;
      }));
    } catch (error) {
      console.error('Error updating bicycle status:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bicycles.map(bicycle => (
            <tr key={bicycle._id}>
              <td>{bicycle._id}</td>
              <td>{bicycle.size}</td>
              <td><select value={bicycle.status} onChange={(e) => handleStatusChange(bicycle._id, e.target.value)}><option value="idle">Idle</option><option value="in-use">In-Use</option><option value="in-maintenance">In-Maintenance</option></select></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;