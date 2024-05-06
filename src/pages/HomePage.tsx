import React from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import APIService from '../utils/APIService';

function HomePage() {
  let storesData;
  (async () => {
    storesData = await APIService.getData('stores');
  })();
  console.log(storesData);

  return <NavigationBar />;
}

export default HomePage;
