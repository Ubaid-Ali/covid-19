import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Countup from "react-countup";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    padding: "0 5%",
  },
  paper: {
    boxShadow: "0 0 7px black",
    borderRadius: "10px",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  chart: {
    backgroundColor: 'white',
    marginTop: "15px",
    borderRadius: "10px",
    padding: "5px",
    boxShadow: "0 0 7px black",
  },
}));

// MID DIV
export default function MidDiv({ globalData, countriesData }) {
  const classes = useStyles();
  const [currentCountry, setCurretnCountry] = useState();

  useEffect(() => {
    if (globalData) {
      setCurretnCountry({ ...globalData, Country: "Global" });
    }
  }, [globalData, countriesData]);

  // Select Box Options
  // Getting the Country Names
  let countryNames = [];
  if (countriesData) {
    countryNames = countriesData.map((countryObj) => countryObj.Country);
  }

  // Run when onChange / select box
  const onChange_Handler = (e) => {
    // when select global again
    if (e.target.value === "Global") {
      return setCurretnCountry({ ...globalData, Country: "Global" });
    } else {
      // when select country
      let selectedCountry = [];
      selectedCountry = countriesData.filter(
        (countryObj) => countryObj.Country === e.target.value
      );
      setCurretnCountry(selectedCountry[0]);
    }
  };

  // Making a Chart
  const barChart = setCurretnCountry ? (
    <Bar
      data={{
        labels: ["infeced", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgb(36, 93, 200)",
              "rgb(57, 224, 57)",
              "rgb(212, 29, 29)",
            ],
            data: [
              currentCountry?.TotalConfirmed,
              currentCountry?.TotalRecovered,
              currentCountry?.TotalDeaths,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current State in ${currentCountry?.Country}`,
        },
      }}
    />
  ) : null;

  // console.log(`currentCountry`, currentCountry);

  // RETURN FROM HERE / JSX
  if (currentCountry === undefined) {
    return <h3 className="loading">Loading...</h3>;
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {/* DATE DISPLAYING */}
              {/* <h3>
                {displayState.Date
                  ? new Date(displayState.Date).toDateString()
                  : new Date().toDateString()}
              </h3> */}

              {/* SELECT BOX */}
              <select onChange={onChange_Handler} className="select-box">
                <option>Global</option>
                {countryNames &&
                  countryNames.map((cntry) => {
                    return <option key={cntry}>{cntry}</option>;
                  })}
              </select>
            </Paper>
          </Grid>

          {/* SHOWING DATA CONFIRMED*/}
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div>
                <h2>
                  {" "}
                  TOTAL <br /> CONFIRMED{" "}
                </h2>
                <h2 className="total-cases">
                  <Countup
                    start={0}
                    end={currentCountry.TotalConfirmed || 0}
                    duration={2.5}
                    separator={","}
                  />
                </h2>
                <hr />
                <p>Infected Poeple </p>
              </div>
            </Paper>
          </Grid>

          {/* SHOWING DATA RECOVERED*/}
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div>
                <h2>
                  {" "}
                  TOTAL <br /> RECOVERD{" "}
                </h2>
                <h2 className="total-recovered">
                  <Countup
                    duration={2.5}
                    separator={","}
                    start={0}
                    end={currentCountry.TotalRecovered || 0}
                  />
                </h2>
                <hr />
                <p>Recoverd Poeple</p>
              </div>
            </Paper>
          </Grid>

          {/* SHOWING DATA DEATHS*/}
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div>
                <h2>
                  TOTAL <br /> DEATHS
                </h2>
                <h2 className="total-deaths">
                  <Countup
                    start={0}
                    end={currentCountry.TotalDeaths || 0}
                    duration={2.5}
                    separator={","}
                  />
                </h2>
                <hr />
                <p>People Died</p>
              </div>
            </Paper>
          </Grid>
          {/* CHART */}
          <Grid item xs={12} className={classes.chart}>
            {barChart}
          </Grid>
        </Grid>
      </div>
    );
  }
}
