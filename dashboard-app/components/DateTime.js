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

export default function Deposits(props) {
  const widget = props.widget
  const classes = useStyles()

  const [city, setCity] = React.useState("Paris")
  const [time, setTime] = React.useState("0")

  React.useEffect(() => {
    ; (async () => {
      let result = await widget.fetchData({ city: city })
      if (!result || result == '') return

      let date = JSON.parse(result).datetime
      date = date.substring(0, date.length - 6);
      result = new Date(Date.parse(date))
      const hours = result.getHours();
      const minutes = result.getMinutes();
      setTime(hours + ":" + minutes)
    })()
  }, [city])

  return (
    <>
      <Title>Date and Time</Title>
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
            onChange={event => setCity(event.target.value)}
          >
            <MenuItem value="Paris">Paris</MenuItem>
            <MenuItem value="London">London</MenuItem>
            <MenuItem value="Rome">Roma</MenuItem>
          </Select>
        </FormControl>
        <Typography component='p' variant='h4'>
          it's {time}
        </Typography>
      </div>
    </>
  )
}
