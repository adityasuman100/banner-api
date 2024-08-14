import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [bannerData, setBannerData] = useState({
    description: '',
    link: '',
    timer: 0, // Set initial timer to 0
    visible: false // Ensure initial visibility is false
  });

  // Function to update the banner data
  const handleUpdateBannerData = (data) => {
    setBannerData(data);
  };

  // Fetch banner data from the backend on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        if (response.data && response.data.timer > 0) {
          setBannerData(response.data);
        } else {
          setBannerData({
            description: '',
            link: '',
            timer: 0,
            visible: false
          });
        }
      })
      .catch(error => {
        console.error('There was an error fetching the banner data!', error);
      });
  }, []);

  return (
    <div className="App">
      {bannerData.visible && bannerData.timer > 0 ? (
        <Banner
          description={bannerData.description}
          link={bannerData.link}
          timer={bannerData.timer}
          visible={bannerData.visible}
        />
      ) : null}
      <Dashboard onUpdate={handleUpdateBannerData} />
    </div>
  );
}

export default App;
