import { createBrowserRouter, createRoutesFromElements, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './Screens/login';
import Register from './Screens/register';
import Home from './Screens/Home/Home';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }, [navigate]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#DEF19F'
    }}>
      <img src="/logo.png" alt="Thang Si Suk" style={{ width: '150px', height: 'auto' }} />
    </div>
  );
};

const elements = createRoutesFromElements(
  <>
    <Route path="/" element={<Splash />} /> 
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="/home" element={<Home />} />
  </>
);

const router = createBrowserRouter(elements);

export default router;
