import React, { useState, useEffect } from "react";
import "./App.css";

import { FetchData } from "./components/data";
import NavBar from "./components/header";
import MidDiv from "./components/midDiv";

function App() {
  const [globalData, setGlobalData] = useState();
  const [countriesData, setCountriesData] = useState();

  // set states
  useEffect(() => {
    async function getData() {
      const { Global, Countries } = await FetchData();
      setGlobalData(Global);
      setCountriesData(Countries);
    }
    getData();
  }, []);

  return (
    <div id="app-main">
      <div>
        <NavBar />
        <div className="body">
          <h2 className="app-h2"> CURRENT STATUS OF CORONA VIRUS </h2>
          <MidDiv
            globalData={globalData}
            setGlobalData={setGlobalData}
            countriesData={countriesData}
            setCountriesData={setCountriesData}
          />
          <br />
          <footer>
            <p className="footer">CREATED BY UBAID ALI</p>
            <hr />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
