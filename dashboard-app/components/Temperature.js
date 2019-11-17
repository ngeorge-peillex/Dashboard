import React from 'react'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

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
    flexWrap: 'wrap',
  },
}))

export default function Temperature(props) {
  const classes = useStyles()
  const widget = props.widget

  const [city, setCity] = React.useState("Paris")
  const [temperature, setTemperature] = React.useState(0)

  const handleChangeCity = event => {
    setCity(event.target.value);
  }

  React.useEffect(() => {
    ; (async () => {
      let result = await widget.fetchData({ city: city })
      if (!result || result == '') return
      result = JSON.parse(result).main.temp
      result = Math.floor(result - 273.15)
      setTemperature(Math.floor(result))
    })()
  }, [city])

  return (
    <>
      <Title>Temperature</Title>
      <div className={classes.container}>
        <Typography component='p' variant='h4'>
          In
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>City</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={city}
            onChange={handleChangeCity}
          >
            <MenuItem value="Paris">Paris</MenuItem>
            <MenuItem value="London">London</MenuItem>
            <MenuItem value="Roma">Roma</MenuItem>
          </Select>
        </FormControl>
        <Typography component='p' variant='h4'>
          the temperature is actually {temperature} degres
        </Typography>
      </div>
    </>
  )
}
