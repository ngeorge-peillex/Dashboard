import React from 'react'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: 8,
    minWidth: 120
  },
  textField: {
    marginLeft: 8
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}))

export default function Humidity (props) {
  const widget = props.widget
  const classes = useStyles()

  const tick = () => updateData()

  const updateRefreshRate = value => {
    setRefreshRate(value)
    if (value && value.length && parseInt(value)) {
      clearInterval(intervalTick)
      setIntervalTick(setInterval(tick, parseInt(value) * 1000))
    }
  }

  const [refreshRate, setRefreshRate] = React.useState('30')
  const [intervalTick, setIntervalTick] = React.useState(0)

  React.useEffect(() => {
    updateRefreshRate(refreshRate)
  }, [])

  const refreshRateInput = (
    <TextField
      variant='outlined'
      margin='normal'
      label='Refresh rate'
      value={refreshRate}
      onChange={event => updateRefreshRate(event.target.value)}
    />
  )

  const handleChangeCity = event => {
    setCity(event.target.value)
  }

  const [city, setCity] = React.useState('Paris')
  const [humidity, setHumidity] = React.useState('0')

  async function updateData () {
    let result = await widget.fetchData({ city: city })
    if (!result || result == '') return

    result = JSON.parse(result).main.humidity
    setHumidity(result)
  }

  React.useEffect(() => {
    updateData()
  }, [city])

  return (
    <>
      <Title>{widget.name}</Title>
      {refreshRateInput}
      <div className={classes.container}>
        <Typography component='p' variant='h4'>
          The current humidity
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>City</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={city}
            onChange={handleChangeCity}
          >
            <MenuItem value='Paris'>Paris</MenuItem>
            <MenuItem value='London'>London</MenuItem>
            <MenuItem value='Roma'>Roma</MenuItem>
          </Select>
        </FormControl>
        <Typography component='p' variant='h4'>
          is {humidity}%
        </Typography>
      </div>
    </>
  )
}
