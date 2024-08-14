import React, { useState, useEffect } from 'react';

const Banner = ({ description, link, timer, visible }) => {
  const [timeLeft, setTimeLeft] = useState(timer);
  const [bannerVisible, setBannerVisible] = useState(visible);

  useEffect(() => {
    setTimeLeft(timer);
    setBannerVisible(visible);

    if (visible && timer > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setBannerVisible(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer, visible]);

  if (!bannerVisible || timeLeft <= 0) return null;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div style={styles.banner}>
      <p style={styles.description}>{description}</p>
      <p style={styles.timer}>{formatTime(timeLeft)}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={styles.link}>
          Click here
        </a>
      )}
    </div>
  );
};

const styles = {
  banner: {
    backgroundColor: '#000', // Black background
    color: '#fff', // White text
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #d32f2f', // Red border
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)', // Darker shadow
  },
  description: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  timer: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#d32f2f', // Red timer
  },
  link: {
    color: '#f44336', // Bright red link
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Banner;
