'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Button, Grid, TextField } from '@mui/material';

const Validate = () => {
  const { push } = useRouter();

  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('API_KEY');

    if (key) {
      setApiKey(key);
      push('/home');
    }
  }, [push]);

  useEffect(() => {
    localStorage.setItem('API_KEY', apiKey);
  }, [apiKey]);

  const handleApiValidate = () => {
    push('/home');
  };

  return (
    <section className="validate">
      <Box className="validate-box">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="password"
              id="apiKey"
              label="API Key"
              fullWidth
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className="button-container">
            <Button variant="outlined" onClick={handleApiValidate}>
              Validate
            </Button>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default Validate;
