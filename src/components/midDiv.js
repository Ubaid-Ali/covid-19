import React, { useState } from 'react';
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
  const [display, setDisplay] = useState();


  const stateSetterFnc = async () => {

    // Setting Countries Data in State
    let response = await props.countryData;
    setCountriesData(response)
    setDisplay(response)
    // Setting Globald Data in State
    let response2 = await props.globalData
    setglobalData(response2)

  }

  stateSetterFnc()


  // Geting the Country Names
  let names = [];
  if (countriesData == undefined) {
    console.log('wait for props, Fetching')
  }
  else {
    countriesData.map((arr) => {
      names.push(arr.Country)
    })
  }
  // console.log(names)
  
  
  const onChange_Handler = (e) => {

    let countryObj = [];

    // pick country object here
    countryObj = countriesData.filter((val) => val.Country === e.target.value)

    if (e.target.value == 'Global') {
      countryObj[0] = globalData;
    }

    setDisplay(countryObj[0] )

    console.log(countryObj);
    console.log(display);

  }

  console.log(display);




  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <select onChange={onChange_Handler}>
              <option>Global</option>
              {names.map((cntry) => {
                return (
                  <option key={cntry} >{cntry}</option>
                )
              })}
            </select>
          </Paper>
        </Grid>
        {/* {Object.keys(display).map((arr) => {
          return (
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <p> {display.arr} </p>
                <p> {arr} </p>
              </Paper>
            </Grid>
          )
        })} */}


        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <p>  </p>
            <p> 0 </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <p> TOTAL RECOVER </p>
            <p> 0 </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <p> TOTAL DEATHS </p>
            <p> 0 </p>
          </Paper>
        </Grid>


      </Grid>
    </div>
  );
}
