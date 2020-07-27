import React, { useState, useEffect } from 'react';
import './App.css';

import { FetchData } from './components/data'
import Header from './components/header'
import MidDiv from './components/midDiv'

function App() {

  const [globalSt, setGlobalSt] = useState();
  const [countrySt, setCountrySt] = useState();

  // set states
  useEffect(() => {
    async function getData() {
      const { Global, Countries } = await FetchData();

      setGlobalSt(Global);
      setCountrySt(Countries);
    }

    getData();
  }, []);

  return (
    <div id='app-main'>
      <div >
      <Header />
        <h2 className='app-h2'> Current Status </h2>
        <MidDiv globalData={globalSt} countryData={countrySt} />
      </div>
    </div>
  );
}

export default App;
