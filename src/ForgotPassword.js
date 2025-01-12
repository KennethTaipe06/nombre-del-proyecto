import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Importar el archivo CSS
import Alert from './Alert'; // Importar el componente de alerta

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        setAlertMessage('Recovery instructions sent');
        setAlertType('success');
        setTimeout(() => navigate('/verify-code'), 2000); // Redirigir a la página de verificación de código después de 2 segundos
      } else {
        setAlertMessage('Failed to send recovery instructions');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred');
      setAlertType('error');
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Recover your account</h1>
      <Alert message={alertMessage} type={alertType} />
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label>Enter your email to search for your account:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="forgot-password-button">Search</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
