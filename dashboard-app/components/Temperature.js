import React from 'react'
import Typography from '@material-ui/core/Typography'
import Title from './Title'

export default function Temperature (props) {
  const temperature = '16'
  const unit = 'metric'

  return (
    <>
      <Title>Temperature</Title>
      <Typography component='p' variant='h4'>
        The temperature is actually {temperature} {unit}
      </Typography>
    </>
  )
}
