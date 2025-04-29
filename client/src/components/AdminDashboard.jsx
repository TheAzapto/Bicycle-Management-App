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
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <table className="admin-dashboard-table">
        <thead className="admin-dashboard-table-header">
          <tr className="admin-dashboard-table-row">
            <th className="admin-dashboard-table-cell">ID</th>
            <th className="admin-dashboard-table-cell">Size</th>
            <th className="admin-dashboard-table-cell">Status</th>
          </tr>
        </thead>
        <tbody className="admin-dashboard-table-body">
          {bicycles.map(bicycle => (
            <tr className="admin-dashboard-table-row" key={bicycle._id}>
              <td className="admin-dashboard-table-cell">{bicycle._id}</td>
              <td className="admin-dashboard-table-cell">{bicycle.size}</td>
              <td className="admin-dashboard-table-cell">
                <select className="admin-dashboard-select" value={bicycle.status} onChange={(e) => handleStatusChange(bicycle._id, e.target.value)}>
                  <option value="idle">Idle</option>
                  <option value="in-use">In-Use</option>
                  <option value="in-maintenance">In-Maintenance</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;