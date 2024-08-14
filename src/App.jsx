import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Banner from './components/Banner';

function App() {
  const [bannerData, setBannerData] = useState({
    description: '',
    timer: 0,
    link: '',
    visible: false,
  });

  const handleUpdate = (newBannerData) => {
    // Update the state with new banner data
    setBannerData({
      description: newBannerData.description,
      timer: newBannerData.timer,
      link: newBannerData.link,
      visible: newBannerData.visible,
    });
  };

  return (
    <div className="App">
      <Dashboard onUpdate={handleUpdate} />
      <Banner
        description={bannerData.description}
        timer={bannerData.timer}
        link={bannerData.link}
        visible={bannerData.visible}
      />
    </div>
  );
}

export default App;
