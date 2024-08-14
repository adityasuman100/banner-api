import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ onUpdate }) => {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(0);
  const [link, setLink] = useState('');
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banner');
        setDescription(response.data.description);
        setTimer(response.data.timer);
        setLink(response.data.link);
        setBannerVisible(true);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBanner();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:5000/api/banner', { description, timer, link });
      if (onUpdate) {
        onUpdate({ description, timer, link, visible: bannerVisible });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Error updating banner');
    }
  };

  const toggleVisibility = () => {
    if (timer > 0) {
      setBannerVisible(prev => !prev);
      if (onUpdate) {
        onUpdate({ description, timer, link, visible: !bannerVisible });
      }
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
      <button
        onClick={toggleVisibility}
        style={{ ...styles.button, marginTop: '10px' }}
        disabled={timer <= 0}
      >
        {bannerVisible ? 'Hide Banner' : 'Show Banner'}
      </button>
    </div>
  );
};

const styles = {
  dashboard: {
    padding: '20px',
    border: '1px solid #d32f2f',
    borderRadius: '4px',
    backgroundColor: '#000',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    maxWidth: '600px',
    margin: '173px auto 20px',
    color: '#fff',
    position: 'relative',
    zIndex: 10,
  },
  heading: {
    color: '#d32f2f',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #d32f2f',
    backgroundColor: '#333',
    color: '#fff',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    margin: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Dashboard;
