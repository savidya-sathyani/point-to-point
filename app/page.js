'use client';

import { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

import { Button, Grid, TextField, Typography } from '@mui/material';
import ContentTable from '@/components/ContentTable';

import { POINTS_TABLE, RESULT_TABLE } from '@/helpers/constants';
import {
  formatDateToCustomFormat,
  generateColObjects,
  getDirectionsDetails,
  roundUpOrDown,
} from '@/helpers/utils';

const Home = () => {
  const [interval, setInterval] = useState(1);
  const [count, setCount] = useState(1);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [data, setData] = useState([]);
  const [resultRows, setResultRows] = useState([]);

  const handleAdd = () => {
    const point = {
      no: `P${data.length + 1}`,
      latitude: lat,
      longitude: lon,
    };

    const dataArray = [...data];
    dataArray.push(point);

    setData(dataArray);
    setLat('');
    setLon('');
    setResultRows([]);
  };

  const handleRowDelete = (id) => {
    setData((prevData) => prevData.filter((_, index) => index !== id));
  };

  const handleCalculation = () => {
    setResultRows([]);
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    let currentCount = 0;

    function runLogic() {
      const date = Date.now();
      const commonReq = {
        travelMode: google.maps.TravelMode.DRIVING,
        transitOptions: {
          departureTime: new Date(date),
        },
      };
      let row = { time: formatDateToCustomFormat(date) };

      for (let i = 0; i < data.length - 1; i++) {
        const origin = `${data[i].latitude},${data[i].longitude}`;
        const destination = `${data[i + 1].latitude},${data[i + 1].longitude}`;
        const colName = `${data[i].no}-${data[i + 1].no}`;
        const revColName = `${data[i + 1].no}-${data[i].no}`;

        const request = {
          origin: origin,
          destination: destination,
          ...commonReq,
        };
        const reverseRequest = {
          origin: destination,
          destination: origin,
          ...commonReq,
        };

        Promise.all([
          getDirectionsDetails(directionsService, request),
          getDirectionsDetails(directionsService, reverseRequest),
        ]).then((values) => {
          values.forEach((item, index) => {
            row[index === 0 ? colName : revColName] = roundUpOrDown(
              item.routes[0].legs[0].duration.value / 60
            );
          });

          setResultRows((prevState) =>
            Array.from(new Set([...prevState, row]))
          );
        });
      }

      currentCount++;
      if (currentCount < count) {
        setTimeout(runLogic, interval * 60 * 1000);
      }
    }
    runLogic();
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}>
      <section className="home">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  type="number"
                  id="interval"
                  label="Interval in Minutes"
                  fullWidth
                  value={interval}
                  inputProps={{ min: 1 }}
                  onChange={(e) => setInterval(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  type="number"
                  id="count"
                  label="Count"
                  fullWidth
                  value={count}
                  inputProps={{ min: 1 }}
                  onChange={(e) => setCount(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  type="number"
                  id="lat"
                  label="Latitude"
                  fullWidth
                  value={lat}
                  inputProps={{ min: -90, max: 90 }}
                  onChange={(e) => setLat(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  type="number"
                  id="lon"
                  label="Longitude"
                  fullWidth
                  value={lon}
                  inputProps={{ min: -180, max: 180 }}
                  onChange={(e) => setLon(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} className="center-field">
                <Button
                  variant="outlined"
                  onClick={handleAdd}
                  disabled={lat === '' || lon === ''}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography>Points:</Typography>
              </Grid>
              <Grid item xs={12}>
                <ContentTable
                  columns={POINTS_TABLE.columns}
                  rows={data}
                  pageSize={POINTS_TABLE.pageSize}
                  handleRowDelete={handleRowDelete}
                />
              </Grid>
              <Grid item xs={12} className="right-grid-container">
                <Button
                  variant="outlined"
                  disabled={data.length < 2}
                  onClick={handleCalculation}
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className="data">
            <Grid container spacing={2}>
              <Grid item xs={12} className="center-grid-container">
                Result
              </Grid>
              <Grid item xs={12}>
                <ContentTable
                  columns={generateColObjects(data.length)}
                  rows={resultRows}
                  pageSize={RESULT_TABLE.pageSize}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </LoadScript>
  );
};

export default Home;
