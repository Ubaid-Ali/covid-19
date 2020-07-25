import React, { useState, useEffect } from 'react';
import './App.css';

import { FetchData } from './components/data'
import Header from './components/header'
import MidDiv from './components/midDiv'
// import MultipleSelect from './components/select'

function App() {

  const [globalSt, setGlobalSt] = useState();
  const [countrySt, setCountrySt] = useState();

  // set states
  useEffect(() => {
    async function getData() {
      const { Global, Countries } = await FetchData();

      setGlobalSt({
        TotalConfirmed: Global.TotalConfirmed,
        TotalRecovered: Global.TotalRecovered,
        TotalDeaths: Global.TotalDeaths
      });

      setCountrySt(Countries);
    }

    getData();

  }, []);


  return (
    <div >
      <Header />
      <div className="App-header">
        <h2 className='app-h2'> Current Status </h2>
        <MidDiv globalData={globalSt} countryData={countrySt} />
      </div>
    </div>
  );
}

export default App;
