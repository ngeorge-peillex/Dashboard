import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Deposits() {
  const humidity = "70";

  return (
    <React.Fragment>
      <Title>Humidity</Title>
      <Typography component="p" variant="h4">
        The current humidity is {humidity}%
      </Typography>
    </React.Fragment>
  );
}