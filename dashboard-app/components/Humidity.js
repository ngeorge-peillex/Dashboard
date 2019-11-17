import React from 'react'
import Typography from '@material-ui/core/Typography'
import Title from './Title'

export default function Humidity (props) {
  const widget = props.widget

  // Retrieve humidity value
  const [humidity, setHumidity] = React.useState('0')
  React.useEffect(() => {
    ;(async () => {
      let result = await widget.fetchData({ city: 'London' })
      if (!result || result == '') return

      result = JSON.parse(result).main.humidity
      setHumidity(result)
    })()
  }, [])

  return (
    <>
      <Title>{widget.name}</Title>
      <Typography component='p' variant='h4'>
        The current humidity in London is {humidity}%
      </Typography>
    </>
  )
}
