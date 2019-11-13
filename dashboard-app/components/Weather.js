import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Deposits() {
  const weather = "sunny";

  return (
    <React.Fragment>
      <Title>Weather</Title>
      <Typography component="p" variant="h4">
        Today, it's actually {weather}
      </Typography>
    </React.Fragment>
  );
}