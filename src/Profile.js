import React, { useState, useEffect } from 'react';
import './Profile.css'; // Importar el archivo CSS
import Modal from './components/Modal'; // Importar el componente Modal
import ConfirmModal from './components/ConfirmModal'; // Importar el componente ConfirmModal

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const url = `http://localhost:3004/users/${userId}?token=${token}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          setEmail(data.email);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setAddress(data.address);
          setPhone(data.phone);
        } else {
          setAlertMessage('Failed to fetch profile');
          setAlertType('error');
        }
      } catch (error) {
        console.error('Error:', error);
        setAlertMessage('An error occurred');
        setAlertType('error');
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const url = `http://localhost:3004/users/${userId}?token=${token}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, firstName, lastName, address, phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setAlertMessage('User updated successfully');
        setAlertType('success');
        setIsEditing(false);
      } else {
        setAlertMessage('Update failed');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred');
      setAlertType('error');
    }
  };

  const handleDelete = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const url = `http://localhost:3004/users/${userId}?token=${token}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAlertMessage('User deleted successfully');
        setAlertType('success');
        localStorage.clear();
        setTimeout(() => window.location.reload(), 2000); // Recargar la página después de 2 segundos
      } else {
        setAlertMessage('Delete failed');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred');
      setAlertType('error');
    }
  };

  return (
    <div className="profile-container">
      <h1>Perfil</h1>
      <div className="profile-details">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
      <button className="edit-button" onClick={() => setIsEditing(true)}>Editar Perfil</button>
      <button className="delete-button" onClick={() => setIsDeleting(true)}>Delete Profile</button>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <form onSubmit={handleSubmit} className="profile-form">
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
          <button type="submit" className="profile-button">Update</button>
        </form>
      </Modal>
      <ConfirmModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
      />
      {alertMessage && <div className={`alert alert-${alertType}`}>{alertMessage}</div>}
    </div>
  );
};

export default Profile;
