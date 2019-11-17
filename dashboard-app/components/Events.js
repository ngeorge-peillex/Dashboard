import React from 'react'

import Title from './Title'
import isoDateString from '../utils/IsoDateString'
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 150,
  },
})

export default function Events(props) {
  const widget = props.widget

  const classes = useStyles()

  const [minDate, setMinDate] = React.useState('01/01/2019')
  const [events, setEvents] = React.useState([])
  React.useEffect(() => {
    ;(async () => {
      let result = await widget.fetchData({
        timeMin: isoDateString(new Date(minDate)),
        accessToken: localStorage.getItem('accessToken'),
      })
      if (!result || result == '') return

      result = JSON.parse(result)
      setEvents(result.items)
    })()
  }, [minDate])

  return (
    <>
      <Title>{widget.name}</Title>
      <TextField
        variant="outlined"
        margin="normal"
        label="Start date"
        value={minDate}
        onChange={event => setMinDate(event.target.value)}
      />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow fontWeight="fontWeightBold">
            <TableCell>Event name</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(event => (
            <TableRow key={event.id}>
              <TableCell>{event.summary}</TableCell>
              <TableCell align="right">TODO</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
