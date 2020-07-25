import React, { useState, useEffect } from 'react';
import './App.css';

import { FetchData } from './components/data'
import Header from './components/header'
import MidDiv from './components/midDiv'
// import MultipleSelect from './components/select'

function App() {

  const [globalSt, setGlobalSt] = useState();
  const [countrySt, setCountrySt] = useState();

  useEffect(() => {
    async function getData() {
      const {Global, Countries} = await FetchData();

      setGlobalSt({
        TotalConfirmed: Global.TotalConfirmed,
        TotalRecovered: Global.TotalRecovered,
        TotalDeaths: Global.TotalDeaths      
      });

      setCountrySt(Countries);
    }
    
    getData();
    
  }, []);

  // console.log(globalSt)
  // console.log(countrySt)

  return (
    <div className="App-container">
      <Header />
      <h1>Feching the Data</h1>
      <MidDiv globalData={globalSt} countryData={countrySt} />

    </div>
  );
}

export default App;
