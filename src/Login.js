import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Importar el archivo CSS
import Alert from './Alert'; // Importar el componente de alerta
import { AuthContext } from './AuthContext'; // Importar el contexto de autenticación

const Login = () => {
  console.log('Login component rendered');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        setIsAuthenticated(true);
        setAlertMessage('Login successful');
        setAlertType('success');
        setTimeout(() => navigate('/welcome'), 2000); // Redirigir a la página de bienvenida después de 2 segundos
      } else {
        setAlertMessage('Login failed');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred');
      setAlertType('error');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Alert message={alertMessage} type={alertType} />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
