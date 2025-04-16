import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TestAuth from './components/auth/TestAuth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/test" element={<TestAuth />} />
      <Route path="/" element={<TestAuth />} />
    </Routes>
  );
}

export default App;