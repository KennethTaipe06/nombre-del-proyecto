import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyCode.css'; // Importar el archivo CSS
import Alert from './Alert'; // Importar el componente de alerta

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setAlertMessage('Invalid user ID');
      setAlertType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setAlertType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:3005/reset-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ userId, resetCode: code, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setAlertMessage('Password reset successfully');
        setAlertType('success');
        setTimeout(() => navigate('/'), 2000); // Redirigir a la página de inicio de sesión después de 2 segundos
      } else {
        setAlertMessage('Invalid code or failed to reset password');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred');
      setAlertType('error');
    }
  };

  return (
    <div className="verify-code-container">
      <h1>Enter Verification Code</h1>
      <Alert message={alertMessage} type={alertType} />
      <form onSubmit={handleSubmit} className="verify-code-form">
        <div className="form-group">
          <label>Enter the 4-digit code sent to your email:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength="4"
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="verify-code-button">Verify and Reset Password</button>
      </form>
    </div>
  );
};

export default VerifyCode;
