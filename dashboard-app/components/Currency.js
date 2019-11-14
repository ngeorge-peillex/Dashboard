import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Deposits() {
  const baseCurrency = "euros";
  const baseAmount = 12;
  const wantedCurrency = "dollars"
  const exchangeRate = 0.9
  const wantedAmount = baseAmount * exchangeRate;

  return (
    <React.Fragment>
      <Title>Currency exchange rate</Title>
      <Typography component="p" variant="h4">
          {baseAmount} {baseCurrency} is equal to {wantedAmount} {wantedCurrency}
      </Typography>
    </React.Fragment>
  );
}