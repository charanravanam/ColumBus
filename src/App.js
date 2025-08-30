import React, { useState } from 'react';

const studentsData = [
  { name: 'Amrutha', id: 'a1', password: 'pass123' },
  { name: 'Charan', id: 'c1', password: 'pass123' },
  { name: 'Karthik', id: 'k1', password: 'pass123' },
  { name: 'Shanthi', id: 's1', password: 'pass123' },
];

const driverData = { username: 'driver1', password: 'driverpass' };

export default function App() {
  const [role, setRole] = useState('student');
  const [fleetxLink, setFleetxLink] = useState('https://app.fleetx.io/live/share/v2/eJwFwYENACAIA7CLSJCMjL0j6BnebstyPqyka2QVcQxrYNLQIkF0Xmn3B82dCiY%3D');
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState(studentsData.map(s => s.name));
  const [newStudent, setNewStudent] = useState('');
  const [pickupPoints, setPickupPoints] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [driverLoggedIn, setDriverLoggedIn] = useState(false);

  const handleStudentLogin = () => {
    const student = studentsData.find(s => s.id === loginId && s.password === password);
    if (student) {
      setCurrentStudent(student.name);
      setLoginId('');
      setPassword('');
    } else {
      alert('Invalid Student Login ID or Password');
    }
  };

  const handleDriverLogin = () => {
    if (loginId === driverData.username && password === driverData.password) {
      setDriverLoggedIn(true);
      setLoginId('');
      setPassword('');
    } else {
      alert('Invalid Driver Username or Password');
    }
  };

  const markAttendance = (status) => {
    if (currentStudent) {
      setAttendance({ ...attendance, [currentStudent]: status });
    }
  };

  const addStudent = () => {
    if (newStudent.trim() && !students.includes(newStudent)) {
      setStudents([...students, newStudent.trim()]);
      setNewStudent('');
    }
  };

  const savePickupPoint = (s, point) => {
    setPickupPoints({ ...pickupPoints, [s]: point });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Smart College Bus Companion
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setRole('student')}
              className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${role === 'student' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('driver')}
              className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${role === 'driver' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Driver
            </button>
          </div>
        </div>

        {/* Student Login */}
        {role === 'student' && !currentStudent && (
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Student Login</h2>
            <input type="text" placeholder="Login ID" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full border-gray-300 rounded-xl p-3 mb-3 shadow-sm" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-gray-300 rounded-xl p-3 mb-4 shadow-sm" />
            <button onClick={handleStudentLogin} className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition">🔐 Login</button>
          </div>
        )}

        {/* Student Section */}
        {role === 'student' && currentStudent && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Welcome, {currentStudent}!</h2>

              {!pickupPoints[currentStudent] && (
                <div className="mt-3">
                  <input type="text" placeholder="Enter your pickup point" onBlur={(e) => savePickupPoint(currentStudent, e.target.value)} className="w-full border-gray-300 rounded-xl p-3 shadow-sm" />
                  <p className="text-sm text-gray-500 mt-1">(You can set this only once)</p>
                </div>
              )}
              {pickupPoints[currentStudent] && <p className="mt-2 text-gray-600 text-sm">Pickup Point: {pickupPoints[currentStudent]}</p>}

              <div className="mt-4 flex gap-4">
                <button disabled={attendance[currentStudent] === 'Yes'} onClick={() => markAttendance('Yes')} className={`flex-1 py-3 rounded-xl shadow-md transition ${attendance[currentStudent] === 'Yes' ? 'bg-green-500 scale-110' : 'bg-gray-300 scale-90'}`}>✅ Yes</button>
                <button disabled={attendance[currentStudent] === 'No'} onClick={() => markAttendance('No')} className={`flex-1 py-3 rounded-xl shadow-md transition ${attendance[currentStudent] === 'No' ? 'bg-red-500 scale-110' : 'bg-gray-300 scale-90'}`}>❌ No</button>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-gray-600 mb-2">Track your bus in real-time using Fleetx.</p>
                <button onClick={() => window.open(fleetxLink, '_blank')} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition">🔗 Track Bus Live</button>
              </div>
            </div>
          </div>
        )}

        {/* Driver Login and Section */}
        {role === 'driver' && !driverLoggedIn && (
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Driver Login</h2>
            <input type="text" placeholder="Username" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full border-gray-300 rounded-xl p-3 mb-3 shadow-sm" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-gray-300 rounded-xl p-3 mb-4 shadow-sm" />
            <button onClick={handleDriverLogin} className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition">🔐 Login</button>
          </div>
        )}

        {role === 'driver' && driverLoggedIn && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Driver Dashboard</h2>

              <div className="mb-4 flex gap-2">
                <input type="text" placeholder="New Student Name" value={newStudent} onChange={(e) => setNewStudent(e.target.value)} className="flex-1 border-gray-300 rounded-xl p-3 shadow-sm" />
                <button onClick={addStudent} className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition">➕ Add</button>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Students & Pickup Points</h3>
                {students.map((s) => (
                  <div key={s} className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded-xl">
                    <span>{s} - {pickupPoints[s] || 'No pickup point set'}</span>
                    <span>{attendance[s] || '❌ Not marked'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
