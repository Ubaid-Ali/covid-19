import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Countup from 'react-countup';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    padding: '0 5%'
  },
  paper: {
    boxShadow: '0 0 7px black',
    borderRadius: '10px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  chart: {
    // backgroundColor: 'rgba(27, 66, 238, 0.171)',
    marginTop: '15px',
    borderRadius: '10px',
    padding: '5px',
    boxShadow: '0 0 7px black'
  }
}));

// MID DIV
export default function MidDiv(props) {
  const classes = useStyles();

  const [globalData, setglobalData] = useState();
  const [countriesData, setCountriesData] = useState();
  const [displayState, setDisplayState] = useState();

  useEffect(() => {
    const stateSetterFnc = async () => {

      // Setting Globald Data in States
      let response = await props.globalData
      setglobalData(response)
      setDisplayState(response)

      // Setting Countries Data in Country State
      let response2 = await props.countryData;
      setCountriesData(response2)
    }
    stateSetterFnc()

  }, [props]);



  // Select Box Options
  // Getting the Country Names
  let names = [];
  if (countriesData === undefined) {
    // console.log('wait for props, Fetching')
  }
  else {
    for (let i of countriesData) {
      names.push(i.Country)
    }
  }


  // Run when onChange / select box
  const onChange_Handler = (e) => {
    let countryObj = [];

    // pick selected country object 
    countryObj = countriesData.filter((val) => val.Country === e.target.value)

    // when select global again
    if (e.target.value === 'Global') {
      countryObj[0] = globalData;
    }
    setDisplayState(countryObj[0])
  }

  // Making a Chart
  const barChart = (
    displayState ? <Bar
      data={{
        labels: ['infeced', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: ['rgb(36, 93, 200)', 'rgb(57, 224, 57)', 'rgb(212, 29, 29)'],
          data: [displayState.TotalConfirmed, displayState.TotalRecovered, displayState.TotalDeaths]
        }]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current State in ${displayState.Country ? displayState.Country : 'Global'}` }
      }}
    /> : null
  )

  // RETURN FROM HERE / JSX
  if (displayState === undefined) {
    return (
      <h3 className='LOADING' >Loading</h3>
    )
  }
  else {

    return (
      <div className={classes.root} >
        <Grid container spacing={6} >
          <Grid item xs={12}>

            <Paper className={classes.paper}>

              {/* DATE DISPLAYING */}
              <h3>
                {displayState.Date ?
                  (new Date(displayState.Date).toDateString()) :
                  (new Date().toDateString())}
              </h3>

              {/* SELECT BOX */}
              <select
                onChange={onChange_Handler}
                className='select-box'
              >
                <option>Global</option>
                {names.map((cntry) => {
                  return (
                    <option
                      key={cntry}>{cntry}</option>
                  )
                })}
              </select>
            </Paper>
          </Grid>

          {/* SHOWING DATA CONFIRMED*/}
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div>
                <h2> TOTAL <br /> CONFIRMED </h2>
                <h2 className='total-cases'>
                  <Countup
                    start={0}
                    end={displayState.TotalConfirmed ? displayState.TotalConfirmed : 0}
                    duration={2.5}
                    separator={','}
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
              <div >
                <h2> TOTAL <br /> RECOVERD </h2>
                <h2 className='total-recovered'>
                  <Countup
                    duration={2.5}
                    separator={','}
                    start={0}
                    end={displayState.TotalRecovered ? displayState.TotalRecovered : 0}
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
                <h2 className='total-deaths'>
                  <Countup
                    start={0}
                    end={displayState.TotalDeaths ? displayState.TotalDeaths : 0}
                    duration={2.5}
                    separator={','}
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
