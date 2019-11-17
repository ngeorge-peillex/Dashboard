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

export default function Weather (props) {
  const classes = useStyles()
  const widget = props.widget
  
  const [city,setCity] = React.useState("Paris")
  const [weather, setWeather] = React.useState('0')

  const handleChangeCity = event => {
    setCity(event.target.value);
  }

  React.useEffect(() => {
    ;(async () => {
      let result = await widget.fetchData({ city: city })
      if (!result || result == '') return

      result = JSON.parse(result).weather[0].main
      setWeather(result)
    })()
  }, [city])
  

  return (
    <>
      <Title>Weather</Title>
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
        it's actually {weather}
      </Typography>
      </div>
    </>
  )
}
