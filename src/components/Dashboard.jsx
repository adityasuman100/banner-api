import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ onUpdate }) => {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(0);
  const [link, setLink] = useState('');

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banner');
        setDescription(response.data.description);
        setTimer(response.data.timer);
        setLink(response.data.link);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBanner();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:5000/api/banner', { description, timer, link });
      // alert('Banner updated successfully!');
      if (onUpdate) {
        onUpdate({ description, timer, link, visible: true });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Error updating banner');
    }
  };

  return (
    <div style={styles.dashboard}>
      <h2 style={styles.heading}>Update Banner</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description:</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Timer (seconds):</label>
        <input
          type="number"
          value={timer}
          onChange={e => setTimer(Number(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Link:</label>
        <input
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleUpdate} style={styles.button}>Update Banner</button>
    </div>
  );
};

const styles = {
  dashboard: {
    padding: '20px',
    border: '1px solid #d32f2f', // Red border
    borderRadius: '4px',
    backgroundColor: '#000', // Black background
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)', // Darker shadow
    maxWidth: '600px',
    margin: '140px auto 20px', // Margin with 140px top, 20px bottom, auto left/right
    color: '#fff', // White text
  },
  heading: {
    color: '#d32f2f', // Red heading
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#fff', // White label text
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #d32f2f', // Red border for inputs
    backgroundColor: '#333', // Dark grey background for inputs
    color: '#fff', // White text in inputs
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#d32f2f', // Red background
    color: '#fff', // White text
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Dashboard;
