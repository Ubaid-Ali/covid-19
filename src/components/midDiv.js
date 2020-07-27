import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Countup from 'react-countup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '0 5%'
  },
  paper: {
    borderRadius: '10px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function MidDiv(props) {
  const classes = useStyles();

  const [globalData, setglobalData] = useState();
  const [countriesData, setCountriesData] = useState();
  const [display, setDisplay] = useState({});

  useEffect(() => {

    const stateSetterFnc = async () => {

      // Setting Globald Data in States
      let response = await props.globalData
      setglobalData(response)
      setDisplay(response)

      // Setting Countries Data in State
      let response2 = await props.countryData;
      setCountriesData(response2)

    }
    stateSetterFnc()

  }, [props]);



  // Select Box Options
  // Geting the Country Names
  let names = [];
  if (countriesData === undefined) {
    // console.log('wait for props, Fetching')
  }
  else {
    for (let i of countriesData) {
      names.push(i.Country)
    }
  }


  // Run when onChange or select country
  const onChange_Handler = (e) => {
    let countryObj = [];

    // pick selected country object 
    countryObj = countriesData.filter((val) => val.Country === e.target.value)

    // when select global again
    if (e.target.value === 'Global') {
      countryObj[0] = globalData;
    }
    setDisplay(countryObj[0])
  }


  // RETURN FROM HERE JSX

  if (display === undefined) {
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

              <h3>
                {display.Date ? (new Date(display.Date).toDateString()) : (new Date().toDateString())}
              </h3>

              <select
                onChange={onChange_Handler}
                className='select-box'
              >
                <option>Global</option>
                {names.map((cntry) => {
                  return (
                    <option key={cntry} >{cntry}</option>
                  )
                })}

              </select>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div>
                <h2> TOTAL <br /> CASES </h2>
                <h2 className='total-cases'>
                  <Countup
                    start={0}
                    end={display.TotalConfirmed === undefined ? 0 : display.TotalConfirmed}
                    duration={2.5}
                    separator={','}
                  />
                </h2>
                <hr />
                <p>Infected Poeple <br /> due to Corona Virus</p>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div >

                <h2> TOTAL <br /> RECOVERD </h2>
                <h2 className='total-recovered'>
                  <Countup
                    duration={2.5}
                    separator={','}
                    start={0}
                    end={display.TotalRecovered === undefined ? 0 : display.TotalRecovered}
                  />
                </h2>
                <hr />
                <p>Recoverd Poeple <br /> from Corona Virus</p>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div>
                <h2> TOTAL <br /> DEATHS </h2>
                <h2 className='total-deaths'>
                  <Countup
                    start={0}
                    end={display.TotalDeaths ? display.TotalDeaths : 0}
                    duration={2.5}
                    separator={','}
                  />
                </h2>
                <hr />
                <p> Deaths <br /> due to Corona Virus</p>
              </div>
            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}
