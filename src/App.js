import React, { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // Importar el componente Register
import Welcome from './pages/Welcome'; // Importar el componente Welcome
import Profile from './pages/Profile'; // Importar el componente Profile
import Navbar from './components/Navbar'; // Importar el componente Navbar
import PrivateRoute from './PrivateRoute'; // Importar el componente PrivateRoute
import ForgotPassword from './pages/ForgotPassword'; // Importar el componente ForgotPassword
import VerifyCode from './pages/VerifyCode'; // Importar el componente VerifyCode
import { AuthContext, AuthProvider } from './AuthContext'; // Importar el contexto de autenticación

function App() {
  console.log('App component rendered');
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<PrivateRoute element={Welcome} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/" element={
          <>
            <Login />
            <p>
              ¿No account? <Link to="/register">Create One</Link>
            </p>
          </>
        } />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
