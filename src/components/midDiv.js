import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {

    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function MidDiv(props) {
  const classes = useStyles();

  const [globalData, setglobalData] = useState();
  const [countriesData, setCountriesData] = useState();
  const [display, setDisplay] = useState(
    {
      TotalConfirmed: 0,
      TotalRecovered: 0,
      TotalDeaths: 0
    }
  );


  useEffect(() => {

    const stateSetterFnc = async () => {

      // Setting Globald Data in State
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
    console.log('wait for props, Fetching')
  }
  else {
    countriesData.map((arr) => {
      names.push(arr.Country)
    })
  }
  // console.log(names)


  // Run when onChange
  const onChange_Handler = (e) => {
    let countryObj = [];

    // pick country object here
    countryObj = countriesData.filter((val) => val.Country === e.target.value)

    if (e.target.value == 'Global') {
      countryObj[0] = globalData;
    }
    setDisplay(countryObj[0])

    // console.log(countryObj);
    // console.log(display);
  }

  console.log(display);

  if (display == undefined) {
    return (
      <h3 className='loading' >Loading</h3>
    )
  }
  else {

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <select onChange={onChange_Handler} className='select-box'>
                <option value='Global'>Global</option>
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
              <h3> TOTAL CASES </h3>
              <h3> {display.TotalConfirmed} </h3>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <h3> TOTAL RECOVERD </h3>
              <h3> {display.TotalRecovered} </h3>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <h3> TOTAL DEATHS </h3>
              <h3> {display.TotalDeaths} </h3>
            </Paper>
          </Grid>


        </Grid>
      </div>
    );
  }
}
