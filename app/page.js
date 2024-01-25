'use client';

import { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

import { Button, Grid, TextField, Typography } from '@mui/material';
import ContentTable from '@/components/ContentTable';

import { POINTS_TABLE } from '@/helpers/constants';

const Home = () => {
  const [apiKey, setApiKey] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [data, setData] = useState([]);

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
  };

  const handleRowDelete = (id) => {
    setData((prevData) => prevData.filter((_, index) => index !== id));
  };

  const handleCalculation = () => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const date = Date.now();
    const request = {
      origin: '8.256669,79.86901',
      destination: '8.03039, 79.82901',
      travelMode: google.maps.TravelMode.DRIVING,
      transitOptions: {
        departureTime: new Date(date),
      },
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(result);
      } else {
        console.error('error fetching directions', result, status);
      }
    });
  };

  console.log(process.env.API_KEY);

  return (
    <LoadScript googleMapsApiKey={process.env.API_KEY}>
      <section className="home">
        <Grid container>
          <Grid item xs={6} className="form">
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  type="password"
                  id="apiKey"
                  label="API Key"
                  fullWidth
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} className="center-field">
                <Button variant="outlined">Validate</Button>
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
                  disabled={data.length <= 0}
                  onClick={handleCalculation}
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className="data">
            <Grid container>
              <Grid item xs={12}>
                Result:
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </LoadScript>
  );
};

export default Home;
