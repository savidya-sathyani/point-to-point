'use client';

import { Fragment, useEffect, useState } from 'react';

import { Button, Divider, Grid, TextField, Typography } from '@mui/material';

const Home = () => {
  const [points, setPoints] = useState(2);
  const [locationPoints, setLocationPoints] = useState(null);

  const generateLocationFields = () => {
    return Array.apply(null, { length: points }).map((e, i) => (
      <Grid item xs={12} className="location-container" key={i}>
        <TextField id={`lat-${i}`} inputProps={{ type: 'tel' }} />
        <TextField id={`lon-${i}`} inputProps={{ type: 'tel' }} />
      </Grid>
    ));
  };

  return (
    <section className="home">
      <Grid container className="home-box" spacing={2}>
        <Grid item xs={3} className="form-label">
          <Typography variant="body">Number of points: </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="points"
            inputProps={{ type: 'number', min: 2 }}
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body">Location Points: </Typography>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            {generateLocationFields()}
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default Home;
