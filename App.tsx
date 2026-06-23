import React, { useState } from 'react';
import Login from './components/Login';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import NurseDashboard from './components/nurse/NurseDashboard';
import PatientDashboard from './components/patient/PatientDashboard';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const handleLogout = () => {
    setUser(null);
  };

  switch (user.role) {
    case 'patient':
      return <PatientDashboard user={user} onLogout={handleLogout} />;
    case 'nurse':
      return <NurseDashboard user={user} onLogout={handleLogout} />;
    case 'doctor':
    case 'admin':
      return <DoctorDashboard user={user} onLogout={handleLogout} />;
    default:
      return <Login onLogin={setUser} />;
  }
};

export default App;