import React, { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register'; // Importar el componente Register
import Welcome from './Welcome'; // Importar el componente Welcome
import Profile from './Profile'; // Importar el componente Profile
import Navbar from './Navbar'; // Importar el componente Navbar
import PrivateRoute from './PrivateRoute'; // Importar el componente PrivateRoute
import { AuthContext, AuthProvider } from './AuthContext'; // Importar el contexto de autenticación

function App() {
  console.log('App component rendered');
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
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
