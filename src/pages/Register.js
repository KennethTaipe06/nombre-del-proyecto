import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Importar el archivo CSS
import Alert from '../components/Alert'; // Importar el componente de alerta

const Register = () => {
  console.log('Register component rendered');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null); // Nuevo estado para la imagen
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('address', address);
    formData.append('phone', phone);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setAlertMessage(data.message);
        setAlertType('success');
        setTimeout(() => navigate('/'), 2000); // Redirigir al login después de 2 segundos
      } else {
        setAlertMessage('Registration failed');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred');
      setAlertType('error');
    }
  };

  const isFormValid = () => {
    return username && email && password && firstName && lastName && address && phone;
  };

  return (
    <div className="register-container">
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
      <Alert message={alertMessage} type={alertType} />
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="register-button" disabled={!isFormValid()}>Register</button>
      </form>
    </div>
  );
};

export default Register;
