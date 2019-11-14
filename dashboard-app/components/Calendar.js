import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Deposits() {
  const date = "Thursday November 14, 2019";
  const time = "12:55"

  return (
    <React.Fragment>
      <Title>Date and Time</Title>
      <Typography component="p" variant="h4">
        Today the date is {date} and it's {time}
      </Typography>
    </React.Fragment>
  );
}