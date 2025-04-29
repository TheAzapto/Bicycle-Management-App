import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Booking from './components/Booking';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute user={user}><Booking /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
